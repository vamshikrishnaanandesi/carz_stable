import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FranchiseesService } from '../../franchisees/franchisees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http/src/static_response';
import { MapsAPILoader } from '@agm/core';
import {  } from '@types/googlemaps';
import {  } from '@angular/core/src/metadata/di';
import { Element } from '../../../../../../assets/angular-material-examples/table-sorting/table-sorting-example';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'fuse-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  searchControl: FormControl;
  // ngZone: any;
franchisee: any;
franchisees: any;
franchisee_details: any;
latitude = -34.397;
longitude = 150.644;
public userSettings2: any = {
  'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
};
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
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private route: ActivatedRoute, public httpService: FranchiseesService,  private router: Router) {

   }

  ngOnInit() {
      // googlemaps location autocomplete
      // this.mapsAPILoader.load().then(
      //   () => {
      //     const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

      //     autocomplete.addListener('place_changed', () => {
      //       this.ngZone.run(() => {
      //         const place: google.maps.places.PlaceResult = autocomplete.getPlace();

      //         if (place.geometry === undefined || place.geometry === null){
      //           return;
      //         }
      //       });
      //     });
      //   }
      // );

       // create search FormControl
       this.searchControl = new FormControl();
    this.franchisee_details = JSON.parse(localStorage.getItem('state'));

  }

  updateFranchisee(franchisee_details) {
    // console.log('this.franchisee_details', this.franchisee_details);
    this.httpService.updateFranchiseeData(franchisee_details).subscribe(response => {
      console.log('resposne', this.franchisee_details);
      if (response.state === 'success'){

        // tslint:disable-next-line:no-shadowed-variable
        const data = response['franchisee_details'];
        }
        if (response.state === 'failure'){

              }
    },
    err => {
      const message = 'Error to update franchisees.';
  }
  );
  }
  autoCompleteCallback1(selectedData){
    console.log('selectedData', selectedData);
    this.franchisee_details.franchisee_address = selectedData.data.address_components[0].long_name;
    console.log('franchisee_details.franchisee_area', this.franchisee_details.franchisee_area);
    this.franchisee_details.franchisee_city = selectedData.data.address_components[1].long_name;
    // this.franchisee_details.franchisee_pincode = selectedData.data.address_components[2].long_name;
    this.franchisee_details.franchisee_state = selectedData.data.address_components[3].long_name;
  }


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
    return this.mobile.hasError('required') ? 'You must enter your contact' :
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
    return this.source.hasError('required') ? 'You must enter yource source' :
        // this.city.hasError('name') ? 'Not a valid city' :
            '';
  }

}
