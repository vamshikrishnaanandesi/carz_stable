import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DiscussionForumComponent } from './discussion-forum.component';
// import { CalendarService } from './calendar.service';
// import { CalendarModule } from 'angular-calendar';
// import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DiscussionForumSingleComponent } from './discussion-forum-single/discussion-forum-single.component';
import { DiscussionService } from './discussion.service';
import { DiscussionDialogViewComponent } from './discussion-dialog-view/discussion-dialog-view.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
const routes: Routes = [
  {
    path: 'discussion-forum',
    component: DiscussionForumComponent,
  },
  {
    path: 'discussion-forum-single/:question_id',
    component: DiscussionForumSingleComponent,
  },
  {
    path: 'discussion-dialog-view',
    component: DiscussionDialogViewComponent
  },
  {
    path: '**',
    redirectTo: 'discussion-forum',
  }
];

@NgModule({
  imports: [
    NgxSpinnerModule,
    ToasterModule,
    SharedModule,
    RouterModule.forChild(routes),
     ],
  declarations: [
    DiscussionForumComponent,
    DiscussionForumSingleComponent,
    DiscussionDialogViewComponent
  ],
  providers: [
    DiscussionService

]

})
export class DiscussionForumModule {
}
