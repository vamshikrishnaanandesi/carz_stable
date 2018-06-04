import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../common-services.service';
import { FranchiseeListComponent } from './franchisee-list.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatGridListModule, MatCardModule, MatAutocompleteModule } from '@angular/material';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatSelectModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import { ToasterModule } from 'angular5-toaster';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    NgxSpinnerModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    ToasterModule,
    MatMenuModule,
    MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatSelectModule, Ng2SearchPipeModule
  ],
  declarations: [
    FranchiseeListComponent
  ],
  exports: [
    FranchiseeListComponent
  ]
})
export class FranchiseeListModule {
}
