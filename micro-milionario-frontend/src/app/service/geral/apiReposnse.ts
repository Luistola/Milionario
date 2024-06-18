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
    dados:{
    created_at: string
    description: string
    file: string
    id: number
    title: string
    type: string
    updated_at: string
    }
  }


  export interface GeralInterfaceImages {
    id: number;
    name: string;
    url: string;
    code: string;
    description: string;
  


}