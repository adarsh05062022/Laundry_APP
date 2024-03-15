import { Component } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {
  LaundryEntry,
  LaundryService,
} from 'src/app/dashboard/laundry.service';
import { LaundryItemViewDialogComponent } from 'src/app/dashboard/shared/laundry-item-view-dialog/laundry-item-view-dialog.component';
import { AcceptAndAmmountComponent } from '../../components/accept-and-ammount/accept-and-ammount.component';
import { AccpetOrDenyComponent } from 'src/app/dashboard/shared/accpet-or-deny/accpet-or-deny.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent {
  laundryList: LaundryEntry[] = [];

  detailModalRef: MdbModalRef<LaundryItemViewDialogComponent> | null = null;
  acceptModalRef: MdbModalRef<AcceptAndAmmountComponent> | null = null;
  rejectModalRef: MdbModalRef<AccpetOrDenyComponent> | null = null;

  constructor(
    private laundryService: LaundryService,
    private modalService: MdbModalService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchLaundryList();
  }

/**
 * The `fetchLaundryList` function fetches laundry entries from a service and sorts them based on
 * pickup date.
 */
  fetchLaundryList(): void {
    this.laundryService.getLaundryEntries().subscribe((entries) => {
      this.laundryList = entries.sort((a, b) => {
        return new Date(a.pickupDate).getTime() - new Date(b.pickupDate).getTime()  ;
      });
    });
  }

 /**
  * The `viewDetails` function opens a modal dialog to display details of a laundry item.
  * @param {LaundryEntry} laundryItem - The `viewDetails` function takes a `laundryItem` parameter of
  * type `LaundryEntry`. This parameter represents an entry in a laundry list or database, containing
  * information about a specific laundry item such as its type, size, color, and any other relevant
  * details. When the `viewDetails
  */
  viewDetails(laundryItem: LaundryEntry) {
    this.detailModalRef = this.modalService.open(
      LaundryItemViewDialogComponent,
      {
        data: {
          laundryItem: laundryItem,
        },
      }
    );
  }

  /**
   * The `onAcceptLaundry` function opens a modal for accepting a laundry item and updates its status
   * to 'processing' upon acceptance.
   * @param {LaundryEntry} laundryItem - The `laundryItem` parameter in the `onAcceptLaundry` function
   * represents an object of type `LaundryEntry`. It likely contains information about a laundry
   * request, such as the item to be laundered, the customer's details, and the current status of the
   * request.
   */
  onAcceptLaundry(laundryItem: LaundryEntry) {
    this.acceptModalRef = this.modalService.open(AcceptAndAmmountComponent);
    this.acceptModalRef.onClose.subscribe((value: boolean) => {
      if (value) {
        laundryItem.status = 'processing';

        this.updateRequest(true, laundryItem, 'Laundry request is accepted');
      }
    });
  }
  /**
   * The function `onRejectLaundry` handles the rejection or marking as delivered of a laundry request
   * based on the current status.
   * @param {LaundryEntry} laundryItem - The `laundryItem` parameter in the `onRejectLaundry` function
   * represents an object that contains information about a laundry entry, such as the status of the
   * laundry request and delivery date.
   * @param {string} currentStatus - The `currentStatus` parameter in the `onRejectLaundry` function
   * represents the current status of a laundry item. It is a string that indicates whether the laundry
   * item is currently in a "requested" state or a "delivered" state. This parameter is used to
   * determine the actions to be
   */
  onRejectLaundry(laundryItem: LaundryEntry, currentStatus: string) {
    this.rejectModalRef = this.modalService.open(AccpetOrDenyComponent);
    this.rejectModalRef.onClose.subscribe((message: boolean) => {
      if (message) {
        if (currentStatus === 'requested') {
          laundryItem.status = 'rejected';
          // peforn the action accordind to yourself

          this.updateRequest(false, laundryItem, 'Laundry request is rejected');
        } else {
          laundryItem.status = 'delivered';
          const date = new Date();
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because month indexes start from 0
          const day = date.getDate().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}`;
          laundryItem.deliveryDate = formattedDate;
          // peforn the action accordind to yourself
        }

        this.updateRequest(
          true,
          laundryItem,
          'Laundry request is marked delivered!'
        );
      }
    });
  }

  /**
   * The function `filteredLaundryList` returns a filtered list of `LaundryEntry` items excluding those
   * with status 'delivered' or 'rejected'.
   * @returns The `getFilteredLaundryList` method is returning an array of `LaundryEntry` objects that
   * have a status other than 'delivered' and 'rejected'.
   */
  get filteredLaundryList(): LaundryEntry[] {
    return this.laundryList.filter(
      (item) => item.status !== 'delivered' && item.status !== 'rejected'
    );
  }

  updateRequest(success: boolean, laundryItem: LaundryEntry, message: string) {
  /* This code snippet is handling the update operation for a laundry entry. Here's a breakdown of what
  it does: */
    try {
      this.laundryService
        .updateLaundryEntry(laundryItem)
        .subscribe((response) => {
          console.log(response);

          // this.router.navigate(['/dashboard/admin']);

          this.toastr.success(message, '', {
            progressBar: true,
          });
        });
    } catch (error: any) {
      console.log(error);
      this.toastr.warning(error.name, '', {
        progressBar: true,
      });
      console.log(error);
    }
  }
}
