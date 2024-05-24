import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toast: ToastrService) { }

  messageSucesso(message){
    return this.toast.success(message, 'sucesso')
  }

  messageConflito(message){
    return this.toast.error(message, 'erro')
  }
}
