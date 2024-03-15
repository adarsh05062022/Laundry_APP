import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppValidatorService } from 'src/app/app-validator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(
    private appValidatorService: AppValidatorService,
    private router: Router,
    
    
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.appValidatorService.isLoggedIn();
  }


  /**
   * The `logOutButtonClicked` function logs out the user and navigates to the login page.
   */
  logOutButtonClicked(){
    this.appValidatorService.logOutUser();

    this.router.navigate(['/auth/login']);

  }
}
