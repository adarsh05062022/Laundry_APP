import { Component, Inject } from '@angular/core';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import {
  LaundryService,
  LaundryEntry,
} from 'src/app/dashboard/laundry.service';
import { LaundryItemViewDialogComponent } from 'src/app/dashboard/shared/laundry-item-view-dialog/laundry-item-view-dialog.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class UserActivitiesComponent {
  laundryList: LaundryEntry[] = [];

  modalRef: MdbModalRef<LaundryItemViewDialogComponent> | null = null;

  constructor(
    private laundryService: LaundryService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.fetchLaundryList();
  }

  /**
   * Fetches the list of laundry entries for the current user.
   */
  fetchLaundryList(): void {
    this.laundryService.getUserLaundryEntries().subscribe((entries) => {
      const statusOrder = ['requested', 'processing', 'delivered', 'rejected'];

      // Sort the laundryList based on status and pickup date
      this.laundryList = entries.sort((a, b) => {
        // Get the index of status in the statusOrder array
        const statusIndexA = statusOrder.indexOf(a.status);
        const statusIndexB = statusOrder.indexOf(b.status);

        // If status is the same, sort based on pickup date
        if (statusIndexA === statusIndexB) {
          return (
            new Date(b.pickupDate).getTime() - new Date(a.pickupDate).getTime()
          );
        }

        // Otherwise, sort based on the index of status in the statusOrder array
        return statusIndexA - statusIndexB;
      });
    });
  }

  /**
   * Opens the laundry item view dialog modal.
   * @param laundryItem The laundry item to view.
   */
  openModal(laundryItem: LaundryEntry) {
    this.modalRef = this.modalService.open(LaundryItemViewDialogComponent, {
      data: {
        laundryItem: laundryItem,
      },
    });
  }
}
