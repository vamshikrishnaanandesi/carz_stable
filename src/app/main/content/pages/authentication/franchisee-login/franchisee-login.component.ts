import { Component, OnInit } from '@angular/core';
import { FranchiseeLoginService } from './franchisee-login.service';
import { fuseAnimations } from '../../../../../core/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { Router } from '@angular/router';
import { AppService} from '../../../../../app.service';
import { FuseNavigationService } from '../../../../../core/components/navigation/navigation.service';
import { FuseNavigationModel } from '../../../../../navigation/navigation.model';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'fuse-franchisee-login',
  templateUrl: './franchisee-login.component.html',
  styleUrls: ['./franchisee-login.component.scss'],
  animations: fuseAnimations
})
export class FranchiseeLoginComponent implements OnInit {
  obj: any;
    page_loaded =  true;
  FranchiseeloginFormErrors: any;
  username: any;
  password: any;
  form_error_messages: any;
  user: any;
  spinnerConfig: object = {
    bdColor: 'black',
    size: 'medium',
    color: '#fff',
    type : 'ball-clip-rotate'
  };
  constructor(private spinner: NgxSpinnerService, private router: Router, private fuseConfig: FuseConfigService, private formBuilder: FormBuilder,
    private franchiseeLoginService: FranchiseeLoginService,  public appService: AppService,   private fuseNavigationService: FuseNavigationService,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    this.fuseConfig.setSettings({
        layout: {
            navigation: 'none',
            toolbar: 'none',
            footer: 'none'
        }
    });

    this.FranchiseeloginFormErrors = {
        username: {},
        password: {}
    };
  }

  ngOnInit() {
    this.page_loaded = true;
  }
  // franchiseeloginreset(){
  //   this.obj = {
  //     'franchisee_email': this.username,
  //     'franchisee_pass': this.password,
  //
  //   };
  //     if (this.franchisee_email && this.franchisee_pass){
  //     this.httpService.franchiseeloginreset(this.obj).subscribe(response => {
  //       if (response.state === 'success'){
  //       }
  //         if (response.state === 'failure'){
  //
  //         }
  //       },
  //       err => {
  //         const message = 'Error to reset password.';
  //           });
  //   }
  // }
  franchiseelogin(user){
    this.obj = {
      'franchisee_email': user.username,
      'franchisee_pass': user.password
    };
    this.spinner.show();
      this.franchiseeLoginService.franchiseelogin(this.obj).subscribe(response => {
        if (response.state === 'success'){
          this.page_loaded = false;
          // this.user_data =
          // this.appService.setSession(response.user);
          response.user.show_kt_popup_first_time = true;
          localStorage.setItem('user_data', JSON.stringify(response.user));
      //  this.user_data = this.appService.getSession();
          this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());
          // tslint:disable-next-line:no-shadowed-variable
          this.franchiseeLoginService.viewFranchiseeById(response.user._id).subscribe(response => {
          if (response.state === 'success') {
            localStorage.setItem('state', JSON.stringify(response.franchisees_data));
            this.router.navigate(['/apps/crm/franchisee-setup/' + response.franchisees_data._id + '/discussion']);
          }
          if (response.state === 'failure') {
          }
        },
          err => {
            const message = 'Error to load franchisees.';
          });
          // this.router.navigate(['/apps/franchisees/franchisee/' + response.user._id]);

          this.router.navigate(['/apps/crm/franchisee-setup/' + response.user._id + '/discussion']);
          this.page_loaded = false;

        }
        if (response.state === 'failure'){
          this.form_error_messages = response.message;
          this.spinner.hide();
        }
      },
      err => {
        const message = 'Error to login franchisee,';
        this.spinner.hide();
      });


      // setTimeout(() => {
      //   this.spinner.hide();
      // }, 2000);
  }
}
