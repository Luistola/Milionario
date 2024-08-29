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
        "file: generateWinner.js ~ generateWinner ~ CONTEST_ID:",
        CONTEST_ID
      );

      let existingWinnerData = await VencedorModel.query()
        .where("concurso_id", CONTEST_ID)
        .fetch();
      existingWinnerData = await existingWinnerData.toJSON();
      console.log("existingWinnerData:", existingWinnerData.length)

      if (existingWinnerData?.length) continue;

      const { n_vencedor: winner_count, price_percent } = contest;

      const winners = [];

      let allContestEntry = await ContestEntry.query()
        .where("contest_id", CONTEST_ID)
        .fetch();

      allContestEntry = await allContestEntry.toJSON(); // all entry of this contest(ID)

      console.log("allContestEntry.length:", allContestEntry.length)
      if (!allContestEntry.length) continue;

      let contest_total_votes = 0;
      let votes_per_entry = new Map(); // creating mapping to find entry with max votes; entry id -> total votes

      for (const entry of allContestEntry) {
        //iterating over each contest entry
        const { id: entry_id, vote: entry_votes } = entry;

        contest_total_votes = contest_total_votes + entry_votes;

        const existing_entry_vote = votes_per_entry.get(entry_id);

        if (existing_entry_vote) {
          votes_per_entry.set(entry_id, entry_votes + existing_entry_vote);
        } else {
          votes_per_entry.set(entry_id, entry_votes);
        }
      }

      console.log("votes_per_entry.size:", votes_per_entry.size)
      console.log("contest_total_votes:", contest_total_votes)
      
      if (!contest_total_votes || !votes_per_entry.size) continue;

      votes_per_entry = Array.from(votes_per_entry); // converting Map to Array

      if (votes_per_entry.length) {
        votes_per_entry?.sort((a, b) => b[1] - a[1]); // sorting data in desc order of votes
        votes_per_entry?.splice(winner_count); // picking up top winner entry
      }

      for (const entry of votes_per_entry) {
        // iterating over winning entry
        const [entry_id] = entry;

        let votesData = await VotacaoModel.query()
          .where("contest_entry_id", entry_id)
          .fetch();

        votesData = await votesData.toJSON(); // for each contest entry finding vote data

        console.log("votesData:", votesData?.length)

        let client_votes = new Map(); // creating mapping to find client with max votes for this entry; entry id -> total votes
        let entry_total_votes = 0;

        for (const vote of votesData) {
          const { cliente_id, voto } = vote;
          entry_total_votes = entry_total_votes + voto;

          const existing_client_vote = client_votes.get(cliente_id);

          if (existing_client_vote) {
            client_votes.set(cliente_id, voto + existing_client_vote);
          } else {
            client_votes.set(cliente_id, voto);
          }
        }

        client_votes = Array.from(client_votes);

        console.log("client_votes.length:", client_votes.length)
        if (client_votes.length) {
          client_votes.sort((a, b) => b[1] - a[1]);
          client_votes.splice(1); // picking up top winner client
        }

        if (client_votes.length)
          winners.push({
            entry_id,
            client_id: client_votes[0][0],
            entry_total_votes,
            given_vote: client_votes[0][1],
          });
      }

      let remainingAmount = contest_total_votes;

      console.log("winners.length:", winners.length)

      if (!winners.length) continue;

      for (let index in winners) {
        index = parseInt(index);

        const winning_amount = (
          (remainingAmount * price_percent) /
          100
        ).toFixed(1);

        winners[index] = {
          ...winners[index],
          winning_amount: winning_amount / 2, // diving amount in artist and fan
          position: index + 1,
        };

        remainingAmount = remainingAmount - winning_amount;
      }

      if (winners.length)
        winners[0] = {
          ...winners[0],
          winning_amount: winners[0].winning_amount + remainingAmount / 2, // diving amount in artist and fan
        };

      console.log(
        "file: generateWinner.js:135 ~ generateWinner ~ winners:",
        winners
      );

      for (const winner of winners) {
        const {
          entry_id,
          client_id,
          entry_total_votes,
          winning_amount,
          position,
          given_vote,
        } = winner;

        const entryData = allContestEntry.find((data) => data.id == entry_id);

        const data = {
          concurso_id: CONTEST_ID,
          participante_id: entryData.artist_id,
          posicao: position,
          total_votos: entry_total_votes,
          premio: winning_amount,
        };

        // SAVE DATA TO WINNER ARTIST
        let vencedor = await VencedorModel.create(data);
        vencedor = await vencedor.toJSON();
        console.log("file: generateWinner.js:175 ~ generateWinner ~ vencedor:", vencedor)

        delete data.participante_id;

        data.cliente_id = client_id;
        data.total_votos = given_vote;

        // SAVE DATA TO WINNER CLIENT
        let vencedorClient = await VencedorClienteModel.create(data);
        vencedorClient = await vencedorClient.toJSON();
        console.log("file: generateWinner.js:185 ~ generateWinner ~ vencedorClient:", vencedorClient)

        // SAVE DATA TO CONTEST
        let updatedContest = await ConcursoModel.query()
          .where("id", CONTEST_ID)
          .update({ is_winner_generated: true });
        console.log("file: generateWinner.js:191 ~ generateWinner ~ updatedContest:", updatedContest)
      }
    }
  } catch (error) {
    console.log("file: generateWinner.js: ~ generateWinner ~ error:", error);
  }
}

cron.schedule("*/5 * * * *", async () => {
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
