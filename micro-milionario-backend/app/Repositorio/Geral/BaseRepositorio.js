const NotFoundException = use('App/Exceptions/NotFoundException')
const FailCreationException = use('App/Exceptions/FailCreationException')
class BaseRepositorio {
    constructor(model) {
        this.model = model
        this.Model = use(`App/Models/${this.model}`)
    }


    async findById(modelId) {

        const modelResponse = await this.Model
            .query()
            .where('id', modelId)
            .where('is_delete', false)
            .first()

        if (!modelResponse) {
            throw new NotFoundException;
        }

        return modelResponse.toJSON()

    }

    async findById1(modelId) {

      const modelResponse = await this.Model
          .query()
          .where('id', modelId)
          .first()

      if (!modelResponse) {
          throw new NotFoundException;
      }

      return modelResponse.toJSON()

  }

    async findLastId() {
        const modelResponse = await this.Model
            .max('id')
            .fetch();

        if (!modelResponse) {
            throw new NotFoundException;
        }

        return modelResponse.toJSON()
    }

    async create(Data) {
        try {
            const criar = await this.Model.create(Data)
            return criar.toJSON();
        } catch (error) {
            console.log(error);
            throw new FailCreationException
        }

    }

    async delete(id) {
        try {

            return await this.Model.query().where('id', id).update({ is_delete: 1 })
        } catch (error) {
            console.log(error)

        }
    }
    async update(id, dados) {

        console.log("datio" + dados)
        try {
            return await this.Model.query().where('id', id).update(dados);
        } catch (error) {

            console.log(error)

        }
    }

    async showById(col, id) {
        try {
            return await this.Model.query()
                .where(col, id)
                .whereNot({ is_delete: true })
                .fetch();
        } catch (error) {

        }
    }

    async findByCol(col, id) {
        try {
            return await this.Model.query()
                .where(col, id)
                .first();
        } catch (error) {
            console.log(error)
            return;
        }
    }

    async showByIdAlternative(col, id) {
      try {
          return await this.Model.query()
              .where(col, id)
              .first();
      } catch (error) {

      }
  }

    async showById1(col, id) {
      try {
          return await this.Model.query()
              .where(col, id)
              .whereNot({ is_active: true })
              .whereNot({ is_delete: true })
              .fetch();
      } catch (error) {

      }
  }

    async index() {
        try {
            return await this.Model.query()
                .whereNot({ is_delete: true })
                .fetch();
        } catch (error) {

        }
    }

    async indexActive() {
      try {
          return await this.Model.query()
              .whereNot({ is_active: false })
              .whereNot({ is_delete: true })
              .fetch();
      } catch (error) {

      }
    }

    async indexPure() {
      try {
          return await this.Model.query()
              .whereNot({ is_active: true })
              .whereNot({ is_delete: true })
              .fetch();
      } catch (error) {

      }
    }
}

module.exports = BaseRepositorio;
