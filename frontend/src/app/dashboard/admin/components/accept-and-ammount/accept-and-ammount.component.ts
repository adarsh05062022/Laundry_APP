import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-accept-and-ammount',
  templateUrl: './accept-and-ammount.component.html',
  styleUrls: ['./accept-and-ammount.component.scss']
})
export class AcceptAndAmmountComponent {
   
  /* The code snippet you provided is a TypeScript class for an Angular component called
  `AcceptAndAmmountComponent`. */
  constructor(public modalRef: MdbModalRef<AcceptAndAmmountComponent>) {}

  accept(){
    this.modalRef.close(true)
  }
}
