import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userData: {
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
  } = {
    username: '',
    email: '',
    password: '',
    isAdmin: false, // Default role
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr:ToastrService,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['customer', Validators.required], // Default role is 'customer'
    });


    this.toastr.warning("You are not able to register It's a demo app 🥲","",{
      timeOut:5000
    })

    // Disable the role select element
    // this.registrationForm.get('role')?.disable()
  }
/**
 * The `registerUser` function in TypeScript registers a user by sending their data to an
 * authentication service via an HTTP POST request and handles success or error responses accordingly.
 * @returns In the `registerUser()` method, if the `registrationForm` is invalid, the method will
 * return early without executing the rest of the code. If the form is valid, the method will proceed
 * to create a `userData` object with the form values and then make an HTTP POST request to register
 * the user using the `AuthService`.
 */

  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }

    // Assign form values to userData object
    this.userData = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      isAdmin: this.registrationForm.value.role === 'provider' ? true : false,
    };

    /* The code snippet `this.authService.register(this.userData).subscribe(...)` is making an HTTP
    POST request to the `register` method of the `AuthenticationService` with the user data
    (`this.userData`) as the payload. */
    this.authService.register(this.userData).subscribe(
      (response) => {
        this.toastr.success("User registered successfully","",{timeOut:2000})
        // console.log('User registered successfully', response);
        // Handle successful registration (e.g., redirect to login page)
        this.router.navigate(['/auth/login']);
      },
      (error) => {

        this.toastr.error("Error registering user","",{timeOut:2000})

        // console.error('Error registering user', error);
        // Handle registration error (e.g., display error message)
      }
    );
  }
}
