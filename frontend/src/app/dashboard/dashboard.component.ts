import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidatorService } from '../app-validator.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isLoggedIn: boolean = false;

  constructor(
    private appValidatorService: AppValidatorService,
    private router: Router
  ) {}

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

    console.log(userDetails);
  }
}
