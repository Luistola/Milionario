import  { token } from './token'

export interface Usuario{

    uid?:number;
    id?:number;
    role_id?:string;
    username?:string;
    email?:string;
    password?:string;
    created_at?: string;
    updated_at?:string;
    token?: token
}
