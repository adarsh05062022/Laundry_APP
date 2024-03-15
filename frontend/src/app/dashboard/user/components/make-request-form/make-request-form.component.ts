import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LaundryEntry,
  LaundryService,
  Pricing,
} from '../../../laundry.service'; // Import the interface

import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { NotificationComponent } from 'src/app/dashboard/shared/notification/notification.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-make-request-form',
  templateUrl: './make-request-form.component.html',
  styleUrls: ['./make-request-form.component.scss'],
})
export class MakeRequestFormComponent {
  formData: LaundryEntry = {
    name: '',
    phone: '',
    pickupDate: '',
    address: '',
    cloths: {
      regular: {
        upperWear: 0,
        lowerWear: 0,
      },
      special: {
        upperWear: 0,
        lowerWear: 0,
      },
      woolen: {
        upperWear: 0,
        lowerWear: 0,
      },
      household: {
        item: 0,
      },
    },
    deliveryOption: 'normal',
    status: 'requested',
    amount: 0,
    deliveryDate: '',
  };

  prices: Pricing ={
    regular:{
      upperwear:10,
      lowerwear:20
    },
    special:{
      upperwear:10,
      lowerwear:20
    },
    woolen:{
      upperwear:10,
      lowerwear:20
    },
    household:{
      item:50
    }
  };

  notificationModelRef: MdbModalRef<NotificationComponent> | null = null;

  constructor(
    private laundryService: LaundryService,
    private modalService: MdbModalService,
    private router: Router,
    private toastr: ToastrService,
    private authService:AuthenticationService

  ) {}

   /**
   * Adds a laundry entry.
   */
  addLaundry() {
    console.log('Form Data:', this.formData);
    // Implement your logic to send form details here
    this.laundryService.addLaundryEntry(this.formData).subscribe(
      (response) => {
        console.log('Laundry entry added successfully:', response);
        this.router.navigate(['/dashboard/user']);


        this.toastr.success('Laundry request added successfully', '', {
          progressBar: true,
        });

        
      },
      (error) => {
        console.error('Error adding laundry entry:', error);
        // this.showNotification('Failed to add laundry entry');

        this.toastr.error('Failed to add laundry entry', '', {
          progressBar: true,
        });
      }
    );
  }

  ngOnInit(): void {
    // Fetch prices from the service
    this.laundryService.getLaundryPrice().subscribe((prices) => {
      this.prices = prices;
    });

    this.fetchUserDetails()
  }

 /**
   * Fetches user details.
   */
  fetchUserDetails():void{
    this.authService.getUserDetails().subscribe((response:any)=>{
     this.formData.name = response.user.username
     this.formData.phone = response.user.phone
     this.formData.address = response.user.address

     console.log()
    })
 }

  get calculateAmount() {
    let totalAmount = 0;

    const clothsPrize = this.prices;
    const clothAmmount = this.formData.cloths;

    totalAmount =
      clothsPrize.regular.upperwear * clothAmmount.regular.upperWear +
      clothsPrize.regular.lowerwear * clothAmmount.regular.lowerWear +
      clothsPrize.special.upperwear * clothAmmount.special.upperWear +
      clothsPrize.special.lowerwear * clothAmmount.special.lowerWear +
      clothsPrize.woolen.upperwear * clothAmmount.woolen.upperWear +
      clothsPrize.woolen.lowerwear * clothAmmount.woolen.lowerWear +
      clothsPrize.household.item * clothAmmount.household.item;

    this.formData.amount = totalAmount;

    return totalAmount;
  }


  /**
   * Checks if the laundry request form is valid.
   * @returns True if the form is valid, otherwise false.
   */
  get isFormValid(): boolean {
    const { cloths, name, phone, address } = this.formData;
    return (
      name.trim() !== '' &&
      phone.trim() !== '' &&
      address.trim() !== '' &&
      (cloths.household.item > 0 ||
        cloths.regular.upperWear > 0 ||
        cloths.regular.lowerWear > 0 ||
        cloths.special.upperWear > 0 ||
        cloths.special.lowerWear > 0 ||
        cloths.woolen.upperWear > 0 ||
        cloths.woolen.lowerWear > 0 ||
        cloths.household.item > 0)
    );
  }

  /**
   * Displays a notification modal.
   * @param message The message to display in the notification.
   */
  showNotification(message: string) {
    this.notificationModelRef = this.modalService.open(NotificationComponent, {
      data: {
        message: message, // Ensure that the property name matches
      },
    });
  }
}
