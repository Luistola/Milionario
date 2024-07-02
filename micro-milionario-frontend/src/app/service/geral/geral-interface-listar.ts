export interface GeralInterfaceListar {
    code: number,
    message: string,
    dados:{
        total:number,
        perPage: number,
        page: number,
        lastPage: number,
        data: []
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


  export interface data {
    id: number
    nome: string
    descricao: string
    foto: string
    premio: string
    n_vencedor: number
    data_inicio: string
    data_fim: string
    is_active: number
    is_delete: number
    created_at: string
    updated_at: string
    price_percent: number
  }
  export interface ImageResponse {
    mssage: string
    data: string
    code: number
  }