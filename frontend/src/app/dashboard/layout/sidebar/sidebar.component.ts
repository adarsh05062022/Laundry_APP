import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidatorService } from 'src/app/app-validator.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isAdmin!: boolean;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}


   /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties
   * of a directive. Define an ngOnInit() method to handle any additional initialization tasks.
   */
  ngOnInit(): void {
    this.performAction();
  }


   /**
   * Performs an action based on the user's authentication status and role.
   */
  performAction() {
    const userString = localStorage.getItem('USER_DATA');
    let userDetails = null;

    if (userString) {
      try {
        userDetails = JSON.parse(userString);

        if (userDetails.user.isAdmin) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Handle parsing error, if necessary

        this.router.navigate(['/auth/login']);
      }
    }
  }
}
