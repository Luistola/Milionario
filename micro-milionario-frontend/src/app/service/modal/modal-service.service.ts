import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  private modalOpen = new Subject<boolean>();
  private modalData = new Subject<any>();

  openModal(data: any) {
    this.modalOpen.next(true);
    this.modalData.next(data);
  }

  closeModal() {
    this.modalOpen.next(false);
  }

  getModalOpen() {
    return this.modalOpen.asObservable();
  }

  getModalData() {
    return this.modalData.asObservable();
  }
}
