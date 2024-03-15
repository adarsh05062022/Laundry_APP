import { Component } from '@angular/core';
import { LaundryService, Pricing } from '../../laundry.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {
  isAdmin: boolean = false;
  isEditable: boolean = false;

  // Properties to bind editable content

  prices: Pricing = {
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

  constructor(
    private laundryService: LaundryService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    /* This code snippet is checking the current URL using `this.router.url` and if the URL includes
    "/dashboard/admin", it sets the `isAdmin` property of the component to `true`. This is a common
    way to conditionally set a flag based on the current URL in Angular applications. In this case,
    it is used to determine if the user is an admin based on the URL path. */
    const currentUrl = this.router.url;
    if (currentUrl.includes('/dashboard/admin')) {
      this.isAdmin = true;
    }

    /* The code `this.laundryService.getLaundryPrice().subscribe((prices) => { this.prices = prices;
    });` is making use of RxJS Observables in Angular. */ 
    this.laundryService.getLaundryPrice().subscribe((prices) => {
      this.prices = prices;
    },(error)=>{
      
    });
  }

  /**
   * Handles the event when pricing is changed.
   */

  onChangePricing() {
    this.isEditable = false;



    try {
      this.laundryService.updateLaundryPrice(this.prices).subscribe((res) => {
        this.toastr.success('Prices are updated successfully!!', '', {
          progressBar: true,
        });
      });
    } catch (error:any) {
      this.laundryService.updateLaundryPrice(this.prices).subscribe((res) => {
        this.toastr.success(error.name, '', {
          progressBar: true,
        });
      });
    }

    
  }
 /**
   * Enables editing of pricing.
   */
  onEdit() {
    this.isEditable = true;
  }
}
