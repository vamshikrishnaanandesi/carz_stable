import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'fuse-app-master-franchisee',
  templateUrl: './master-franchisee.component.html',
  styleUrls: ['./master-franchisee.component.scss']
})
export class MasterFranchiseeComponent implements OnInit {
  franchisee_add = [];
  
  create_master_data = {

    'user_role' : 'master_franchisee',
    'franchisee_name' : '',
    'franchisee_email' : '',
    'franchisee_area' : '',
    'franchisee_state' : '',
    'franchisee_city' : '',
    'franchisee_country': '',
    'franchisee_pincode': '',
    'master_franchisee_id': ''
  };

  edit_master_data: any = {};
  create_flag = true;
  create_data: any = {};
  data: any;
  showPlaceDetails: any;
  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
  franchisee_list = [
    {
      'franchisee_name' : '',
      'franchisee_email' : '',
      'franchisee_area' : '',
      'franchisee_state' : '',
      'franchisee_city' : '',
      'franchisee_country': '',
      'franchisee_pincode': '',
      'master_franchisee_id': '',
      'flag': false,
      'pincode_auth' : false
    },
    {
      'franchisee_name' : '',
      'franchisee_email' : '',
      'franchisee_area' : '',
      'franchisee_state' : '',
      'franchisee_city' : '',
      'franchisee_country': '',
      'franchisee_pincode': '',
      'master_franchisee_id': '',
      'flag': false,
      'pincode_auth' : false

    },
    {
      'franchisee_name' : '',
      'franchisee_email' : '',
      'franchisee_area' : '',
      'franchisee_state' : '',
      'franchisee_city' : '',
      'franchisee_country': '',
      'franchisee_pincode': '',
      'master_franchisee_id': '',
      'flag': false,
      'pincode_auth' : false

    },
    {
      'franchisee_name' : '',
      'franchisee_email' : '',
      'franchisee_area' : '',
      'franchisee_state' : '',
      'franchisee_city' : '',
      'franchisee_country': '',
      'franchisee_pincode': '',
      'master_franchisee_id': '',
      'flag': false,
      'pincode_auth' : false

    }
  ];
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.required]);
  // city = new FormControl('', [Validators.required, Validators.required]);
  // area = new FormControl('', [Validators.required, Validators.required]);
  // country = new FormControl('', [Validators.required, Validators.required]);
  // state = new FormControl('', [Validators.required, Validators.required]);
  pincode = new FormControl('', [Validators.required, Validators.required]);
  franchisee_details: any = [];
  constructor(private httpService: CrmService, public router: Router) { }

  ngOnInit() {

    }

// To create master franchisee
create_franchisee(franchiseeForm) {
  const fd = new FormData();
  fd.append('franchisee', JSON.stringify(this.create_master_data));

  if (franchiseeForm.valid === true){
    console.log('franchiseeForm', franchiseeForm);

  this.httpService.createFranchisee(fd).subscribe(response => {
    if (response.state === 'success'){
      this.create_flag = false;
     // this.franchisee_list = response.data._id;
        for (let i = 0; i < this.franchisee_list.length; i++){
          this.franchisee_list[i].master_franchisee_id = response.data._id;
        }
          this.httpService.createMultipleFranchisees(this.franchisee_list).subscribe(res => {
            if (res.state === 'success'){
                this.router.navigate(['/apps/crm/master-franchisee-list']);

              }
            if (response.state === 'failure'){
            }
          },
          err => {
            const message = 'Error to create franchisee.';
        });
      
      }
      if (response.state === 'failure'){
      }
  },
  err => {
    const message = 'Error to create master franchisee.';
});
}
}

// To edit and update master franchisee
updateFranchisee(edit_master_data) {
  this.httpService.updateFranchiseeData(edit_master_data).subscribe(response => {
    if (response.state === 'success'){

      const data = response['edit_master_data'];
      }
      if (response.state === 'failure'){
            }
  },
  err => {
    const message = 'Error to update franchisees.';
    });
  }

done(){
  console.log('ASDasdfadadasdasdadasdad', this.franchisee_list);
}
validate_Franchisee(email, i){
  const obj = {
    'franchisee_email' : email
  };
  this.httpService.validateFranchisee(obj).subscribe(response => {
    if (response.state === 'success'){

      }
      if (response.state === 'failure'){

        // tslint:disable-next-line:no-unused-expression
        this.getErrorEmail(response.message);
            }
  },
  err => {
    this.franchisee_list[i].flag = true;
    const message = 'Error.';
    });
}

validate_Franchisee_Pincode(pincode, i){
  const obj = {
    'franchisee_pincode' : pincode
  };
  this.httpService.validateFranchiseePincode(obj).subscribe(response => {
    if (response.state === 'success'){

      }
      if (response.state === 'failure'){

        this.getErrorPincode(response.message);
            }
  },
  err => {
    this.franchisee_list[i].pincode_auth = true;
    const message = 'Error.';
    });
}

add_franchisee(){

  const add = {
    'franchisee_name' : '',
      'franchisee_email' : '',
      'franchisee_area' : '',
      'franchisee_state' : '',
      'franchisee_city' : '',
      'franchisee_country': '',
      'franchisee_pincode': '',
      'master_franchisee_id': '',
      'flag': false,
      'pincode_auth' : false
  };
  this.franchisee_list.push(add);




 // flag = false;
}

// Location
test(index){
  console.log('index1111111', index);
}
autoCompleteCallback1(selectedData, index){
  console.log('index', this.franchisee_list[index]);
  console.log('selectedData', selectedData);
  this.franchisee_list[index].franchisee_area = selectedData.data.address_components[0].long_name;
  this.franchisee_list[index].franchisee_city = selectedData.data.address_components[1].long_name;
  // this.franchisee_list[index].franchisee_pincode = selectedData.data.address_components[2].long_name;
  this.franchisee_list[index].franchisee_state = selectedData.data.address_components[3].long_name;
  this.franchisee_list[index].franchisee_country = selectedData.data.address_components[4].long_name;

}
autoComplete(selectedData ){
  this.create_master_data.franchisee_area = selectedData.data.address_components[0].long_name;
  console.log('create_master_data.franchisee_area', this.create_master_data.franchisee_area);
  this.create_master_data.franchisee_city = selectedData.data.address_components[1].long_name;
  // this.create_master_data.franchisee_pincode = selectedData.data.address_components[2].long_name;
  this.create_master_data.franchisee_state = selectedData.data.address_components[3].long_name;
  this.create_master_data.franchisee_country = selectedData.data.address_components[4].long_name;
}


 // Validations error messages
 getErrorName() {
  return this.name.hasError('required') ? 'You must enter your Name' :
      // this.name.hasError('name') ? 'Not a valid name' :
          '';
}
 getErrorEmail(email_exists_message) {
   if (email_exists_message){


        return this.email.hasError('email') ? 'This email already exists!' :
        // this.email.hasError('email') ? 'Not a valid email' :
            '';
   }
   else {
    return this.email.hasError('required') ? 'You must enter a email' :
    // this.email.hasError('email') ? 'Not a valid email' :
        '';
   }
}
getErrorPincode(pincode_exists_message) {
  if (pincode_exists_message){
   return this.pincode.hasError('required') ? 'You must enter a pincode' :
   // this.email.hasError('email') ? 'Not a valid email' :
       '';
  }
  else {
   return this.pincode.hasError('pincode') ? 'This pincode already exists!' :
   // this.email.hasError('email') ? 'Not a valid email' :
       '';
  }

}

// getErrorArea() {
//   return this.name.hasError('required') ? 'You must enter your Area' :
//       // this.name.hasError('name') ? 'Not a valid name' :
//           '';
// }
// getErrorCountry() {
//   return this.name.hasError('required') ? 'You must enter your Country' :
//       // this.name.hasError('name') ? 'Not a valid name' :
//           '';
// }
// getErrorState() {
//   return this.name.hasError('required') ? 'You must enter your State' :
//       // this.name.hasError('name') ? 'Not a valid name' :
//           '';
// }
// getErrorCity() {
//   return this.name.hasError('required') ? 'You must enter your City' :
//       // this.name.hasError('name') ? 'Not a valid name' :
//           '';
// }
// getErrorPincode() {
//   return this.name.hasError('required') ? 'You must enter your City' :
//       // this.name.hasError('name') ? 'Not a valid name' :
//           '';
// }
}
