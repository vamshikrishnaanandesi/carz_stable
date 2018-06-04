import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { SetUpHeadingComponent } from './set-up-heading.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatFormFieldModule,MatGridListModule, MatCardModule, MatAutocompleteModule} from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule,MatSelectModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule,MatAutocompleteModule,MatInputModule,MatSelectModule,Ng2SearchPipeModule
  ],
  declarations: [
    SetUpHeadingComponent
  ],
  exports: [
    SetUpHeadingComponent
  ]
})
export class SetUpHeadingModule {
}
