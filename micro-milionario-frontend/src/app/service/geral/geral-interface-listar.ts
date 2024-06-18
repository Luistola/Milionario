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