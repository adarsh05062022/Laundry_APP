import { Component } from '@angular/core';
import { AppValidatorService } from './app-validator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'my-laundry';
  isLoggedIn: boolean = false;

  constructor(
    private appValidatorService: AppValidatorService,
    private router: Router
  ) {}

  /**
   * The ngOnInit function checks if the user is logged in and then performs a specific action.
   */
  ngOnInit(): void {
    this.isLoggedIn = this.appValidatorService.isLoggedIn();
    this.performAction();
  }

  performAction() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return;
    }

    const userString = localStorage.getItem('USER_DATA');
    let userDetails = null;

    if (userString) {
      try {
        userDetails = JSON.parse(userString);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Handle parsing error, if necessary

        this.router.navigate(['/auth/login']);
      }
    }
    if(userDetails.user.isAdmin){
      this.router.navigate(['/dashboard/admin']);
    } else{
      this.router.navigate(['/dashboard/user']);

    }

  }
}
