import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SortablejsModule } from 'angular-sortablejs';
import { CommonModule } from '@angular/common';
import { MarketingComponent } from './marketing.component';
import { MarketingService } from './marketing.service';
const routes = [

    {
      path: 'marketing',
      component: MarketingComponent
    },

    { 
      path: '**',
      redirectTo: 'marketing'
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
        RouterModule.forChild(routes),
        Ng4GeoautocompleteModule.forRoot(),
        SortablejsModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
      MarketingComponent
    ],
    providers: [
      MarketingService
    ]

  })
  export class MarketingModule{

  }
