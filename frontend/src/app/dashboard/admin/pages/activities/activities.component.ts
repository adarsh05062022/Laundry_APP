import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LaundryEntry, LaundryService } from 'src/app/dashboard/laundry.service';
import { LaundryItemViewDialogComponent } from 'src/app/dashboard/shared/laundry-item-view-dialog/laundry-item-view-dialog.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class AdminActivitiesComponent {
  laundryList: LaundryEntry[] = [];

  modalRef: MdbModalRef<LaundryItemViewDialogComponent> | null = null;


  constructor(
    private laundryService: LaundryService,
    private modalService: MdbModalService,
    
  ) {}

  ngOnInit(): void {
    this.fetchLaundryList();
  }

  fetchLaundryList(): void {
   /* This code snippet is fetching laundry entries from the `laundryService` and subscribing to the
   observable to receive the entries asynchronously. Once the entries are received, it sorts them
   based on their `deliveryDate` property in descending order. The sorting is done by comparing the
   delivery dates of two entries (`a` and `b`) and returning the result of the comparison to
   determine the order in which they should be sorted. */
    this.laundryService.getLaundryEntries().subscribe((entries) => {
      this.laundryList = entries.sort((a, b) => {
        return new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime();
      });
    });
  }


/**
 * The `openModal` function in TypeScript opens a modal dialog displaying information about a laundry
 * item.
 * @param {LaundryEntry} laundryItem - The `openModal` function takes a parameter `laundryItem` of type
 * `LaundryEntry`. This parameter is used to pass data to the modal dialog that is being opened.
 */
  openModal(laundryItem: LaundryEntry) {
    this.modalRef = this.modalService.open(
      LaundryItemViewDialogComponent,
      {
        data: {
          laundryItem: laundryItem,
        }
      },
    );
  }

 /**
  * The function `filteredLaundryList` returns a filtered list of `LaundryEntry` items with status
  * 'delivered' or 'rejected'.
  * @returns The `getFilteredLaundryList()` method is returning an array of `LaundryEntry` objects that
  * have a status of either 'delivered' or 'rejected'.
  */
  get filteredLaundryList(): LaundryEntry[] {
    return this.laundryList.filter(item => item.status == 'delivered' || item.status == 'rejected');
  }

}
