import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FuseLoginComponent } from './login.component';
import { LoginService } from './login.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppModule } from 'app/app.module';

const routes: Routes = [
    {
        path     : '',
        component: FuseLoginComponent,
        data: {
     title: 'Login' }
    }
];
// const routes: Routes = [
//   {
//     path: '',
//     component: CustomerListComponent
//   }
// ];


@NgModule({
    declarations: [
        FuseLoginComponent
    ],
    imports     : [
        HttpModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        Ng4LoadingSpinnerModule.forRoot(),
        NgxSpinnerModule,
    ],
    providers: [
        LoginService
    ]

})

export class LoginModule
{

}
