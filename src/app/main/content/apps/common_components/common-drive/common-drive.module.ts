import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { CommonServicesService } from '../common-services.service';
import { CommonDriveComponent } from './common-drive.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatGridListModule, MatCardModule} from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
// import { matIcon } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { AutofocusDirective } from './autofocus.directive';
// import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  imports: [
    MatMenuModule,
    MatIconModule,
    NgxSpinnerModule,
    ToasterModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule, MatCardModule, Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [
    CommonDriveComponent,
    AutofocusDirective
  ],
  exports: [
    CommonDriveComponent
  ]
})
export class CommonDriveComponentModule {

}

