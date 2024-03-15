import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss'],
})
export class FeedbacksComponent {
  users!: any;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList(): void {
    /* This code snippet is making an asynchronous call to the `getUsersDetails()` method of the
    `authService` instance. Once the response is received, it filters out the users based on the
    condition `user.isAdmin === false`. This means it will only keep the users where the `isAdmin`
    property is `false`, effectively filtering out users who are administrators. The filtered list
    of users is then assigned to the `users` property of the component, which can be used to display
    non-admin users in the UI. */
    this.authService.getUsersDetails().subscribe((response) => {
      this.users = response.users.filter((user: any) => {
        return user.isAdmin === false; // Filter out users where isAdmin is false
      });
    });
  }
}
