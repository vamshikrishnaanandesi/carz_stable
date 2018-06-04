
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FranchiseeSetupComponent } from './franchisee-setup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatGridListModule, MatCardModule, MatAutocompleteModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CrmService } from '../crm.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToasterModule } from 'angular5-toaster';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ProgressBarModule} from 'angular-progress-bar';
import {PopoverModule} from 'ngx-popover';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { KnowledgeTransferComponent } from './knowledge-transfer/knowledge-transfer.component';
import { KnowledgeTransfer2Component } from './knowledge-transfer2/knowledge-transfer2.component';
import { StagecompletepopComponent } from './stagecompletepop/stagecompletepop.component';
import { ChatService } from '../../chat/chat.service';


const routes = [
  {
    path: 'franchisee-setup/:franchisee_Id/:stage_name',
    component: FranchiseeSetupComponent
  },
  {
    path: 'knowledge-transfer',
    component: KnowledgeTransferComponent
  },
  {
    path: 'stage-completed',
    component: StagecompletepopComponent
  },
  {
    path: 'knowledge-transfer2',
    component: KnowledgeTransfer2Component
  }
];


@NgModule({
  imports: [

    ToasterModule,
    NgxSpinnerModule,
    Ng2SearchPipeModule,
    SharedModule,
    HttpModule,
    PopoverModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    Ng4GeoautocompleteModule.forRoot(),
    NgCircleProgressModule.forRoot({
      'radius': 60,
      'space': -10,
      'outerStrokeWidth': 10,
      'outerStrokeColor': '#4882c2',
      'innerStrokeColor': '#e7e8ea',
      'innerStrokeWidth': 10,
      'animateTitle': false,
      'animationDuration': 1000,
      'showUnits': false,
      'showBackground': false,
      'clockwise': false
    }),
    ProgressBarModule
  ],
  declarations: [
    // SettingsApplicationComponent,
    FranchiseeSetupComponent,
    KnowledgeTransferComponent,
    KnowledgeTransfer2Component,
    StagecompletepopComponent

  ],
  providers   : [
    ChatService
],
  exports: [
    FranchiseeSetupComponent
  ]
})
export class FranchiseeSetupModule {
}
