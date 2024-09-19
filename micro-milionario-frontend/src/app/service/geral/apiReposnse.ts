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
        winners:[]
        contest:string


    }
}


export interface GeralInterfaceConcurso {
    code: number,
    message: string,
    dados: []
        
    
}


export interface GeralInterfaceImages {
    id: number;
    name: string;
    url: string;
    code: string;
    description: string;



}

export interface createEntiresInterface {
    code: number,
    message: string,
    dados: {
        total: number,
        perPage: number,
        page: number,
        lastPage: number,
        data: [
        
        ]
    }
}

export interface GetEntriesInterface {
    code: number
    message: string
    dados: []
  }
  
  export interface EntiresInterface {
    id: number
    title: string
    description: string
    contest_id: string
    artist_id: string
    link: string
    link_type: string
    status: number
    vote: any
    created_at: string
    updated_at: string
  }
  

