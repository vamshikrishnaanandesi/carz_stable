import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { LibraryComponent } from './library.component';
import { FranchiseeFolderComponent } from './franchisee-folder/franchisee-folder.component';
import { FranchiseeSeperateFolderComponent } from './franchisee-seperate-folder/franchisee-seperate-folder.component';
// import { Http } from '@angular/http/src/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { LibraryService } from './library.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileViewerComponent } from 'ngx-file-viewer';
import { ImageViewerModule } from 'ng2-image-viewer';

import { CommonFolderComponent } from './common-folder/common-folder.component';
// import { FranchiseeViewComponent } from '../franchisees/franchisee-view/franchisee-view.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonDriveSettingsComponent } from './common-drive-settings/common-drive-settings.component';
import { DialogFileViewComponent } from './dialog-file-view/dialog-file-view.component';
import { FranchiseeSubFoldersComponent } from './franchisee-sub-folders/franchisee-sub-folders.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
// FranchiseeViewComponent

const routes = [
  {
    path: 'library-main',
    component: LibraryComponent
  },
  {
    path: 'dialog-file-view/:id/:file._id',
    component: DialogFileViewComponent
  },
  {
    path: 'franchisee-folder/:franchisee_Id',
    component: FranchiseeFolderComponent
  },
  {
    path: 'franchisee-seperate-folder/:id/:folder_Id',
    component: FranchiseeSeperateFolderComponent
  },
  {
    path: 'franchisee-sub-folder/:franchisee_Id/:id',
    component: FranchiseeSubFoldersComponent
  },
  {

    path: 'common-folder/:id',
    component: CommonFolderComponent
  },
  {
    path: 'common-drive-settings',
    component: CommonDriveSettingsComponent

  },
  {
    path: '**',
    redirectTo: 'library-main'
  }
];

@NgModule({
  imports: [
    PdfViewerModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ImageViewerModule,
    CommonModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    NgxSpinnerModule,
  ],
  declarations: [
    LibraryComponent,
    FranchiseeFolderComponent,
    // FranchiseeViewComponent,
    FranchiseeSeperateFolderComponent,
    CommonFolderComponent,
    CommonDriveSettingsComponent,
    DialogFileViewComponent,
    FranchiseeSubFoldersComponent


  ],
  providers: [
    LibraryService
],
entryComponents: [
  DialogFileViewComponent
]

})
export class LibraryModule {
}
