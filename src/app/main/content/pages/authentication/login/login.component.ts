import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { AppService } from '../../../../../app.service';
import { FuseNavigationService } from '../../../../../core/components/navigation/navigation.service';
import { FuseNavigationModel } from '../../../../../navigation/navigation.model';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fuse-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: fuseAnimations
}) 
export class FuseLoginComponent implements OnInit {
  name: string;
  // loginForm: FormGroup;
  page_loaded =  true;
  loginFormErrors: any;
  franchisee_object: any;
  franchisor_object: any;
  obj: any;
  public Formdata: any = [];
  username: any;
  password: any;
  Formdat: any;
  form_error_messages: any;
  user: any;
  user_data: any;
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  constructor(private spinner: NgxSpinnerService, private router: Router, private fuseConfig: FuseConfigService, private formBuilder: FormBuilder,
    public loginService: LoginService, public appService: AppService, private fuseNavigationService: FuseNavigationService,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
      this.username = '';
      this.password = '';
    this.name = `ngx-spinner`;
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    this.loginFormErrors = {
      username: {},
      password: {}
    };


  }

  ngOnInit() {
    this.page_loaded = true;
    // this.spinner.show();

    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);
    // this.loginForm = this.formBuilder.group({
    //     username: ['', [Validators.required, Validators.email]],
    //     password: ['', Validators.required]
    // });

    // this.loginForm.valueChanges.subscribe(() => {
    //     // this.onLoginFormValuesChanged();
    // });
  }

  // onLoginFormValuesChanged() {
  //     for (const field in this.loginFormErrors) {
  //         if (!this.loginFormErrors.hasOwnProperty(field)) {
  //             continue;
  //         }

  //         // Clear previous errors
  //         this.loginFormErrors[field] = {};

  //         // Get the control
  //         const control = this.loginForm.get(field);

  //         if (control && control.dirty && !control.valid) {
  //             this.loginFormErrors[field] = control.errors;
  //         }
  //     }
  // }

  // console.log('user', this.user);
  // alert('fdsfsd');
  // this.obj = {
  //     'user_mail': this.user,
  //     'user_pass': this.password,
  // };

  // Swamy 01
  // this.authenticationService.login(this.model.username, this.model.password)
  //     .subscribe(
  //     data => {
  //         this.router.navigate([this.returnUrl]);
  //     },
  //     error => {
  //         this.alertService.error(error);
  //         this.loading = false;
  //     });


  // Swamy 01 end
  //////
  // this.httpService.franchisorLogin(this.user)
  //     .subscribe(
  //     data => {
  //         console.log('success');
  //     },
  //     error => {
  //         console.log('error');
  //     });
  /////


  // const franchisee_object = {

  //         _id: '5a84a172c8371b3250f43438',
  //         user_mail: 'swamy@wtastudios.com',
  //         user_name: 'Swamy Reddy',
  //         user_pass: 'Swamy@123',
  //         user_type: 'franchisee'

  // };
  // const franchisor_object = {

  //         _id: '343434343',
  //         user_mail: 'admin@carz.com',
  //         user_name: 'Admin',
  //         user_pass: 'Carz@123',
  //         user_type: 'franchisor'

  // };
  //         console.log('this.username', this.username);
  //       if (response.state === 'success'){
  //           this.router.navigate(['/']);

  //////
  // console.log(this.user.user_mail);
  // if (this.user.user_mail === 'admin@carz.com') {
  //     sessionStorage.setItem('user_data', JSON.stringify(this.franchisor_object));
  // }
  // else {
  //     sessionStorage.setItem('user_data', JSON.stringify(this.franchisee_object));
  // }
  //////

  //   this.router.navigate(['/apps/franchisees/franchisee-list']);
  //         }
  //         if (response.state === 'failure'){
  //         }
  //     },
  //     err => {
  //       const message = 'login error.';
  //   });
  login_user(user, loginForm) {
    this.obj = {

      'user_mail': user.username,
      'user_pass': user.password,
    };
  this.spinner.show();
    this.loginService.franchisorLogin(this.obj).then((response) => {

      if (response.state === 'success') {
        this.page_loaded = false;
       // this.appService.setSession(response.user);
        // this.user_data = this.appService.getSession();
        // this.form_error_messages = response.message;
        localStorage.setItem('user_data', JSON.stringify(response.user));
        this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());
      this.router.navigate(['/apps/franchisees/franchisee-list']);
      //  this.router.navigate(['/apps/library/library-main']);
          this.page_loaded = false;
         // To show the spinner

      //  setTimeout(() => {
           // To hide the spinner
      //  }, 20000);
      }
      if (response.state === 'failure') {
        this.form_error_messages = response.message;
this.spinner.hide();
      }
    }).catch((error) => {
      const message = 'Error to login franchisee,';
      this.spinner.hide();
    });
    //     this.ng4LoadingSpinnerService.show();
    //     setTimeout(function() {
    //      this.ng4LoadingSpinnerService.hide();
    //    }.bind(this), 2000);


  }


}
