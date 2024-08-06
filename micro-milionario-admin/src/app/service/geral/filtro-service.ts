import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class FiltroClass {
    pagination = {
        perPage: 10,
        page: 1,
        lastPage: null,
        total: null
    
    }


    adminpagination = {
        perPage: 10000,
        page: 1,
        lastPage: null,
        total: null
    
    }

    constructor(){}
}