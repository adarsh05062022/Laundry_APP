import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidatorService } from 'src/app/app-validator.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  isLoggedIn: boolean = false;

  constructor(
    private appValidatorService: AppValidatorService,
    private router: Router
  ) {
    // this.router.navigate(['/'])
  }

  /**
   * The ngOnInit function checks if the user is logged in and then performs a specific action.
   */
  ngOnInit(): void {
    this.isLoggedIn = this.appValidatorService.isLoggedIn();
    this.performAction();
  }

  performAction() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/home']);
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

        this.router.navigate(['/auth/home']);
      }
    }
    if(userDetails.user.isAdmin){
      this.router.navigate(['/dashboard/admin']);
    } else{
      this.router.navigate(['/dashboard/user']);

    }

  }
}
