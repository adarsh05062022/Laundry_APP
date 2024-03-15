import { Component } from '@angular/core';
import { LaundryEntry, LaundryService } from 'src/app/dashboard/laundry.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent {


  laundryItem:LaundryEntry[] =[];

  constructor(private laundryService:LaundryService){}

  ngOnInit():void{
    /* The code `this.laundryService.getLaundryEntries().subscribe(items => { this.laundryItem = items;
    })` is making use of RxJS Observables in Angular. */
    this.laundryService.getLaundryEntries().subscribe(items =>{
      this.laundryItem = items;
    })
    
    
  }

  /**
   * This function returns the number of laundry items that have a status of 'requested'.
   * @returns The `get noOfRequests()` function returns the number of laundry items that have a status
   * of 'requested' in the `laundryItem` array.
   */
  get noOfRequests(){       
    return this.laundryItem.filter(item => item.status === 'requested').length
  }

  /**
   * The function returns the number of laundry items that are currently in the 'processing' status.
   * @returns The number of laundry items that have a status of 'processing'.
   */
  get noOfProcessing(){
    return this.laundryItem.filter(item => item.status === 'processing').length
  }

  /**
   * The function returns the number of laundry items that have been delivered.
   * @returns The number of laundry items that have been delivered.
   */
  get noOfDelivered(){
    return this.laundryItem.filter(item => item.status === 'delivered').length
  }

  /**
   * The function calculates the total revenue from delivered laundry items.
   * @returns The `totalRevenue` function is returning the total revenue generated from all delivered
   * laundry items. It filters the `laundryItem` array to only include items with a status of
   * 'delivered', then it uses the `reduce` method to sum up the `amount` property of each item in the
   * filtered array.
   */
  get totalRevenue(){
    return this.laundryItem.filter(item => item.status === 'delivered').reduce((acc,curr)=>acc + curr.amount,0)
  }
}
