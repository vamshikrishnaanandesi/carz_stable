import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CrmFranchiseeListComponent } from './crm-franchisee-list/crm-franchisee-list.component';
import { CrmFranchiseeComponent } from './crm-franchisee/crm-franchisee.component';
import { CrmService } from './crm.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateFranchiseeComponent } from './create-franchisee/create-franchisee.component';
import { MasterFranchiseeComponent } from './master-franchisee/master-franchisee.component';
import { FranchiseeSetupModule } from './franchisee-setup/franchisee-setup.module';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { EditFranchiseeComponent } from './edit-franchisee/edit-franchisee.component';
import { ReuploadRequestComponent } from './franchisee-setup/reupload-request/reupload-request.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { MasterFranchiseeListComponent } from './master-franchisee-list/master-franchisee-list.component';
import { MasterFranchiseeViewComponent } from './master-franchisee-view/master-franchisee-view.component';
import { ApproveFileComponent } from './franchisee-setup/approve-file/approve-file.component';
import { ViewFileComponent } from './franchisee-setup/view-file/view-file.component';
import { ViewfilesetupstageComponent } from './franchisee-setup/viewfilesetupstage/viewfilesetupstage.component';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';


// import { SettingsAppComponent } from './settings-app/settings-app.component';
const routes = [

    {
      path: 'crm-franchisee-list',
      component: CrmFranchiseeListComponent
    },

    {
      path: 'crm-franchisee/:id',
      component: CrmFranchiseeComponent
    },
    {
      path: 'create-franchisee/:type/:master_franchisee_id',
      component: CreateFranchiseeComponent
    },
    {
      path: 'crm-edit-franchisee/:franchisee_Id',
      component: EditFranchiseeComponent
    },
    {
      path: 'master-franchisee',
      component: MasterFranchiseeComponent
    },
    {
      path: 'master-franchisee-list',
      component: MasterFranchiseeListComponent
    },
    // {
    //   path: 'settings-app',
    //   component: SettingsAppComponent
    // },
    {
      path: 'master-franchisee-view/:franchisee_Id',
      component: MasterFranchiseeViewComponent
    },
    // {
    //   path: 'franchisee-setup/:franchisee_Id/:stage_name',
    //   loadChildren: './franchisee-setup/franchisee-setup.module#FranchiseeSetupModule'
    // },
    {
      path: 'reupload-request',
      component: ReuploadRequestComponent
    },
    {
      path: 'approve-request',
      component: ApproveFileComponent
    },
    {
      path: 'view-file',
      component: ViewFileComponent
    },
    {
      path: 'viewfilesetupstage',
      component: ViewfilesetupstageComponent
    },
    {
      path: 'meetings',
      component: MeetingsComponent
    },
    {
      path: '**',
      redirectTo: 'crm-franchisee-list'
    }
  ];

  @NgModule({
    imports     : [
        NgxSpinnerModule,
        ToasterModule,
        Ng2SearchPipeModule,
        SharedModule,
        HttpModule,
        FranchiseeSetupModule,
        RouterModule.forChild(routes),
        Ng4GeoautocompleteModule.forRoot(),
        NgxIntlTelInputModule,
        // BsDropdownModule,
        InternationalPhoneNumberModule
      ],
    declarations: [
      ImageCropperComponent,
        CrmFranchiseeListComponent,
        CrmFranchiseeComponent,
        CreateFranchiseeComponent,
        MasterFranchiseeComponent,
        EditFranchiseeComponent,
        ReuploadRequestComponent,
        MeetingsComponent,
        MasterFranchiseeListComponent,
        MasterFranchiseeViewComponent,
        ApproveFileComponent,
        ViewFileComponent,
        ViewfilesetupstageComponent
        // SettingsAppComponent
    ],
    providers: [
      CrmService

  ]
  })
  export class CrmModule{

  }
