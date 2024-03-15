import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {


  message!: String ;

  constructor(public modalRef: MdbModalRef<NotificationComponent>) {}


  

}
