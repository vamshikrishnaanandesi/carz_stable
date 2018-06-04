import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import {NgxPaginationModule} from 'ngx-pagination';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { AppService } from './app.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppStoreModule } from './store/store.module';
import { AgmCoreModule } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropModule } from 'ngx-file-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FuseLoginComponent } from './main/content/pages/authentication/login/login.component';
import { LoginModule } from './main/content/pages/authentication/login/login.module';
import { AuthGuard } from './auth.gaurd';
import { FranchiseeDetailsModule } from './main/content/apps/common_components/franchisee-details/franchisee-details.module';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AutofocusModule } from 'angular-autofocus-fix';
import { ToasterModule } from 'angular5-toaster';
import { ChartsModule } from 'ng2-charts';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { SortablejsModule } from 'angular-sortablejs';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InternationalPhoneNumberModule } from 'ngx-international-phone-number';

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule'
    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path        : 'ui',
        loadChildren: './main/content/ui/ui.module#FuseUIModule'
    },
    {
        path        : 'services',
        loadChildren: './main/content/services/services.module#FuseServicesModule'
    },
    {
        path        : 'components',
        loadChildren: './main/content/components/components.module#FuseComponentsModule'
    },
    {
        path        : 'components-third-party',
        loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule'
    },

    // {
    //     path      : '**',
    //     redirectTo: 'apps/dashboards/analytics'
    // }
    {
        path      : '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path      : 'login',
        component: FuseLoginComponent
        // loadChildren: './pages/authentication/login/login.module#FuseLoginModule'
    }
    // {
    //     path      : 'login-2',
    //     redirectTo: 'pages/authentication/login-2.module#Login2Module'
    // }
];

@NgModule({
    imports: [
        ChartsModule,
        ToasterModule,
        AutofocusModule,
        NgxSpinnerModule,
        BrowserAnimationsModule,
        SharedModule,
        PdfViewerModule,
        FileDropModule,
        FormsModule,
        ReactiveFormsModule,
        CustomFormsModule,
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LoginModule,
        NgxPaginationModule,
        RouterModule.forRoot(appRoutes),
        FranchiseeDetailsModule,
        TranslateModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        AppStoreModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8',
            libraries: ['places']
        }),
        FuseMainModule,
        Ng2SearchPipeModule,
        Ng4GeoautocompleteModule.forRoot(),
        SortablejsModule,
        // BsDropdownModule,
         NgxIntlTelInputModule,
         InternationalPhoneNumberModule
    ],
    declarations: [
        AppComponent
    ],
    providers   : [
        AuthGuard,
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        AppService
    ],
    exports: [
        FranchiseeDetailsModule
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
