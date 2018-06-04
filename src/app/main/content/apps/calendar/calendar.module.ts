import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FuseCalendarComponent } from './calendar.component';
import { CalendarService } from './calendar.service';
import { CalendarModule } from 'angular-calendar';
import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { CalendarFileViewComponent } from './calendar-file-view/calendar-file-view.component';
const routes: Routes = [
    {
        path     : '**',
        component: FuseCalendarComponent,
        children : [],
        resolve  : {
            chat: CalendarService
        }
    },
    {
        path: 'calendar-file-view',
        component: CalendarFileViewComponent
      },
];

@NgModule({
    imports        : [
        ToasterModule,
        NgxSpinnerModule,
        SharedModule,
        RouterModule.forChild(routes),
        CalendarModule.forRoot(),
        Ng4GeoautocompleteModule.forRoot()
    ],
    declarations   : [
        FuseCalendarComponent,
        FuseCalendarEventFormDialogComponent,
        CalendarFileViewComponent
    ],
    providers      : [
        CalendarService
    ],
    entryComponents: [FuseCalendarEventFormDialogComponent]
})
export class FuseCalendarModule
{
}
