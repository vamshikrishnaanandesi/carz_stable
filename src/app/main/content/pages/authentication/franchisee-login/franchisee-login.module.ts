import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FranchiseeLoginComponent } from './franchisee-login.component';
import { FranchiseeLoginService } from './franchisee-login.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes = [
    {
        path     : 'franchisee-login',
        component: FranchiseeLoginComponent
    }
];

@NgModule({
    declarations: [
        FranchiseeLoginComponent
    ],
    imports     : [
        NgxSpinnerModule,
        SharedModule,
        HttpModule,
        HttpClientModule,
        RouterModule.forChild(routes),
        Ng4LoadingSpinnerModule.forRoot() 
    ],
    providers: [
        FranchiseeLoginService
    ]
})

export class FranchiseeLoginModule
{

}
