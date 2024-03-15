import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppValidatorService {

  constructor(
    private cookieService: CookieService

  ) { }

  isLoggedIn(): boolean {
    // Check if login time cookie exists
    
    const loginTime = this.cookieService.get('isLoggedIn');
     return !!loginTime
  }

  logOutUser(){
    localStorage.removeItem("USER_DATA");
    this.cookieService.delete('isLoggedIn');
  }
}
