import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class FiltroEntriesClass {
    pagination = {
        perPage: 10,
        page: 1,
        lastPage: null,
        total: null
    
    }

    constructor(){}
}