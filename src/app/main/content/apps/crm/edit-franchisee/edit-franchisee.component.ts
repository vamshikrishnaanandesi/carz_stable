/* Edited by Swamy 04/18/2018
    -get_business_type added
*/



import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CrmService } from '../crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { MatSnackBar, MatTabChangeEvent, MatTabsModule } from '@angular/material';
import { id } from '@swimlane/ngx-charts/release/utils';
import { AppSettings } from '../../../../../constants.component';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import Swal from 'sweetalert2';
declare var swal: any;
import { Location } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'fuse-edit-franchisee',
  templateUrl: './edit-franchisee.component.html',
  styleUrls: ['./edit-franchisee.component.scss']
})
export class EditFranchiseeComponent implements OnInit {
  private toasterService: ToasterService;
  public franchiseEmail;
  fileToUpload: File = null;
  partnerobject: any = {};
  createNew: any;
  bussiness_types_list = [];
  franchisee_address_edit_mode = false;
  partner_address_edit_mode = false;
  email_error = '';
  pincode_error = ' ';
  number_error = '';
  partner_email_error = '';
  franchiseePinCode = '';
  email_error_status = false;
  pincode_error_status = false;
  partner_email_error_status = false;
  number_error_status = false;
  url: any;
  id: any;
  public constantValue = {};
  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
  tabIndex = 0;
  partners_list = [];
  preferred_time = [
    {
      id: 0,
      preferred_days: '1 month'
    },
    {
      id: 1,
      preferred_days: '3 months'
    },
    {
      id: 2,
      preferred_days: '6 months',
    },
    {
      id: 3,
      preferred_days: '1 year'
    }
  ];
  investment_type = [
    {
      id: 0,
      investment_name: 'Directly'
    },
    {
      id: 1,
      investment_name: 'Via Bank Loan'
    }
  ];
  franchisee_model = [
    {
      id: 0,
      franchisee_name: 'Carz Grande'
    },
    {
      id: 1,
      franchisee_name: 'Carz Xpress Plus'
    },
    {
      id: 2,
      franchisee_name: 'Carz Xpress'
    },
    {
      id: 3,
      franchisee_name: 'Carz Zip Plus'
    },
    {
      id: 4,
      franchisee_name: 'Carz Zip'
    }
  ];
  franchisee_type = [
    {
      id: 0,
      franchisee_typename: 'Normal'
    },
    {
      id: 1,
      franchisee_typename: 'Master'
    }
  ];
  occupation_type = [
    {
      id:0,
      occupation_name: 'Student',
    },
    {
      id:1,
      occupation_name:'Employee',
    },
    {
      id:2,
      occupation_name:'Self',
    },
    {
      id:3,
      occupation_name:'Other'
    }

  ];
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });

  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private mapsAPILoader: MapsAPILoader,
     private ngZone: NgZone, private route: ActivatedRoute, private location: Location,
    public httpService: CrmService, private router: Router, private snackbar: MatSnackBar, private tabGroup: MatTabsModule, private frmBuilder: FormBuilder) {
    this.toasterService = toasterService;
    this.get_business_type();
    // this.createNew.franchisee_franchise_model = "Carz Xpress";
    // this.createNew.franchisee_franchise_type = "Normal";
    // this.createNew.franchisee_investment = "Own"
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  pincode = new FormControl('', [Validators.required, Validators.required]);
  partneremail = new FormControl('', [Validators.required, Validators.email]);
  number = new FormControl('', [Validators.required, Validators.required]);
  ngOnInit() {

    console.log(this.tabGroup);
    console.log('this.route.snapshot.params', this.route.snapshot.params);
    this.getFranchisee(this.route.snapshot.params['franchisee_Id']);
    this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
    this.constantValue = AppSettings;
  }

  cancel() {
    this.location.back();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    console.log(this.tabIndex);
  }
  // tslint:disable-next-line:no-shadowed-variable
  getFranchisee(id) {
    this.httpService.viewFranchiseeById(id).subscribe(response => {
      if (response.state === 'success') {
        this.createNew = response.franchisees_data;
        console.log('this.createNew', this.createNew);
        this.franchiseEmail = this.createNew.franchisee_email;
        this.franchiseePinCode = this.createNew.franchisee_pincode;
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisee.';
      });
  }
  // tslint:disable-next-line:no-shadowed-variable
  getPartnersFranchisee(id) {
    this.httpService.getFranchiseePartners(id).subscribe(response => {
      if (response.state === 'success') {
        this.partners_list = response.data;
        for (var i = 0; i < this.partners_list.length; i++) {
          this.partners_list[i].profile_img = '';
        }
        console.log('this.partners_list', this.partners_list);
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisee.';
      });
  }

  create_partner(partnerForm) {
    this.spinner.show();
    const fd = new FormData();
    partnerForm.franchisee_id = this.route.snapshot.params['franchisee_Id'];
    fd.append('partner', JSON.stringify(partnerForm));
    fd.append('partner_pic', this.fileToUpload);
    // console.log('partnerForm', this.partnerobject);
    // partnerForm.franchisee_id = this.route.snapshot.params['franchisee_Id'];
    // if (partnerForm.valid === true){
    this.httpService.createPartnerFranchisee(fd).subscribe(response => {
      if (response.state === 'Success') {

        // this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
        // this.create_flag = false;
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Successfully created</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        this.router.navigate(['/apps/franchisees/crm-franchisee-list']);
      }
      if (response.state === 'failure') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: response.message,
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    },
      err => {
        const message = 'Error to create franchisee.';
      });
    // }
  }

  edit_partner(partnerobject, franchisee) {
    this.spinner.show();
    const fd = new FormData();
    partnerobject.franchisee_id = this.route.snapshot.params['franchisee_Id'];
    fd.append('partner', JSON.stringify(partnerobject));
    fd.append('partner_pic', this.fileToUpload);
    // if (partnerobject.valid === true){

    this.httpService.updatePartnerFranchisee(fd).subscribe(response => {

      if (response.state === 'Success') {
        this.spinner.hide();
        this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/discussion']);
        const data = response['partnerobject'];
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Edited Successfully</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        for (var i = 0; i < this.partners_list.length; i++) {
          this.partners_list[i].profile_img = '';
        }

      }
      if (response.state === 'failure') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to edit</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to update franchisees.';
      });
    // }
  }

  updateFranchisee(editFranchiseeForm, formObject) {
    this.spinner.show();
    const fd = new FormData();
    fd.append('franchisee', JSON.stringify(this.createNew));
    if (editFranchiseeForm.valid === true && !this.email_error_status && !this.pincode_error_status) {
      this.httpService.updateFranchiseeData(fd).subscribe(response => {

        if (response.state === 'success') {
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Edited Successfully</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();
        }
        if (response.state === 'failure') {
          const toast: Toast = {
            type: 'error',
            title: 'Error',
            timeout: 2000,
            body: '<h5>Failed to edit</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();
        }
      },
        err => {
          this.spinner.hide();
          const message = 'Error to update franchisees.';
        });
    }
  }
  add_partner() {

    const obj = {
      'partner': this.partners_list.length + 1,
      'partner_name': 'Partner' + ' ' + (this.partners_list.length + 1)
    };
    this.partners_list.push(obj);

    this.getFranchisee(this.createNew._id);

    this.tabIndex = this.partners_list.length + 1;
  }
  onSelectedIndexChange(newTabIndex) {
  }
  autoCompleteCallback1(selectedData) {
    this.createNew.franchisee_address = '';
    this.createNew.franchisee_city = '';
    this.createNew.franchisee_state = '';
    this.createNew.franchisee_country = '';
    this.createNew.franchisee_pincode = '';
    const location = selectedData.data.address_components;
    for (let i = 0; i < selectedData.data.address_components.length; i++) {
      if (selectedData.data.address_components[i].types[0] === 'route') {
        this.createNew.franchisee_address = selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'sublocality_level_2') {
        this.createNew.franchisee_address = this.createNew.franchisee_address + ',' + selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'sublocality_level_1') {
        this.createNew.franchisee_address = this.createNew.franchisee_address + ',' + selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'locality') {
        this.createNew.franchisee_city = selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'administrative_area_level_1') {
        this.createNew.franchisee_state = selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'country') {
        this.createNew.franchisee_country = selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'postal_code') {
        this.createNew.franchisee_pincode = selectedData.data.address_components[i].long_name;
      }
    }
  }
  delete(partnerId) {
    this.httpService.delete_Selected_partner(partnerId).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Deleted Successfully</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
      }
      if (response.state === 'failure') {

      }
    },
      err => {
        const message = 'Error to update franchisees.';
      }
    );
  }
  make_franchisee_address_editable(franchisee_address_edit_mode) {
    this.franchisee_address_edit_mode = true;
  }
  make_franchisee_address_non_editable(franchisee_address_edit_mode) {
    this.franchisee_address_edit_mode = false;
  }
  make_partner_address_editable(partner_address_edit_mode) {
    this.partner_address_edit_mode = true;
  }
  make_partner_address_non_editable(partner_address_edit_mode) {
    this.partner_address_edit_mode = false;
  }
  make_default_id(partnerId) {
    const obj = {
      'partnerId': partnerId
    };
    this.httpService.make_default_profile(obj).subscribe(response => {
      if (response.state === 'success') {
        // this.snackbar.open('Partner deleted successfully!', '', {duration: 2500});
        // this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
      }
      if (response.state === 'failure') {

      }
    },
      err => {
        const message = 'Error to update franchisees.';
      }
    );
  }

  handleFileInput(files: FileList, val) {
    this.fileToUpload = files.item(0);

  }
  readUrl(event: any, index) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
// partner_house_number
  autoCompleteCallback(selectedData, index) {
    this.partners_list[index].partner_address = '';
    this.partners_list[index].partner_city = '';
    this.partners_list[index].partner_state = '';
    this.partners_list[index].partner_country = '';
    this.partners_list[index].partner_pincode = '';
    for (var j = 0; j < selectedData.data.address_components.length; j++) {
      if (selectedData.data.address_components[j].types[0] === 'route') {
        this.partners_list[index].partner_address = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'sublocality_level_2') {
        if (this.partners_list[index].partner_address) {
          this.partners_list[index].partner_address = this.partners_list[index].partner_address + ',' + selectedData.data.address_components[j].long_name;
        }
        if (!this.partners_list[index].partner_address) {
          this.partners_list[index].partner_address = selectedData.data.address_components[j].long_name;
        }
      }
      if (selectedData.data.address_components[j].types[0] === 'sublocality_level_1') {
        if (this.partners_list[index].partner_address) {
          this.partners_list[index].partner_address = this.partners_list[index].partner_address + ',' + selectedData.data.address_components[j].long_name;
        }
        if (!this.partners_list[index].partner_address) {
          this.partners_list[index].partner_address = selectedData.data.address_components[j].long_name;
        }
      }
      if (selectedData.data.address_components[j].types[0] === 'locality') {
        this.partners_list[index].partner_city = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'administrative_area_level_1') {
        this.partners_list[index].partner_state = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'country') {
        this.partners_list[index].partner_country = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'postal_code') {
        this.partners_list[index].partner_pincode = selectedData.data.address_components[j].long_name;
      }
    }
    console.log('this.partners_list', this.partners_list);
  }
  // validation for franchisee email
  validate_Franchisee(email, i) {
    const validation = {
      'franchisee_email': email
    };
    if (this.franchiseEmail !== email) {
      this.httpService.validateFranchisee(validation).subscribe(response => {
        if (response.state === 'success') {

        }
        if (response.state === 'failure') {
          // this.getErrorEmail(response.message);
          // tslint:disable-next-line:no-unused-expression
        }
      },
        err => {
          // this.createNew[i].flag = true;
          const message = 'Error.';
          this.email_error = 'This email already exists!';
          this.email_error_status = true;
          swal(
            'Error!',
            'Pincode already exists!',
            'error'
          );
        });
    }
  }
  // validation form franchisee pincode
  validate_Franchisee_Pincode(pincode) {
    const validation = {
      'franchisee_pincode': pincode
    };
    if (pincode) {
      this.httpService.validateFranchiseePincode(validation).subscribe(response => {
        if (response.state === 'success') {
          this.pincode_error = '';
          this.pincode_error_status = false;
        }
        if (response.state === 'failure') {
          this.getErrorPincode(response.message);
        }
      },
        err => {
          // this.createNew[i].pincode_auth = true;
          const message = 'Error.';
          this.pincode_error = 'This pincode already exists!';
          this.pincode_error_status = false;
          this.getErrorPincode(this.pincode_error);
          swal(
            'Error!',
            'Pincode already exists!',
            'error'
          );
        });
    }
  }






  // validations error message
  getErrorEmail(email_exists_message) {
    if (email_exists_message == 'This email already exists!') {
      // this.email_error = '';
      // this.franchisee_email_already_exists = true;
      return this.email.hasError('email') ? email_exists_message :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
    else {
      //  this.email_error = '';
      if (!this.createNew.franchisee_email) {
        this.email_error = '';
      }
      return this.email.hasError('required') ? 'You must enter a email' :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
  }
  getErrorPincode(pincode_exists_message) {
    if (pincode_exists_message == 'This pincode already exists!') {
      return this.pincode.hasError('pincode') ? pincode_exists_message :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
    else {
      if (!this.createNew.franchisee_pincode) {
        this.pincode_error = '';
      }
      return this.pincode.hasError('required') ? 'You must enter a pincode' :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
  }
  get_business_type() {
    this.httpService.get_business_types_list().subscribe(response => {
      if (response.state === 'success') {
        // this.business_Id = response.data[0]._id;
        // this.pratner_id = response.data[0].partner_id;
        // this.business_type = response.data[0].docs_types;
        this.bussiness_types_list = response.FranchiseeType;
        console.log('this.business_types_list', this.bussiness_types_list);
      }
    });
  }
  // validate email
  validate_Partner_Email(partnerEmail) {
    const validation = {
      'partner_email': partnerEmail
    };
    this.httpService.validatePartnerEmail(validation).subscribe(response => {
      if (response.state === 'success') {
      }
      if (response.state === 'failure') {
        this.getErrorEmail(response.message);
      }
    },
      err => {
        // this.createNew[i].pincode_auth = true;
        const message = 'Error.';
        this.partner_email_error = 'This email already exists!';
        this.partner_email_error_status = false;
        swal(
          'Error!',
          'Email already exists!',
          'error'
        );
      });
  }


  getErrorPartnerEmail(partneremail_exists_message) {
    this.partner_email_error = '';
    if (partneremail_exists_message) {
      return this.partneremail.hasError('partneremail') ? 'This email already exists!' :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
    else {
      return this.partneremail.hasError('required') ? 'You must enter a email' :
        // this.email.hasError('email') ? 'Not a valid email' :
        '';
    }
  }
  //   getErrorPartnerEmail(partneremail_exists_message) {
  //     if (partneremail_exists_message == 'This email already exists!'){
  //   // this.email_error = '';
  //     // this.franchisee_email_already_exists = true;
  //       return this.email.hasError('partneremail') ? 'email_exists_message' :
  //       // this.email.hasError('email') ? 'Not a valid email' :
  //           '';
  //  }
  //  else {
  //  //  this.email_error = '';
  //  if(!this.partnerobject.partner_email){
  //    this.email_error = '';
  //  }
  //   return this.email.hasError('required') ? 'You must enter a email' :
  //   // this.email.hasError('email') ? 'Not a valid email' :
  //       '';
  //  }
  // }

  validate_Mobile_Number(number) {
    const validation = {
      'partner_mobile_number': number
    };
    this.httpService.validateMobileNumber(validation).subscribe(response => {
      if (response.state === 'success') {
      }
      if (response.state === 'failure') {
        this.getErrorNumber(response.message);
      }
    },
      err => {
        // this.createNew[i].pincode_auth = true;
        const message = 'Error.';
        this.number_error = 'This number already exists!';
        this.number_error_status = false;
        swal(
          'Error!',
          'Phone number already exists!',
          'error'
        );
      });
  }

  getErrorNumber(number_exists_message) {
    this.number_error = '';
    if (number_exists_message) {
      return this.number.hasError('number') ? 'This number already exists!' :
        '';
    }
    else {
      return this.number.hasError('required') ? 'You must enter a number' :
        '';
    }
  }
}
