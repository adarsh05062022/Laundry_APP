import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loadingSpinner:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private cookieService: CookieService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });


    this.toastr.warning("We are using free API services so requests are slow 🥲","",{
      timeOut:5000
    })
  }

 /**
  * The `loginUser` function handles user login by sending login credentials to the server, storing
  * user data in local storage, and redirecting to the appropriate dashboard based on user role.
  * @returns The `loginUser()` function returns nothing (`void`) if the `loginForm` is invalid. If the
  * form is valid, the function makes a call to the `login()` method of the `authService` and
  * subscribes to the response. Depending on the response, it sets user data in local storage, stores
  * login time in a cookie, and navigates the user to either the admin dashboard
  */
  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loadingSpinner = true;

    const userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

 

   

   /* The code snippet you provided is the implementation of the `loginUser` function in your Angular
   component. Here's a breakdown of what it does: */
    // Call login service method passing userData
    this.authService.login(userData).subscribe(
      (response) => {
        console.log('User logged in successfully', response);

        // setting data to the local storage

        localStorage.setItem('USER_DATA', JSON.stringify(response));

        // Store login time in cookie (expires in 1 day)
        this.cookieService.set('isLoggedIn', 'true', 1);

        if (response.user.isAdmin) {
          this.router.navigate(['/dashboard/admin']);
        } else {
          this.router.navigate(['/dashboard/user']);
        }

        this.toastr.success("User logged in successfully","",{timeOut:2000})


        this.loadingSpinner = false;
      },
      (error) => {
        this.toastr.error("Error logging in user","",{timeOut:2000})


        this.loadingSpinner = false;

      }
    );


    

    
  }
}
