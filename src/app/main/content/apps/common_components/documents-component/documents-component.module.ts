import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { CommonServicesService } from '../common-services.service';
import { DocumentsComponentComponent } from './documents-component.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule, MatCardModule} from '@angular/material';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  imports: [
    MatIconModule,
    MatMenuModule,
        NgxSpinnerModule,
    ToasterModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
     MatCheckboxModule,
     MatGridListModule, MatCardModule
  ],
  declarations: [
    DocumentsComponentComponent
  ],
  exports: [
    DocumentsComponentComponent
  ]
})
export class DocumentsComponentModule {
}
