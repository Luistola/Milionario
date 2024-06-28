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


  export interface GeralInterfaceImages {
    id: number;
    name: string;
    url: string;
    code: string;
    description: string;
  }


  export interface ImageResponse {
    mssage: string
    data: string
    code: number
  }
  

  export interface createEntiresInterface {
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

  export interface EntiresInterface {
    id: number
    title: string
    description: string
    contest_id: string
    artist_id: string
    link: string
    link_type: string
    status: boolean
    vote: any
    created_at: string
    updated_at: string
  }