import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatDialog, MatDialogRef } from '@angular/material';
// import { FuseCalendarEventFormDialogComponent } from './event-form/event-form.component';
import { FormGroup } from '@angular/forms';
import { CalendarEventModel } from './event.model';
import { CalendarService } from './calendar.service';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarMonthViewDay,
  CalendarDateFormatter
} from 'angular-calendar';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '../../../../core/animations';
import { ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { CalendarFileViewComponent } from './calendar-file-view/calendar-file-view.component';
@Component({
  selector: 'fuse-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  providers: [
     {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ]
})
// tslint:disable-next-line:class-name
// export interface extendedCalendarEvent extends CalendarEvent {
//   campaign_id: String;
// }
export class FuseCalendarComponent implements OnInit {

  url: any;
  franchisor_id: any;

  public obj: any;
  public calenderTabs = ['Calender', 'Campaigns'];
  array = [];
  campaign_files = [];
  isEdit = false;
  view: string;
  viewDate: Date;
  events: CalendarEvent[];
  public actions: CalendarEventAction[];
  activeDayIsOpen: boolean;
  refresh: Subject<any> = new Subject();
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  selectedDay: any;
  private toasterService: ToasterService;
  public fileToUpload: File = null;
  campaign_type = [
    {
      id: 0,
      type_mode: 'Online'
    },
    {
      id: 1,
      type_mode: 'Offline'
    }
  ];
  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
  campaigns = [];
  campaign: any = {};
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  campaignForm: any;
  createdbyValue: any;

  CreatedValues = [
    {value: 'All', viewValue: 'All'},
    {value: 'Franchisor', viewValue: 'Franchisor'},
    {value: 'Franchisee', viewValue: 'Franchisee'}
  ];
  SelectedColor: any;

  SelectedColors = [
    {value: '#92a8d1', viewValue: 'Light Blue'},
    {value: '#034f84', viewValue: 'Navy Blue'},
    {value: '#f7cac9', viewValue: 'Light Pink'},
    {value: '#f7786b', viewValue: 'Pink'},
    {value: '#deeaee', viewValue: 'Gray'},
    {value: '#eea29a', viewValue: 'Light Green'},
    {value: '#c94c4c', viewValue: 'Maroon'}
  ];


  // campaigns =  [
  //             {
  //                 start    : subDays(startOfDay(new Date()), 1),
  //                 end      : addDays(new Date(), 1),
  //                 title    : 'A 3 day event',
  //                 allDay   : false,
  //                 actions : [],
  //                 color    : {
  //                     primary  : '#ad2121',
  //                     secondary: '#FAE3E3'
  //                 },
  //                 budget : '20000',
  //                 resizable: {
  //                     beforeStart: true,
  //                     afterEnd   : true
  //                 },
  //                 draggable: true,
  //                 meta     : {
  //                     location: 'Los Angeles',
  //                     notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
  //                 }
  //             },
  //             {
  //                 start    : startOfDay(new Date()),
  //                 title    : 'An event with no end date',
  //                 allDay   : false,
  //                 color    : {
  //                     primary  : '#e3bc08',
  //                     secondary: '#FDF1BA'
  //                 },
  //                 budget : '20000',
  //                 actions : [],
  //                 resizable: {
  //                     beforeStart: true,
  //                     afterEnd   : true
  //                 },
  //                 draggable: true,
  //                 meta     : {
  //                     location: 'Los Angeles',
  //                     notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
  //                 }
  //             },
  //             {
  //                 start    : subDays(endOfMonth(new Date()), 3),
  //                 end      : addDays(endOfMonth(new Date()), 3),
  //                 title    : 'A long event that spans 2 months',
  //                 allDay   : false,
  //                 actions : [],
  //                 color    : {
  //                     primary  : '#1e90ff',
  //                     secondary: '#D1E8FF'
  //                 },
  //                 budget : '20000',
  //                 resizable: {
  //                     beforeStart: true,
  //                     afterEnd   : true
  //                 },
  //                 draggable: true,
  //                 meta     : {
  //                     location: 'Los Angeles',
  //                     notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
  //                 }
  //             },
  //             {
  //                 start    : addHours(startOfDay(new Date()), 2),
  //                 end      : new Date(),
  //                 actions : [],
  //                 title    : 'A draggable and resizable event',
  //                 allDay   : false,
  //                 color    : {
  //                     primary  : '#e3bc08',
  //                     secondary: '#FDF1BA'
  //                 },
  //                 resizable: {
  //                     beforeStart: true,
  //                     afterEnd   : true
  //                 },
  //                 draggable: true,
  //                 meta     : {
  //                     location: 'Los Angeles',
  //                     notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
  //                 }
  //             }
  // ];
  // navbar right
  rightnavstatus: any = false;
  Viewrightnavstatus: any = false;
  Editrightnavstatus: any = false;
  private _opened: any = false;
  public navtypeselected: any = 'option2';
  public CreatedByselected: any = 'All';
  private _right: any;
  campaign_id(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public httpService: CalendarService,
    private spinner: NgxSpinnerService, toasterService: ToasterService,
    private mapsAPILoader: MapsAPILoader

  ) {
    // this.getCampaign(this.route.snapshot.params['campaign_id']);
    this.view = 'month';
    this.viewDate = new Date();
    this.activeDayIsOpen = true;
    this.selectedDay = { date: startOfDay(new Date()) };

    // this.actions = [
    //   {
    //     label: '<i class="material-icons s-16">edit</i>',
    //     onClick: ({ event }: { event: CalendarEvent }): void => {
    //       // this.editEvent('edit', event);
    //     }
    //   },
    //   {
    //     label: '<i class="material-icons s-16">delete</i>',
    //     onClick: ({ event }: { event: CalendarEvent }): void => {
    //       this.deleteEvent(event);
    //     }
    //   }
    // ];

    /**
     * Get events from service/server
     */
    // this.setEvents();
    this.getAllCampaigns();
    this.toasterService = toasterService;
  }

  ngOnInit() {
    // this.getAllCampaigns();
    /**
     * Watch re-render-refresh for updating db
     */

    this.refresh.subscribe(updateDB => {
      // console.warn('REFRESH');
      if (updateDB) {
        // console.warn('UPDATE DB');
        // this.httpService.updateEvents(this.campaign);
      }
    });
    // this.setEvents();
    // this.refresh.next();
    this.httpService.onEventsUpdated.subscribe(events => {
      this.setEvents();
      this.refresh.next();
    });
    console.log(this.campaigns);
    // this.getCampaign(this.route.snapshot.params['campaign_id']);
    // this.getCampaignFiles(this.franchisor_id);
  }

  setEvents() {
    // console.log(this.campaigns[0]);
    this.events = this.campaigns.map(item => {
      console.log(item);
      item.actions = this.actions;
      // item.meta.campaign_id = 'te2st';
      // item.location = item.location;
      // item.notes = item.notes;
      console.log(item);
      return new CalendarEventModel(item);
    });
  }

  /**
   * Before View Renderer
   * @param {any} header
   * @param {any} body
   */
  beforeMonthViewRender({ header, body }) {
    // console.info('beforeMonthViewRender');
    /**
     * Get the selected day
     */
    const _selectedDay = body.find((_day) => {
      return _day.date.getTime() === this.selectedDay.date.getTime();
    });

    if (_selectedDay) {
      /**
       * Set selectedday style
       * @type {string}
       */
      _selectedDay.cssClass = 'mat-elevation-z3';
    }

  }

  /**
   * Day clicked
   * @param {MonthViewDay} day
   */
  dayClicked(day: CalendarMonthViewDay): void {
    const date: Date = day.date;
    const events: CalendarEvent[] = day.events;
    console.log('events',  day.events);
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      }
      else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
    this.selectedDay = day;
    this.refresh.next();
  }

  /**
   * Event times changed
   * Event dropped or resized
   * @param {CalendarEvent} event
   * @param {Date} newStart
   * @param {Date} newEnd
   */
  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // console.warn('Dropped or resized', event);
    this.refresh.next(true);
  }

  /**
   * Delete Event
   * @param event
   */
  deleteEvent(event) {
    this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        const eventIndex = this.campaigns.indexOf(event);
        this.campaigns.splice(eventIndex, 1);
        this.refresh.next(true);
      }
      this.confirmDialogRef = null;
    });

  }

  /**
   * Edit Event
   * @param {string} action
   * @param {CalendarEvent} event
   */
  editEvent(action: string, event: CalendarEvent, eventmeta: Object) {
    console.log(eventmeta);
    console.log(event);
    console.log("Swamy");
    this.Viewrightnavstatus = !this.Viewrightnavstatus;
    const eventIndex = this.events.indexOf(event);

    // this.dialogRef = this.dialog.open(FuseCalendarEventFormDialogComponent, {
    //     panelClass: 'event-form-dialog',
    //     data      : {
    //         event : event,
    //         action: action
    //     }
    // });
    this.campaign = event;
    // console.log(this.campaign);

    // this.dialogRef.afterClosed()
    // .subscribe(response => {
    //     if ( !response )
    //     {
    //         return;
    //     }
    //     const actionType: string = response[0];
    //     const formData: FormGroup = response[1];
    //     switch ( actionType )
    //     {
    //         /**
    //          * Save
    //          */
    //         case 'save':

    //             this.events[eventIndex] = Object.assign(this.events[eventIndex], formData.getRawValue());
    //             this.refresh.next(true);

    //             break;
    //         /**
    //          * Delete
    //          */
    //         case 'delete':

    //             this.deleteEvent(event);

    //             break;
    //     }
    // });
  }

  /**
   * Add Event
   */
  // addEvent(): void
  // {
  //     this.dialogRef = this.dialog.open(FuseCalendarEventFormDialogComponent, {
  //         panelClass: 'event-form-dialog',
  //         data      : {
  //             action: 'new',
  //             date  : this.selectedDay.date
  //         }
  //     });
  //     this.dialogRef.afterClosed()
  //         .subscribe((response: FormGroup) => {
  //             if ( !response )
  //             {
  //                 return;
  //             }
  //             const newEvent = response.getRawValue();
  //             newEvent.actions = this.actions;
  //             this.campaigns.push(newEvent);
  //             this.refresh.next(true);
  //         });
  // }
  getAllCampaigns() {
    this.httpService.getAllCampaigns().subscribe(response => {
      if (response.state === 'success') {
        this.campaigns = response.data;
        this.setEvents();
        console.log(this.campaigns);
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load data';
      });
  }

  // To create campaign
  create_campaign(campaignForm) {
    this.campaign.meta = {
      location: this.campaign.location,
      notes: this.campaign.notes
    };
    if (campaignForm.valid === true) {
    this.spinner.show();
    console.log(campaignForm);
    const fd = new FormData();
    fd.append('campaign', JSON.stringify(this.campaign));
    fd.append('campaign_file', this.fileToUpload);
    console.log(this.fileToUpload);
      this.httpService.createCampaign(fd).subscribe(response => {
        if (response.state === 'success') {
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Campaign created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();
          this.campaign = '';
          this.getAllCampaigns();
          this.rightnavstatus = false;

        }
        if (response.state === 'failure') {
          const toast: Toast = {
            type: 'error',
            title: 'Error',
            timeout: 2000,
            body: '<h5>Failed to create</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();

        }
      },
        err => {
          this.spinner.hide();
          const message = 'Error to load data';
        });
    }
  }

  handleFileInput_campaigns_files(files: FileList, val) {
    this.fileToUpload = files.item(0);
  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // remove_file(index) {
  //   this.campaigns[index].answer = '';
  //   this.campaigns[index].file_name = '';
  // }

  updateCampaign() {

    this.spinner.show();
    this.httpService.updateCampaign(this.campaign).subscribe(response => {
      if (response.state === 'success') {
        this.isEdit = true;
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Campaign updated</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        this.Editrightnavstatus = false;
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to update</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to load data';
      });
  }

  deleteCampaign(id) {
    // console.log(campaign);
    // this.spinner.show();
    this.httpService.deleteCampaignById(this.campaign._id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Campaign deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        // const index = this.array.indexOf(campaign_id);
        // this.campaign.splice(index, 1);
        // if (this.campaign.length === 1) {
        //   this.campaign = [];
        // }
        this.getAllCampaigns();
        this.Viewrightnavstatus = true;
        // this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to delete</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        // this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to load campaigns.';
      });
  }

  EditclickEvent() {
    this.Editrightnavstatus = !this.Editrightnavstatus;
    this.Viewrightnavstatus = false;
  }

  clickEvent() {
    this.rightnavstatus = !this.rightnavstatus;
  }
  viewEvent(action: string, event: CalendarEvent) {
    // console.log(event);
    // this.campaign.meta = {
    //   location: this.campaign.location,
    //   notes: this.campaign.notes
    // };
    this.Viewrightnavstatus = !this.Viewrightnavstatus;
  }
  // private _toggleSidebar() {
  //   this._opened = !this._opened;
  // }
  autoCompleteCallback(selectedData) {
    this.campaign.location = selectedData.data.address_components[0].long_name;
  }


  //to upload setup checklist task files
upload_campaign_files(files: FileList) {
  this.obj = {
    'franchisor_id' : this.franchisor_id
  };
  const fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append('files_upload', files[i], files[i]['name']);
  }
  fd.append('file_details', JSON.stringify(this.obj));
  this.spinner.show();
  this.httpService.upload_campaign_file(fd).subscribe(response => {
    // this.campaign = response.files;
    if (response.status === 'success') {
      console.log(response);
      // this.getCampaignFiles('campaign_id');
      this.campaign_files = response.files;
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>File uploaded</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.spinner.hide();
    }
    if (response.status === 'failure'){
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        timeout: 2000,
        body: '<h5>Failed to upload</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.spinner.hide();
    }
  },
    err => {
      const message = 'Error to load franchisees.';
      this.spinner.hide();
    });
}
handleFileInput_campaign_files(files: FileList) {
 this.fileToUpload = files.item(0);
 console.log(this.fileToUpload);
  this.upload_campaign_files(files);
}


getCampaignFile(id) {
  this.httpService.getCampaignFiles(id).subscribe(response => {
    if (response.state === 'success') {
      this.campaign_files = response.files;
    }
    if (response.state === 'failure') {
    }
  },
    err => {
      const message = 'Error to load franchisee.';
    });
}

//   // To get checklist task by checklist id
//   getCampaignFiles(campaign_id) {
//     this.httpService.getCampaignFiles(campaign_id).subscribe(response => {
//       if (response.state === 'success') {
//         for (let i = 0; i < response.data.length; i++){
//           response.data[i].order = i;
//         }
//         this.campaign_files = response.files;
//       }
//       if (response.state === 'failure') {
//       }
//     },
//       err => {
//         const message = 'Error to load data';
//       });
//   }
view_fileUpload(Uploadfile): void {
  localStorage.setItem('viewCalendarFileView', JSON.stringify(Uploadfile));

  const dialogRef = this.dialog.open(CalendarFileViewComponent, {
    width: '400px',
    height: 'auto',
    panelClass: 'fileView'



  });
}

}
