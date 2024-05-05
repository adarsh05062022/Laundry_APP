import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';

  constructor(
    private authServices: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.toastr.warning("You are not able to change the password 🥲","",{
      timeOut:5000
    })
  }

  changePassword() {
    // You can send a request to your server to change the password here

    /* The code snippet you provided is attempting to change the user's password by calling the
    `changePassword` method from the `authServices` service. Here's a breakdown of what the code is
    doing: */
    try {
      this.authServices
        .changePassword(this.currentPassword, this.newPassword)
        .subscribe((response) => {
          this.toastr.warning(response.message, '');
        });
    } catch (error) {
      this.toastr.error('failed to change password', '');
    }
  }

  get validForm() {
    // Check if both currentPassword and newPassword have a minimum length of 6 characters
    return this.currentPassword.length >= 6 && this.newPassword.length >= 6;
  }

  /**
   * The function `changeRoute` checks if a user is an admin based on stored user data and navigates to
   * the appropriate dashboard page.
   * @returns The `changeRoute()` function returns either the route `dashboard/admin` or
   * `dashboard/user` based on the value of the `isAdmin` property in the user data stored in the local
   * storage. If the user data is not found in the local storage, the function navigates to the
   * `auth/login` route.
   */
  changeRoute() {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const newValue = JSON.parse(userDataString);

    const isAdmin = newValue.user.isAdmin;

    if (isAdmin === true) {
      this.router.navigate(['dashboard/admin']);
    } else {
      this.router.navigate(['dashboard/user']);
    }
  }
}
