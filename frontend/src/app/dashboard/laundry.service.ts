import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface LaundryEntry {
  name: string;
  phone: string;
  pickupDate: string;
  address: string;
  cloths: {
    regular: {
      upperWear: number;
      lowerWear: number;
    };
    special: {
      upperWear: number;
      lowerWear: number;
    };
    woolen: {
      upperWear: number;
      lowerWear: number;
    };
    household: {
      item: number;
    };
  };
  deliveryOption: string;
  status: string;
  amount: number;
  deliveryDate: string;
}

interface Pricing {
  regular: {
    upperwear: number;
    lowerwear: number;
  };
  special: {
    upperwear: number;
    lowerwear: number;
  };
  woolen: {
    upperwear: number;
    lowerwear: number;
  };
  household: {
    item: number;
  };
}

@Injectable({
  providedIn: 'root',
})
class LaundryService {
  private laundryEntries!: LaundryEntry[];

  private clothPrice: Pricing = {
    regular: {
      upperwear: 10,
      lowerwear: 20,
    },
    special: {
      upperwear: 30,
      lowerwear: 40,
    },
    woolen: {
      upperwear: 50,
      lowerwear: 60,
    },
    household: {
      item: 70,
    },
  };

  baseUrl: string = 'https://mylaundry-backend.onrender.com/api/';

  


   /**
   * Retrieves the pricing for different types of laundry items from the server.
   * @returns An observable emitting the pricing information.
   */
  getLaundryPrice(): Observable<Pricing> {
    try {
      const userDataString = localStorage.getItem('USER_DATA');
      if (!userDataString) {
        this.noDataFound()
        throw new Error('No user data found in local storage');
      }
      const { token } = JSON.parse(userDataString);

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return this.http.get<Pricing>(`${this.baseUrl}pricing`, { headers });
    } catch {
      return of(this.clothPrice);
    }
  }


  /**
   * Updates the pricing for different types of laundry items on the server.
   * @param newPrice New pricing information.
   * @returns An observable emitting the updated pricing information.
   */
  updateLaundryPrice(newPrice: Pricing): Observable<Pricing> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

      throw new Error('No user data found in local storage');
    }
    const { token } = JSON.parse(userDataString);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put<Pricing>(`${this.baseUrl}pricing`, newPrice, {
      headers,
    });
  }


   /**
   * Retrieves all laundry entries from the server.
   * @returns An observable emitting an array of laundry entries.
   */
  // Method to get all laundry entries
  getLaundryEntries(): Observable<LaundryEntry[]> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

      throw new Error('No user data found in local storage');


    }
    const { token } = JSON.parse(userDataString);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      return this.http.get<LaundryEntry[]>(`${this.baseUrl}laundry`, {
        headers,
      });
    } catch (error) {
      return of(this.laundryEntries);
    }
  }


   /**
   * Adds a new laundry entry to the server.
   * @param entry New laundry entry to be added.
   * @returns An observable emitting the result of adding the entry.
   */

  // Method to add a new laundry entry
  addLaundryEntry(entry: LaundryEntry): Observable<any> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const token = newValue.token;
    const userId = newValue.user._id;

    const newEntry = { ...entry, userId };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<LaundryEntry[]>(`${this.baseUrl}laundry`, newEntry, {
      headers,
    });

    // this.laundryEntries.push(entry);
  }
   
  /**
   * Retrieves laundry entries for the current user from the server.
   * @returns An observable emitting an array of laundry entries for the current user.
   */
  // Method to get all laundry entries for a particular user
  getUserLaundryEntries(): Observable<LaundryEntry[]> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

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
      `${this.baseUrl}laundry/user/${userId}`,
      { headers }
    );
  }
   
  /**
   * Updates a laundry entry on the server.
   * @param laundryItem The laundry item to be updated.
   * @returns An observable emitting the result of updating the laundry entry.
   */
  updateLaundryEntry(laundryItem: any): Observable<any> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const userId = newValue.user._id;

    if (userId !== laundryItem.userId) {
      if (!newValue.user.isAdmin) {
        throw new Error('Unauthorised access');
      }
    }

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make a GET request to the API endpoint to fetch user's laundry entries
    return this.http.put<LaundryEntry>(
      `${this.baseUrl}laundry/update/${laundryItem._id}`,
      laundryItem,
      { headers }
    );
  }


  /**
   * Deletes a laundry entry from the server.
   * @param laundryItem The laundry item to be deleted.
   * @returns An observable emitting the result of deleting the laundry entry.
   */
  deleteLaundryEntry(laundryItem: any): Observable<any> {
    const userDataString = localStorage.getItem('USER_DATA');
    if (!userDataString) {
      this.noDataFound()

      throw new Error('No user data found in local storage');
    }
    const newValue = JSON.parse(userDataString);

    const userId = newValue.user._id;

    if (userId !== laundryItem.userId) {
      throw new Error('Unauthorised access');
    }

    const token = newValue.token;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make a GET request to the API endpoint to fetch user's laundry entries
    return this.http.delete<LaundryEntry>(
      `${this.baseUrl}laundry/delete/${laundryItem._id}`,
      { headers }
    );
  }

  // Other methods to update, delete, or fetch individual entries as needed

  constructor(private http: HttpClient,private router:Router) {}



   /**
   * Navigates to the login page when user data is not found in local storage.
   */
  noDataFound() :void{
       this.router.navigate(['/auth/login'])
  }
}

export { LaundryService, LaundryEntry, Pricing };
