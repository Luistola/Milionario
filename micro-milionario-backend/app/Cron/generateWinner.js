const cron = require("node-cron");
const ConcursoModel = use("App/Models/Concurso");
const ContestEntry = use("App/Models/ContestEntry");
const VotacaoModel = use("App/Models/Votacao");
const VencedorModel = use("App/Models/Vencedor");
const VencedorClienteModel = use("App/Models/VencedorCliente");

async function generateWinner() {
  try {
    let allLatestConcurso = await ConcursoModel.query()
      .where("is_winner_generated", false)
      .where("data_fim", "<", new Date())
      .orderBy("created_at", "desc")
      .fetch();

    allLatestConcurso = await allLatestConcurso.toJSON();
    
    for (const contest of allLatestConcurso) {
      const CONTEST_ID = contest.id;
      console.log(
        "CONTEST_ID: ", CONTEST_ID, "end date -", contest.data_fim, "current date -", new Date(), "expired -", new Date(contest.data_fim) < new Date()
      );

      let existingWinnerData = await VencedorModel.query()
        .where("concurso_id", CONTEST_ID)
        .fetch();
      existingWinnerData = await existingWinnerData.toJSON();

      console.log("file: generateWinner.js: ~ generateWinner ~ existingWinnerData?.length:", existingWinnerData?.length)
      if (!existingWinnerData?.length){

        const { n_vencedor: winner_count, price_percent, premio: target_vote } = contest;

        const global_amount =  parseFloat(((parseFloat(target_vote) * price_percent) / 100).toFixed(2));
        console.log("file: generateWinner.js: ~ global_amount:", global_amount)

        let allContestEntries = await ContestEntry.query().where("contest_id", CONTEST_ID).fetch();

        allContestEntries = await allContestEntries.toJSON(); // all entry of this contest(ID)

        console.log("file: generateWinner.js: ~ allContestEntries.length:", allContestEntries.length)
        if (allContestEntries.length) {
          
          allContestEntries?.sort((a, b) => b.vote - a.vote); // sorting data in desc order of votes
          allContestEntries?.splice(winner_count); // picking up top winner entry
          
          const winners = [];

          for (const entry of allContestEntries) {

              let votesData = await VotacaoModel.query()
              .where("contest_entry_id", entry.id)
              .fetch();

              votesData = await votesData.toJSON(); // for each contest entry finding vote data

              let client_votes = new Map(); // creating mapping to find client with max votes for this entry; entry id -> total votes

              for (const vote of votesData) {
                const { cliente_id, voto } = vote;

                const existing_client_vote = client_votes.get(cliente_id);

                if (existing_client_vote) {
                  client_votes.set(cliente_id, voto + existing_client_vote);
                } else {
                  client_votes.set(cliente_id, voto);
                }
              }

              client_votes = Array.from(client_votes);

              if (client_votes.length) {
                client_votes.sort((a, b) => b[1] - a[1]);
                client_votes.splice(1); // picking up first winner client
              }

              if (client_votes.length)
                winners.push({
                  entry_id: entry.id,
                  client_id: client_votes[0][0],
                  entry_total_votes: entry.vote,
                  given_vote: client_votes[0][1],
                });
          }

          console.log("file: generateWinner.js: ~ winners.length:", winners.length)
          if(winners.length){

            let remainingAmount = global_amount;

            for (let index in winners) {
              index = parseInt(index);

              if (index >= 0) {
                if (remainingAmount){

                  const winning_amount = parseFloat(((remainingAmount * 60) / 100).toFixed(2));
          
                  winners[index] = {
                    ...winners[index],
                    winning_amount: parseFloat((winning_amount / 2).toFixed(2)), // diving amount in artist and fan
                    position: index + 1,
                  };
                  
                  remainingAmount = remainingAmount - winning_amount;
                }else{
                  winners[index] = {
                    ...winners[index],
                    winning_amount: 0, 
                    position: index + 1,
                  };
                }
              }
            }
            console.log("file: generateWinner.js:8 ~ winners:", winners)

            for (const winner of winners) {
              const {
                entry_id,
                client_id,
                entry_total_votes,
                winning_amount,
                position,
                given_vote,
              } = winner;
      
              const entryData = allContestEntries.find((data) => data.id == entry_id);
      
              const vencedorData = {
                concurso_id: CONTEST_ID,
                participante_id: entryData.artist_id,
                posicao: position,
                total_votos: entry_total_votes,
                premio: winning_amount,
              };
      
              // SAVE DATA TO WINNER ARTIST
              let vencedor = await VencedorModel.create(vencedorData);
              vencedor = await vencedor.toJSON();
              console.log("file: generateWinner.js:5 ~ generateWinner ~ vencedor:", vencedor)
      
      
              const vencedorClientData = {
                concurso_id: CONTEST_ID,
                posicao: position,
                total_votos: entry_total_votes,
                premio: winning_amount,
                cliente_id: client_id,
                total_votos: given_vote
              };
      
              // SAVE DATA TO WINNER CLIENT
              let vencedorClient = await VencedorClienteModel.create(vencedorClientData);
              vencedorClient = await vencedorClient.toJSON();
              console.log("file: generateWinner.js:5 ~ generateWinner ~ vencedorClient:", vencedorClient)
      
              // SAVE DATA TO CONTEST
              let updatedContest = await ConcursoModel.query()
                .where("id", CONTEST_ID)
                .update({ is_winner_generated: true });
              console.log("file: generateWinner.js:1 ~ generateWinner ~ updatedContest:", updatedContest)
            }
          }

        };
      };
    }
  } catch (error) {
    console.log("file: generateWinner.js ~ generateWinner ~ error:", error)
    
  }
}

cron.schedule("*/1 * * * *", async () => {
  console.log("Generate Winner Task is running at - ", new Date());
  await generateWinner();
  console.log(
    "=========================================================================="
  );
  console.log(
    "=========================================================================="
  );
  console.log(
    "=========================================================================="
  );
});
