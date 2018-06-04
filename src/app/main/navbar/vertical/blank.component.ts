import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs/Subscription';
import { FuseMatchMedia } from '../../../core/services/match-media.service';
import { FuseNavbarVerticalService } from './navbar-vertical.service';
import { ObservableMedia } from '@angular/flex-layout';
import { FuseMainComponent } from '../../main.component';
import { FuseNavigationService } from '../../../core/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '../../../core/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
@Component({
    selector   : 'fuse-blank',
    templateUrl  : './navbar-vertical.component.html',
    styleUrls    : ['./navbar-vertical.component.scss'],
})


export class BlankComponent
{
franchisee_Id: any;
constructor(private spinner: NgxSpinnerService,
    private router: Router, private route: ActivatedRoute) {
        this.franchisee_Id();
    }
// tslint:disable-next-line:use-life-cycle-interface
ngOnInit(){
    this.router.navigateByUrl('blank').then(() => {
        this.router.navigateByUrl('/apps/crm/franchisee-setup/' + this.franchisee_Id + '/discussion');
        console.log('naviate to any route which you want');
    });
}
}
