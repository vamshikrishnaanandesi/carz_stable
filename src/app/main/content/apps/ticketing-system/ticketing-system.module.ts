import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TicketingSystemComponent } from './ticketing-system.component';
// import { CalendarService } from './calendar.service';
// import { CalendarModule } from 'angular-calendar';
// import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TicketingSystemSingleComponent } from './ticketing-system-single/ticketing-system-single.component';
import { TicketingSystemService } from './ticketing-system.service';
// import { DiscussionForumSingleComponent } from './discussion-forum-single/discussion-forum-single.component';
const routes: Routes = [
  {
    path: 'ticketing-system',
    component: TicketingSystemComponent,
  },
  {
    path: 'ticketing-system-single/:id',
    component: TicketingSystemSingleComponent,
  },
   {
    path: '**',
    redirectTo: 'ticketing-system',
  }
];

@NgModule({
  imports: [
    ToasterModule,
    NgxSpinnerModule,
    SharedModule,
    RouterModule.forChild(routes),
     ],
  declarations: [
    TicketingSystemComponent,
    TicketingSystemSingleComponent
  ],
  providers: [
    TicketingSystemService
  ]

})
export class TicketingSystemModule {
}
