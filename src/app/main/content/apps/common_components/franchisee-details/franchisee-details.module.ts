import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonServicesService } from '../common-services.service';
import { FranchiseeDetailsComponent } from './franchisee-details.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
// import {  MatSelect } from '@angular/material/select';
// import {  MatOption } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ToasterModule,
    NgxSpinnerModule
  ],
  declarations: [
    FranchiseeDetailsComponent
  ],
  exports: [
    FranchiseeDetailsComponent,
  ]
})
export class FranchiseeDetailsModule {
}
