import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/pages/home/home.component';
import { UserHomeComponent } from './user/pages/home/home.component';
import { MakeRequestComponent } from './user/pages/make-request/make-request.component';
import { UserActivitiesComponent } from './user/pages/activities/activities.component';
import { RequestsComponent } from './admin/pages/requests/requests.component';
import { AdminActivitiesComponent } from './admin/pages/activities/activities.component';
import { MainComponent } from './layout/main/main.component';
import { FeedbacksComponent } from './admin/pages/feedbacks/feedbacks.component';

const routes: Routes = [
  
  { 
    path: '', 
    component: MainComponent,
    children: [
      
      { path: 'admin', component: AdminHomeComponent },
      { path: 'user', component: UserHomeComponent },
      { path: 'user/make-request', component: MakeRequestComponent },
      { path: 'user/activities', component: UserActivitiesComponent },
      { path: 'admin/requests', component: RequestsComponent },
      { path: 'admin/activities', component: AdminActivitiesComponent },
      { path: 'admin/feedbacks', component: FeedbacksComponent },
      // Add more child routes as needed
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
