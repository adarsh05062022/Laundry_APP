import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { LaundryEntry, LaundryService } from 'src/app/dashboard/laundry.service';
import { FeedbackFormComponent } from '../../components/feedback-form/feedback-form.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class UserHomeComponent implements OnInit {
  requested: number = 0;
  delivered: number = 0;
  rejected: number = 0;

  userDetails: {
    username: string;
    phone: string;
    address: string;
    feedback: string;
  } = {
    username: "",
    phone: "",
    address: "",
    feedback: "",
  };

  isPersonalDetailEditable: boolean = false;

  // Pie chart configuration
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['rejected', 'requested', 'delivered'];
  public pieChartDatasets = [
    {
      data: [this.rejected, this.requested, this.delivered],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  modalRef: MdbModalRef<FeedbackFormComponent> | null = null;

  constructor(
    private laundryService: LaundryService,
    private authService: AuthenticationService,
    private modalService: MdbModalService,
    private toastr: ToastrService
  ) {}

  laundryList: LaundryEntry[] = []; // Array to store user's laundry entries

  ngOnInit(): void {
    // Fetch user's laundry list and details when component initializes
    this.fetchLaundryList();
    this.fetchUserDetails();
  }

  // Fetches user details from the authentication service
  fetchUserDetails(): void {
    this.authService.getUserDetails().subscribe((response: any) => {
      this.userDetails = response.user;
    });
  }

  // Fetches the user's laundry list from the laundry service
  fetchLaundryList(): void {
    this.laundryService.getUserLaundryEntries().subscribe((entries) => {
      // Store the fetched laundry entries
      this.laundryList = entries;
      // Count the number of entries in different statuses
      this.rejected = this.laundryList.filter(
        (item) => item.status == 'rejected'
      ).length;
      this.delivered = this.laundryList.filter(
        (item) => item.status == 'delivered'
      ).length;
      this.requested = this.laundryList.filter(
        (item) => item.status == 'requested'
      ).length;
      // Update the pie chart datasets
      this.updatePieChartData();
    });
  }

  // Updates the data of the pie chart
  updatePieChartData(): void {
    this.pieChartDatasets = [
      {
        data: [this.rejected, this.requested, this.delivered],
      },
    ];
  }

  // Handler for the edit button click event
  editButtonClicked(): void {
    this.isPersonalDetailEditable = true; // Enable editing of personal details
  }

  // Updates user details
  updateDetails(): void {
    this.isPersonalDetailEditable = false; // Disable editing

    // Send updated user details to the authentication service for updating
    this.authService.updateUserDetails(this.userDetails).subscribe((response) => {
      this.toastr.success("User data updated successfully!", "");
    });
  }

  // Opens the feedback modal dialog
  openFeedbackModel(): void {
    // Open the feedback modal dialog
    this.modalRef = this.modalService.open(FeedbackFormComponent, {
      data: {
        feedbackText: this.userDetails.feedback, // Pass the user's feedback text
      },
    });

    // Subscribe to the modal close event
    this.modalRef.onClose.subscribe((message: any) => {
      if (message && message !== this.userDetails.feedback) {
        // If feedback text is changed, update user feedback in the backend
        this.userDetails.feedback = message;
        this.authService
          .updateUserDetails({ feedback: this.userDetails.feedback })
          .subscribe((response) => {
            this.toastr.success("Feedback sent successfully!", "");
          });
      }
    });
  }
}
