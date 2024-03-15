import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent {

  feedbackText:string =''

  constructor(public modalRef: MdbModalRef<FeedbackFormComponent>) {}


   /**
   * Sends the feedback review and closes the modal.
   */
  sendReview(){
    console.log(this.feedbackText)

    this.modalRef.close(this.feedbackText)
  }
}
