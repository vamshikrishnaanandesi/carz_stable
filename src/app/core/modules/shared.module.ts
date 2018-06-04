import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseMatSidenavHelperDirective, FuseMatSidenavTogglerDirective } from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.directive';
import { FuseMatSidenavHelperService } from '../directives/fuse-mat-sidenav-helper/fuse-mat-sidenav-helper.service';
import { FusePipesModule } from '../pipes/pipes.module';
import { FuseConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { FuseCountdownComponent } from '../components/countdown/countdown.component';
import { FuseMatchMedia } from '../services/match-media.service';
import { FuseNavbarVerticalService } from '../../main/navbar/vertical/navbar-vertical.service';
import { FuseHighlightComponent } from '../components/highlight/highlight.component';
import { FusePerfectScrollbarDirective } from '../directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseIfOnDomDirective } from '../directives/fuse-if-on-dom/fuse-if-on-dom.directive';
import { FuseMaterialColorPickerComponent } from '../components/material-color-picker/material-color-picker.component';
import { FuseTranslationLoaderService } from '../services/translation-loader.service';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';
import { ChartsModule } from 'ng2-charts';
import { FranchiseeDetailsModule } from '../../main/content/apps/common_components/franchisee-details/franchisee-details.module';
import { DocumentsComponentModule } from '../../main/content/apps/common_components/documents-component/documents-component.module';
import { FranchiseeListModule } from '../../main/content/apps/common_components/franchisee-list/franchisee-list.module';
import { CommonDriveComponentModule } from '../../main/content/apps/common_components/common-drive/common-drive.module';
import { SetUpHeadingModule } from '../../main/content/apps/setUp_franchisee_process/set-up-heading/set-up-heading.module';

@NgModule({
    imports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FusePipesModule,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        ChartsModule,
        FranchiseeDetailsModule,
        DocumentsComponentModule,
        FranchiseeListModule,
        CommonDriveComponentModule,
        SetUpHeadingModule
    ],
    exports        : [
        FlexLayoutModule,
        MaterialModule,
        CommonModule,
        FormsModule,
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FusePipesModule,
        FuseCountdownComponent,
        FuseHighlightComponent,
        FusePerfectScrollbarDirective,
        ReactiveFormsModule,
        ColorPickerModule,
        NgxDnDModule,
        NgxDatatableModule,
        FuseIfOnDomDirective,
        FuseMaterialColorPickerComponent,
        TranslateModule,
        ChartsModule,
        FranchiseeDetailsModule,
        DocumentsComponentModule,
        FranchiseeListModule,
        CommonDriveComponentModule,
        SetUpHeadingModule
    ],
    entryComponents: [
        FuseConfirmDialogComponent
    ],
    declarations   : [
        FuseMatSidenavHelperDirective,
        FuseMatSidenavTogglerDirective,
        FuseConfirmDialogComponent,
        FuseCountdownComponent,
        FuseHighlightComponent,
        FuseIfOnDomDirective,
        FusePerfectScrollbarDirective,
        FuseMaterialColorPickerComponent
    ],
    providers      : [
        CookieService,
        FuseMatchMedia,
        FuseNavbarVerticalService,
        FuseMatSidenavHelperService,
        FuseTranslationLoaderService
    ]
})

export class SharedModule
{

}
