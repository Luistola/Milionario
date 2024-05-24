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