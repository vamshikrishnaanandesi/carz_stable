import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AssesmentsComponent } from './assesments.component';
import { ToasterModule } from 'angular5-toaster';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuestionsComponent } from './questions/questions.component';
import { CrmService } from '../crm/crm.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ResourcesListComponent } from './resources-list/resources-list.component';

const routes: Routes = [

  {
    path: 'assesments',
    component: AssesmentsComponent,
  },
  {
    path: 'questions',
    component: QuestionsComponent,
  },
  {
    path: 'resources-list',
    component: ResourcesListComponent,
  },
  {
    path: '**',
    redirectTo: 'assesments',
  }
];

@NgModule({
  imports: [
    NgxSpinnerModule,
    ToasterModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
     ],
  declarations: [
    AssesmentsComponent,
    QuestionsComponent,
    ResourcesListComponent
  ],
  providers: [CrmService]

})
export class AssesmentsModule {
}
