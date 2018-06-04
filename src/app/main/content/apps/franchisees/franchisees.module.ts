import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FranchiseesComponent } from './franchisees.component';
import { FranchiseesService } from './franchisees.service';
import { FranchiseeComponent } from './franchisee/franchisee.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { Http } from '@angular/http/src/http';
import { CreatefranchiseeComponent } from './createfranchisee/createfranchisee.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgmCoreModule } from '@agm/core';
// import {GooglePlaceModule} from 'angular2-google-place';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { FranchiseeViewComponent } from './franchisee-view/franchisee-view.component';
// import { FranchiseeDetailsComponent } from '../common_components/franchisee-details/franchisee-details.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
const routes = [
  {
    path: 'franchisee-list',
    component: FranchiseesComponent
  },
  {
    path: 'franchisee/:franchisee_Id',
    component: FranchiseeComponent
  },
  {
    path: 'editprofile',
    component: EditprofileComponent
  },
  {
    path: 'createfranchisee',
    component: CreatefranchiseeComponent
  },
  {
    path: 'franchisee-files/:franchisee_Id',
    component: FranchiseeViewComponent
  },
  {
    path: '**',
    redirectTo: 'franchisee-list'
  }
];

@NgModule({
  imports     : [
        FormsModule,
        CustomFormsModule,
        SharedModule,
        HttpModule,
        Ng2SearchPipeModule,
        RouterModule.forChild(routes),
        CommonModule,
        Ng4GeoautocompleteModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
    ],



  declarations: [
    FranchiseesComponent,
    FranchiseeComponent,
    EditprofileComponent,
    CreatefranchiseeComponent,
    FranchiseeViewComponent
  ],
  providers: [
    FranchiseesService
]
})
export class FranchiseesModule {
}
