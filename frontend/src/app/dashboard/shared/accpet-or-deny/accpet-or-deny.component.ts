import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-accpet-or-deny',
  templateUrl: './accpet-or-deny.component.html',
  styleUrls: ['./accpet-or-deny.component.scss']
})
export class AccpetOrDenyComponent {
  constructor(public modalRef: MdbModalRef<AccpetOrDenyComponent>) {}



    /**
   * Method to reject the action and close the modal.
   */
  reject(): void {
    const closeMessage = true;
    this.modalRef.close(closeMessage)
  }
}
