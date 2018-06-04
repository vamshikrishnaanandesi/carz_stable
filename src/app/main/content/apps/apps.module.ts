import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';
import { FranchiseesComponent } from './franchisees/franchisees.component';
import { LibraryComponent } from './library/library.component';
import { CrmComponent } from './crm/crm.component';
import { AuthGuard } from '../../../auth.gaurd';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { MarketingComponent } from './marketing/marketing.component';
import { DiscussionForumComponent } from './discussion-forum/discussion-forum.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { AssesmentsComponent } from './assesments/assesments.component';

const routes = [
    {
        path        : 'dashboards/project',
        loadChildren: './dashboards/project/project.module#FuseProjectDashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#FuseAnalyticsDashboardModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'mail',
        loadChildren: './mail/mail.module#FuseMailModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'mail-ngrx',
        loadChildren: './mail-ngrx/mail.module#FuseMailNgrxModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'chat',
        loadChildren: './chat/chat.module#FuseChatModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'calendar',
        loadChildren: './calendar/calendar.module#FuseCalendarModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'e-commerce',
        loadChildren: './e-commerce/e-commerce.module#FuseEcommerceModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'academy',
        loadChildren: './academy/academy.module#FuseAcademyModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'franchisees',
        loadChildren: './franchisees/franchisees.module#FranchiseesModule',
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'franchisee',
    //     loadChildren: './franchisees/franchisees.module#FranchiseesModule',
    //     canActivate: [AuthGuard]
    //   },

      {
        path: 'library',
        loadChildren: './library/library.module#LibraryModule',
        canActivate: [AuthGuard]
      },

      {
        path: 'crm',
        loadChildren: './crm/crm.module#CrmModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'discussion-forum',
        loadChildren: './discussion-forum/discussion-forum.module#DiscussionForumModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'assesments',
        loadChildren: './assesments/assesments.module#AssesmentsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'ticketing-system',
        loadChildren: './ticketing-system/ticketing-system.module#TicketingSystemModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'marketing',
        loadChildren: './marketing/marketing.module#MarketingModule',
        canActivate: [AuthGuard]
    },

    {
        path        : 'todo',
        loadChildren: './todo/todo.module#FuseTodoModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'file-manager',
        loadChildren: './file-manager/file-manager.module#FuseFileManagerModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'contacts',
        loadChildren: './contacts/contacts.module#FuseContactsModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'scrumboard',
        loadChildren: './scrumboard/scrumboard.module#FuseScrumboardModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports     : [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        FuseAngularMaterialModule
    ],
    declarations: []
})
export class FuseAppsModule
{
}
