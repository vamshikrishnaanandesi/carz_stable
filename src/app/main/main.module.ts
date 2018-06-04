import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';
import { ShareComponent } from './content/share/share/share.component';
import {BlankComponent} from './navbar/vertical/blank.component';
import { EmptyComponent } from './empty/empty.component';
import { NgxSpinnerModule } from 'ngx-spinner';
const routes = [

    {
        path: 'empty',
        component: EmptyComponent
    },
];

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent,
        ShareComponent,
        EmptyComponent
    ],
    imports     : [
        NgxSpinnerModule,
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        RouterModule.forChild(routes),
        FuseSearchBarModule
    ],
    exports     : [
        FuseMainComponent
    ]
})

export class FuseMainModule
{
}
