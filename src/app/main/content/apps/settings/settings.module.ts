import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SettingsComponent } from './settings.component';
import { SettingService } from './settings_service';
import { SettingsApplicationComponent } from './settings-application/settings-application.component';
import { SettingsSetupComponent } from './settings-setup/settings-setup.component';
import { SortablejsModule } from 'angular-sortablejs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddChecklistComponent } from './settings-setup/add-checklist/add-checklist.component';
import { AddCampaignComponent } from './add-campaign/add-campaign.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ViewFileUploadComponent } from './settings-setup/view-file-upload/view-file-upload.component';
const routes = [

    {
      path: 'settings',
      component: SettingsComponent
    },
    {
      path: 'settings-application',
      component: SettingsApplicationComponent
    },
    {
      path: 'settings-setup',
      component: SettingsSetupComponent
    },
    {
      path: 'add-checklist',
      component: AddChecklistComponent
    },
    {
      path: 'view-file-upload',
      component: ViewFileUploadComponent
    },
    {
      path: 'add-campaign',
      component: AddCampaignComponent
    },
    {
      path: '**',
      redirectTo: 'settings-application'
    }
  ];

  @NgModule({
    imports     : [
        CommonModule,
        NgxSpinnerModule,
        ToasterModule,
        Ng2SearchPipeModule,
        SharedModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        RouterModule.forChild(routes),
        Ng4GeoautocompleteModule.forRoot(),
        SortablejsModule
      ],
    declarations: [
      SettingsComponent,
      SettingsApplicationComponent,
      SettingsSetupComponent,
      AddChecklistComponent,
      AddCampaignComponent,
      AddCampaignComponent,
      ViewFileUploadComponent
    ],
    providers: [
      SettingService

  ]
  })
  export class SettingsModule{

  }
