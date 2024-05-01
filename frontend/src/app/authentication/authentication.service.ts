import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LaundryEntry } from '../dashboard/laundry.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  /* The code snippet you provided is from an Angular service called `AuthenticationService`. Let's
  break down what each part of the code is doing: */
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  

  url: string = 'http://localhost:3000/api/auth';


  constructor(private http: HttpClient) {}

  /**
   * The function "register" sends a POST request to the server with user data for registration.
   * @param userData - {
   * @returns The `register` function is returning an Observable of type `any`. This Observable is
   * created by making a POST request to the specified URL with the `userData` object as the request
   * body.
   */
  register(userData: { username: string, email: string, password: string, isAdmin:boolean }): Observable<any> {
    return this.http.post<any>(this.url+'/register', userData);
  }

  /**
   * This function sends a POST request to a login endpoint with the provided email and password
   * credentials.
   * @param credentials - The `credentials` parameter is an object that contains two properties:
   * @returns An Observable<any> is being returned.
   */
  login(credentials: { email  : string; password: string }): Observable<any> {
    return this.http.post<any>(this.url+'/login', credentials);
  }

 /**
  * The `logout` function sends a POST request to the server to delete the cookie and logs the user
  * out.
  * @returns An Observable<any> is being returned.
  */
  logout(): Observable<any> {

    // delete the cokkie 
    return this.http.post<any>(this.url+'/logout', {});
  }

  /**
   * The function `changePassword` takes the current password and new password as input, retrieves user
   * data from local storage, extracts user ID and token, then sends a POST request to change the
   * password using the provided data and authorization token.
   * @param {string} currentPassword - The `currentPassword` parameter in the `changePassword` function
   * refers to the user's current password that they want to change. This is the password that the user
   * is currently using to access their account.
   * @param {string} newPassword - The `newPassword` parameter in the `changePassword` function
   * represents the new password that the user wants to change to. This parameter should be a string
   * value containing the new password that the user wishes to set for their account.
   * @returns An Observable<any> is being returned.
   */
  changePassword(currentPassword:string, newPassword: string): Observable<any> {

    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const userId = newValue.user._id;

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const changePasswordData = { userId , currentPassword, newPassword };

    return this.http.post<any>(this.url+'/change-password', changePasswordData,{headers:headers});
  }

 /**
  * The `setLoggedIn` function updates the value of the `loggedInSubject` subject in TypeScript.
  * @param {boolean} value - The `value` parameter is a boolean value that indicates whether a user is
  * logged in or not. It is used to update the state of the user's login status.
  */
  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  /**
   * The function `getUserDetails` retrieves user data from local storage and makes a GET request to
   * fetch user's laundry entries using the retrieved data.
   * @returns The `getUserDetails()` function returns an Observable that makes a GET request to the API
   * endpoint to fetch user's laundry entries. The request includes the user's ID and a token retrieved
   * from local storage for authorization.
   */
  getUserDetails(): Observable<any> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const userId = newValue.user._id;

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make a GET request to the API endpoint to fetch user's laundry entries
    return this.http.get<LaundryEntry[]>(
      `${this.url}/user-details/${userId}`,
      { headers }
    );
  }


 /* The `getUsersDetails()` function in the AuthenticationService class is responsible for fetching all
 users' details from the server. Here is a breakdown of what the function does: */
  // get all users all details
  getUsersDetails():Observable<any>{

    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

 

    if(!newValue.user.isAdmin){
       return of([])
    }

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    return this.http.get<any>(
      `${this.url}/users`,
      { headers }
    );
  }


 /**
  * The updateUserDetails function updates user details by making a PUT request to the API endpoint
  * with the user's data and authorization token.
  * @param {any} userDetails - The `updateUserDetails` function takes in a parameter called
  * `userDetails`, which is of type `any`. This parameter likely contains the updated details of a user
  * that need to be saved or updated in the backend server.
  * @returns An Observable of type `any` is being returned from the `updateUserDetails` function.
  */
  updateUserDetails(userDetails:any): Observable<any> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const userId = newValue.user._id;

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    console.log(userDetails)

    // Make a GET request to the API endpoint to fetch user's laundry entries
    return this.http.put<LaundryEntry[]>(
      `${this.url}/${userId}`,userDetails,
      { headers }
    );
  }


}
