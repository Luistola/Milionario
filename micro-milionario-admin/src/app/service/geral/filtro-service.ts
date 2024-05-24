import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class FiltroClass {
    pagination = {
        perPage: 4,
        page: 1,
        lastPage: null,
        total: null
    
    }

    constructor(){}
}