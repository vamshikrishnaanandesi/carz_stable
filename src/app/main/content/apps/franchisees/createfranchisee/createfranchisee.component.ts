import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FranchiseesService } from '../franchisees.service';
import { Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';

@Component({
  selector: 'fuse-createfranchisee',
  templateUrl: './createfranchisee.component.html',
  styleUrls: ['./createfranchisee.component.scss']
})
export class CreatefranchiseeComponent implements OnInit {
  public business_type: any;
  create: FormGroup;
  create_flag: boolean;
  obj: any = {};
  franchisee_code: any;
  getAllFranchisees: any;
  franchisee_Id: any;
  createFranchisee: FormGroup;
  showPlaceDetails: any;
  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
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

  email = new FormControl('', [Validators.required, Validators.email]);
   name = new FormControl('', [Validators.required, Validators.required]);
   city = new FormControl('', [Validators.required, Validators.required]);
   occupation = new FormControl('', [Validators.required, Validators.required]);
   state = new FormControl('', [Validators.required, Validators.required]);
   address = new FormControl('', [Validators.required, Validators.required]);
   mobile = new FormControl('', [Validators.required, Validators.required]);
   investment = new FormControl('', [Validators.required, Validators.required]);
   date = new FormControl('', [Validators.required, Validators.required]);
   time = new FormControl('', [Validators.required, Validators.required]);
   toStart = new FormControl('', [Validators.required, Validators.required]);
   model = new FormControl('', [Validators.required, Validators.required]);
   remark = new FormControl('', [Validators.required, Validators.required]);
   age = new FormControl('', [Validators.required, Validators.required]);
   source = new FormControl('', [Validators.required, Validators.required]);

  
  // @ViewChild('search') public searchElement: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    public httpService: FranchiseesService, private router: Router, private snackbar: MatSnackBar, private frmBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.obj = {
      'bussiness_type': 'Individual Proprietorship Concern'
    };
  // this.mapsAPILoader.load().then(
  //   () => {
  //     const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

  //     autocomplete.addListener('place_changed', () => {
  //       this.ngZone.run(() => {
  //         const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         console.log('place', place);

  //         if (place.geometry === undefined || place.geometry === null){
  //           return;
  //         }
  //       });
  //     });
  //   }
  // );
}


// To Create Franchisee
  create_franchisee() {

    this.httpService.createFranchisee(this.obj).subscribe(response => {
      if (response.state === 'success'){
        this.obj = '';
        this.snackbar.open('Franchisee created successfully!', '', {duration: 2500});
        }
        if (response.state === 'failure'){
          this.snackbar.open('Please fill the details in red!', '', {duration: 2500});
        }
    },
    err => {
      const message = 'Error to create franchisee.';
  });
}
get_business_type(){
  this.httpService.get_business_type().subscribe(response => {
      if (response.state === 'success'){
        this.business_type = response.FranchiseeType;
      }
  });
}
autoCompleteCallback1(selectedData){
  console.log('selectedData', selectedData);
  this.obj.franchisee_address = selectedData.data.address_components[0].long_name;
  console.log('obj.franchisee_area', this.obj.franchisee_area);
  this.obj.franchisee_city = selectedData.data.address_components[1].long_name;
  // this.obj.franchisee_pincode = selectedData.data.address_components[2].long_name;
  this.obj.franchisee_state = selectedData.data.address_components[3].long_name;
}
  // Validations error messages
  getErrorEmail() {
    return this.email.hasError('required') ? 'You must enter a email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getErrorName() {
    return this.name.hasError('required') ? 'You must enter your name' :
        // this.name.hasError('name') ? 'Not a valid name' :
            '';
  }
  getErrorCity() {
    return this.city.hasError('required') ? 'You must enter your location' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorOccupation() {
    return this.occupation.hasError('required') ? 'You must enter your occupation' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorState() {
    return this.state.hasError('required') ? 'You must enter your state' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorAddress() {
    return this.address.hasError('required') ? 'You must enter your address' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorMobile() {
    return this.mobile.hasError('required') ? 'You must enter your number' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorInvestment() {
    return this.investment.hasError('required') ? 'You must select a value' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorDate() {
    return this.date.hasError('required') ? 'You must select a date' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorTime() {
    return this.time.hasError('required') ? 'You must enter time' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorToStart() {
    return this.toStart.hasError('required') ? 'You must enter a value' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorModel() {
    return this.model.hasError('required') ? 'You must select a value' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorRemark() {
    return this.remark.hasError('required') ? 'You must enter a value' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorAge() {
    return this.age.hasError('required') ? 'You must enter your age' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }
  getErrorSource() {
    return this.source.hasError('required') ? 'You must enter your source' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }

}
