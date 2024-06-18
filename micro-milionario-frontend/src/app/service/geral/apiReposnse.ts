export interface GeralInterfaceUser {
    code: number,
    message: string,
    dados: {
        id: number
        user_id: number
        nome: string
        sexo: string
        telefone: string
        is_delete: number
        created_at: string
        updated_at: string

    }
}


export interface GeralInterfacePousar {

    code: number,
    message: string,
    dodos: {
        id: number
        title: string
        description: string
        file: string
        type: string
        created_at: string
        updated_at: string
    }


}