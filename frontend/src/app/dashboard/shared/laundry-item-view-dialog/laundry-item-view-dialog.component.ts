import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LaundryEntry, LaundryService, Pricing } from '../../laundry.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-laundry-item-view-dialog',
  templateUrl: './laundry-item-view-dialog.component.html',
  styleUrls: ['./laundry-item-view-dialog.component.scss'],
})
export class LaundryItemViewDialogComponent {
  laundryItem!: LaundryEntry;
  laundryEntry: LaundryEntry={
    name: "",
    phone: "",
    pickupDate: "",
    address: "",
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
    deliveryOption: "",
    status: "",
    amount: 0,
    deliveryDate: "",
  };
  isAdmin: boolean = false;

  prices: Pricing={
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


  ngOnInit(): void {
    // Initialize laundryEntry with the provided laundryItem data
    this.laundryEntry = { ...this.laundryItem };

    const currentUrl = this.router.url;

    if (currentUrl.includes('/admin')) {
      this.isAdmin = true; // change for the admin
    }
    // console.log(this.laundryItem);

    // Fetch prices from the service
    this.laundryService.getLaundryPrice().subscribe((prices) => {
      this.prices = prices;
    });

  }


  /**
   * Updates the laundry request and closes the modal.
   * @param laundry_entry The laundry entry to be updated.
   */
  updateLaundryRequest(laundry_entry: any) {
    this.laundryItem = this.laundryEntry;
    this.laundryItem.amount = this.calculateAmount;
    // update the database for the laundry item

    try {
      this.laundryService
        .updateLaundryEntry(laundry_entry)
        .subscribe((response) => {
          // console.log(response);

          this.router.navigate(['/dashboard/user']);

          this.toastr.success('Laundry details are updated', '', {
            progressBar: true,
          });
        });
    } catch (error: any) {
      this.toastr.warning(error.name, '', {
        progressBar: true,
      });
      this.toastr.error('Error occured', '', {
        progressBar: true,
      });
    }
    this.modalRef.close();
  }


  /**
   * Deletes the laundry request and closes the modal.
   * @param laundry_entry The laundry entry to be deleted.
   */
  deleteLaundryRequest(laundry_entry: any) {
    // update the database for the laundry item

    try {
      this.laundryService
        .deleteLaundryEntry(laundry_entry)
        .subscribe((response) => {

          this.router.navigate(['/dashboard/user']);

          this.toastr.warning('Laundry request is deleted', '', {
            progressBar: true,
          });
        });
    } catch (error) {
      this.toastr.error('Error in viewing user details', '', {
        progressBar: true,
      });
    }

    this.modalRef.close();
  }

  constructor(
    public modalRef: MdbModalRef<LaundryItemViewDialogComponent>,
    private laundryService: LaundryService,
    private router: Router,
    private modalService: MdbModalService,
    private toastr: ToastrService
  ) {}


  
  /**
   * Calculates the total amount for the laundry request.
   * @returns The total amount for the laundry request.
   */
  get calculateAmount() {
    let totalAmount = 0;
    const clothsPrize = this.prices;
    const clothAmmount = this.laundryEntry.cloths;

    totalAmount =
      clothsPrize.regular.upperwear * clothAmmount.regular.upperWear +
      clothsPrize.regular.lowerwear * clothAmmount.regular.lowerWear +
      clothsPrize.special.upperwear * clothAmmount.special.upperWear +
      clothsPrize.special.lowerwear * clothAmmount.special.lowerWear +
      clothsPrize.woolen.upperwear * clothAmmount.woolen.upperWear +
      clothsPrize.woolen.lowerwear * clothAmmount.woolen.lowerWear +
      clothsPrize.household.item * clothAmmount.household.item;

    return totalAmount;
  }


   /**
   * Checks if the laundry request form is valid.
   * @returns True if the form is valid, otherwise false.
   */
  get isFormValid(): boolean {
    const { cloths, name, phone, address } = this.laundryEntry;
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

  
}
