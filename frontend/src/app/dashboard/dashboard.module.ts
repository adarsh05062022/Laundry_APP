import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UserHomeComponent } from './user/pages/home/home.component';
import { MakeRequestComponent } from './user/pages/make-request/make-request.component';
import { UserActivitiesComponent } from './user/pages/activities/activities.component';
import { AdminActivitiesComponent } from './admin/pages/activities/activities.component';
import { RequestsComponent } from './admin/pages/requests/requests.component';
import { AdminHomeComponent } from './admin/pages/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { PricingComponent } from './shared/pricing/pricing.component';
import { MakeRequestFormComponent } from './user/components/make-request-form/make-request-form.component';
import { LaundryItemViewDialogComponent } from './shared/laundry-item-view-dialog/laundry-item-view-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcceptAndAmmountComponent } from './admin/components/accept-and-ammount/accept-and-ammount.component';
import { AccpetOrDenyComponent } from './shared/accpet-or-deny/accpet-or-deny.component';
import { ChartViewComponent } from './shared/chart-view/chart-view.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { NotificationComponent } from './shared/notification/notification.component';
import { Router } from '@angular/router';
import { AppValidatorService } from '../app-validator.service';
import { FeedbackFormComponent } from './user/components/feedback-form/feedback-form.component';
import { FeedbacksComponent } from './admin/pages/feedbacks/feedbacks.component';




@NgModule({
  declarations: [
    DashboardComponent,
    UserHomeComponent,
    MakeRequestComponent,
    UserActivitiesComponent,
    RequestsComponent,
    AdminHomeComponent,
    AdminActivitiesComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    PricingComponent,
    MakeRequestFormComponent,
    LaundryItemViewDialogComponent,
    AcceptAndAmmountComponent,
    AccpetOrDenyComponent,
    ChartViewComponent,
    NotificationComponent,
    FeedbackFormComponent,
    FeedbacksComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MdbTabsModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
    
  ],
  exports: [  DashboardComponent, DashboardRoutingModule]
})
export class DashboardModule { }
