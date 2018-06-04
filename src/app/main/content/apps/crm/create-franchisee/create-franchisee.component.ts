/*Edited by Swamy date : 4/5/2018
  4/5/2018 : creating_franchisee_type and master_franchisee_id added and binded master franchisee based on the root url type master or Normal
*/

import { Component, OnInit, NgZone, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { CrmService } from '../crm.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { AppSettings } from '../../../../../constants.component';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import Swal from 'sweetalert2';
declare var swal: any;
import { Location } from '@angular/common';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'fuse-create-franchisee',
  templateUrl: './create-franchisee.component.html',
  styleUrls: ['./create-franchisee.component.scss'],
})

export class CreateFranchiseeComponent implements OnInit {
  franchiseeTypeTitle: any;
 public archieve_franchisee_status = [] ;
  tabIndex = 0;
  partnerobject: any = {};
  creating_franchisee_type = 'normal';
  master_franchisee_id: any;
  private toasterService: ToasterService;
  create: FormGroup;
  createFranchiseeErrorStatus: boolean;
  private fileReader: FileReader;
  create_flag: boolean;
  obj: any = {};

  monthSelected = '1month';
  bussiness_types_list = [];
  public constantValue = {};
  email_error = '';
  pincode_error = '';
  number_error = '';
  email_error_status = false;
  pincode_error_status = false;
  number_error_status = false;
  fileToUpload: File = null;
  public folder_name: any;
  createNew: any = {
  };

  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
  franchisee_code: any;
  getAllFranchisees: any;
  partner_state = '';
  partner_city = '';
  partner_country = '';
  partner_pincode = '';
  partner_address = '';
  // partner_house_number = '';
  url: any;
  franchisee_Id: any;
  createFranchisee: FormGroup;
  franchisee_email_already_exists = false;
  showPlaceDetails: any;
  partners_list = [];
  partnersArray: any = [];
  'pincode_auth': false;
  'flag': false;
  list = [
    {
      'partner': 1,
      'franchisee_name': 'Partner' + ' ' + 1,
    }
  ];
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
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
      investment_name: 'Own'
    },
    {
      id: 1,
      investment_name: 'Finance'
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

  country_code = [
    {
      id: 0,
      country_name: '+91'
    },
    {
      id:1,
      country_name: '+1'
    },
    {
      id:2,
      country_name: '+49'
    },
    {
      id:3,
      country_name: '+61'
    },
    {
      id:4,
      country_name: '+64'
    },
    {
      id:5,
      country_name: '+44'
    },
    {
      id:6,
      country_name: '+971'
    }
  ]
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });



  // Cropper 2 data
  cropperSettings2: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, toasterService: ToasterService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    public httpService: CrmService, private router: Router, private snackbar: MatSnackBar, private frmBuilder: FormBuilder, private location: Location) {
    this.toasterService = toasterService;
    this.get_business_type();
    // Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    this.url = '';
    this.createNew.franchisee_franchise_model = "Carz Xpress";
    this.createNew.franchisee_franchise_type = "Normal";
    this.createNew.franchisee_investment = "Own";
    // this.createNew.bussiness_type_id = "Private/Public LTD. Company";

    this.franchiseeTypeTitle = this.route.snapshot.params['type'];
    console.log("hareeshssss", this.franchiseeTypeTitle);
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  pincode = new FormControl('', [Validators.required, Validators.required]);
  number = new FormControl('', [Validators.required, Validators.required]);
  ngOnInit() {
    this.constantValue = AppSettings;
    if (this.route.snapshot.params['type'] === 'master') {
      this.creating_franchisee_type = 'master';
      this.master_franchisee_id = this.route.snapshot.params['master_franchisee_id'];
      this.createNew.franchisee_franchise_type = 'Normal';
    }
  }

  cancel() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    console.log(this.tabIndex);
  }

  handleFileInput(files: FileList, val) {
    this.fileToUpload = files.item(0);

  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }


  // cropped(bounds: Bounds) {
  // }
  // fileChangeListener($event) {
  //   const image: any = new Image();
  //   const file: File = $event.target.files[0];
  //   const myReader: FileReader = new FileReader();
  //   const that = this;
  //   myReader.onloadend = function (loadEvent: any) {
  //       image.src = loadEvent.target.result;
  //       that.cropper.setImage(image);

  //   };

  //   myReader.readAsDataURL(file);
  // }

  // to create folder while creating Franchisee
  createFolder(franchisee_Id) {
    if (this.folder_name) {
      this.obj = {
        'folder_name': this.folder_name,
        'franchisee_Id': franchisee_Id,
        'crm_folder': true,
        'parent_folder_id': ''

      };
      this.httpService.createFolder(this.obj).subscribe(response => {
        if (response.state === 'success') {
          const toast: Toast = {
            type: 'success',
            title: 'Franchisee Created',
            timeout: 2000,
            body: '<h5>Successfully Created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          // this.router.navigate(['/apps/crm/crm-edit-franchisee' + '/' + franchisee_Id]);
          this.router.navigate(['/apps/franchisees/crm-franchisee-list']);
          // this.create_flag = false;
          // this.showfolderfile = false;
          // this.folder_name = '';
          // return this.get_folder_by_id(this.parent_id);
        }
        if (response.state === 'failure') {
          console.log('error');
        }
      },
        err => {
          const message = 'Error to create folder.';
        });
    }
    else {
      console.log('error');
    }
  }


  // To Create Franchisee
  create_franchisee(franchiseeForm) {
    if (franchiseeForm.valid === true){
    if (this.route.snapshot.params['type'] === 'master') {
      this.createNew.master_franchisee_id = this.master_franchisee_id;
    }
    this.createNew.partner_pincode = this.partner_pincode;
    const fd = new FormData();
    fd.append('franchisee', JSON.stringify(this.createNew));
    fd.append('partner', JSON.stringify(this.partnerobject));
    fd.append('franchisee_img', this.fileToUpload);
    // error message variable name
//  && !this.email_error_status && !this.pincode_error_status && !this.number_error_status

      this.spinner.show();
    this.httpService.createFranchisee(fd).subscribe(response => {
      if (response.state === 'success') {


        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.folder_name = 'Discussion';
        this.createFolder(response.data._id);
        franchiseeForm.resetForm();
      }
      if (response.state === 'failure') {
        // this.spinner.hide(); // To hide the spinner
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        const message = 'Error to create franchisee.';
        this.spinner.hide(); // To hide the spinner
      });
    // }
    // else {
    //   this.spinner.hide();

    // }

    }
  }

  create_partner(partnerobject) {
    // partnerobject.franchisee_id = this.route.snapshot.params['franchisee_Id'];
    // partnerobject.bussiness_type_id = '5aacf8c5840c8e1f54eb28fa';
    console.log('partnerobject.valid', partnerobject.valid);
    // if (partnerobject.valid === true){
    this.httpService.createPartnerFranchisee(partnerobject).subscribe(response => {
      if (response.state === 'success') {
        this.spinner.hide(); // To hide the spinner
        // this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
        // this.create_flag = false;

      }
      if (response.state === 'failure') {
        this.spinner.hide(); // To hide the spinner
      }
    },
      err => {
        const message = 'Error to create franchisee.';
        this.spinner.hide(); // To hide the spinner
      });
    // }
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
      if (selectedData.data.address_components[i].types[0] === 'postal_code') {
        this.createNew.franchisee_pincode = selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'sublocality_level_2') {
        this.createNew.franchisee_address = this.createNew.franchisee_address + selectedData.data.address_components[i].long_name;
      }
      if (selectedData.data.address_components[i].types[0] === 'sublocality_level_1') {
        this.createNew.franchisee_address = this.createNew.franchisee_address + selectedData.data.address_components[i].long_name;
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
      if (selectedData.data.address_components[i].types[0] === 'route') {
        this.createNew.franchisee_address = selectedData.data.address_components[i].long_name;
      }
    }
  }
  // add_partner(){
  //   const obj = {
  //     'partner': this.list.length + 1,
  //     'franchisee_name': 'Partner' + ' ' + (this.list.length + 1)
  //   };
  //   this.list.push(obj);
  //   console.log('this.list', this.list);
  //   this.tabIndex = this.list.length + 1;
  // }
  autoCompleteCallback(selectedData, index) {
    this.partner_address = '';
    this.partner_city = '';
    // this.partner_house_number = '';
    this.partner_state = '';
    this.partner_country = '';
    this.partner_address = '';
    for (let j = 0; j < selectedData.data.address_components.length; j++) {
      if (selectedData.data.address_components[j].types[0] === 'route') {
        this.partner_address = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'sublocality_level_2') {
        if (this.partner_address) {
          this.partner_address = this.partner_address + ',' + selectedData.data.address_components[j].long_name;
        }
        if (!this.partner_address) {
          this.partner_address = selectedData.data.address_components[j].long_name;
        }
      }
      if (selectedData.data.address_components[j].types[0] === 'sublocality_level_1') {
        if (this.partner_address) {
          this.partner_address = this.partner_address + ',' + selectedData.data.address_components[j].long_name;
        }
        if (!this.partner_address) {
          this.partner_address = selectedData.data.address_components[j].long_name;
        }
      }
      if (selectedData.data.address_components[j].types[0] === 'locality') {
        this.partner_city = selectedData.data.address_components[j].long_name;
      }

      // partner_house_number
      if (selectedData.data.address_components[j].types[0] === 'administrative_area_level_1') {
        this.partner_state = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'country') {
        this.partner_country = selectedData.data.address_components[j].long_name;
      }
      if (selectedData.data.address_components[j].types[0] === 'postal_code') {
        this.partner_pincode = selectedData.data.address_components[j].long_name;
      }
    }
    this.createNew.partner_address = this.partner_address;
    this.createNew.partner_city = this.partner_city;
    // this.createNew.partner_house_number = this.partner_house_number;
    this.createNew.partner_state = this.partner_state;
    this.createNew.partner_country = this.partner_country;
    // this.partnerobject.franchisee_address = selectedData.data.address_components[0].long_name;
    // this.partnerobject.franchisee_city = selectedData.data.address_components[1].long_name;
    // this.tab.franchisee_pincode = selectedData.data.address_components[2].long_name;
    // this.partnerobject.franchisee_state = selectedData.data.address_components[3].long_name;
  }

  validate_Franchisee(email) {
    const validation = {
      'franchisee_email': email
    };
    if (email) {
      this.httpService.validateFranchisee(validation).subscribe(response => {
        if (response.state === 'success') {
          console.log('response', response);
          this.email_error = '';
          this.email_error_status = false;
        }
        if (response.state === 'failure') {
          console.log('failure state', response);
          this.getErrorEmail(response.message);
          // tslint:disable-next-line:no-unused-expression
        }
      },
        err => {
          // this.createNew[i].flag = true;
          const message = 'Error.';
          this.email_error = 'This email already exists!';
          this.email_error_status = false;
          this.getErrorEmail(this.email_error);
          swal(
            'Error',
            'Email already exist!',
            'error'
          );
        });
    }
  }

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

  validate_Mobile_Number(number) {
    const validation = {
      'partner_mobile_number': number
    };
    if (number) {
      this.httpService.validateMobileNumber(validation).subscribe(response => {
        if (response.state === 'success') {
          this.number_error = '';
          this.number_error_status = false;
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
          this.getErrorNumber(this.number_error);
          swal(
            'Error!',
            'Phone number already exists!',
            'error'
          );
        });
    }
  }


  // validations error message
  getErrorEmail(email_exists_message) {

    if (email_exists_message === 'This email already exists!') {
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
    if (pincode_exists_message === 'This pincode already exists!') {
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
  getErrorNumber(number_exists_message) {
    if (number_exists_message === 'This number already exists!') {
      return this.number.hasError('number') ? 'This number already exists!' :
        '';
    }
    else {
      if (!this.createNew.partner_mobile_number) {
        this.number_error = '';
      }
      return this.number.hasError('required') ? 'You must enter a number' :
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
  onSubmit() {
    alert('qwertu');
  }
  getBusinessType(event) {
    for (let i = 0; i < this.bussiness_types_list.length; i++) {
      if (event === this.bussiness_types_list[i]._id) {
        this.createNew.bussiness_type = this.bussiness_types_list[i].type_name;
        this.createNew.bussiness_type_id = this.bussiness_types_list[i]._id;
        // this.createNew = {
        //   'bussiness_type':this.bussiness_types_list[i].type_name,
        //   'bussiness_type_id': this.bussiness_types_list[i]._id
        // };
      }
    }
  }


}
