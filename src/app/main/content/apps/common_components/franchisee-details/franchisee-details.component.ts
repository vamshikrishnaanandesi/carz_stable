import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../common-services.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
@Component({
  selector: 'fuse-app-franchisee-details',
  templateUrl: './franchisee-details.component.html',
  styleUrls: ['./franchisee-details.component.scss'],
  providers: [
    CommonServicesService
  ]
})
export class FranchiseeDetailsComponent implements OnInit {
  public franchisees: any;
  public save_route: any;
  public userData: any;
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, toasterService: ToasterService, private router: Router, private httpService: CommonServicesService) {
    this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);
    console.log('id franchisee', this.viewFranchisee(this.route.snapshot.params['franchisee_Id']));
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.toasterService = toasterService;
  }

 public selected_leadType = '';
 public options_list = [
   {'value': 'Unassigned', 'option': 'Unassigned'},
   {'value': 'Cold', 'option': 'Cold'},
   {'value': 'Warm', 'option': 'Warm'},
   {'value': 'Hot', 'option': 'Hot'},
   {'value': 'On Hold', 'option': 'On Hold'},
   {'value': 'Franchisees', 'option': 'Franchisees'},
   {'value': 'Rejected', 'option': 'Rejected'}
 ];
  ngOnInit() {

    this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);
    console.log("id franchisee", this.viewFranchisee(this.route.snapshot.params['franchisee_Id']));
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }
  // To View Franchisee details by Franchisee ID
  viewFranchisee(id) {

    this.httpService.viewFranchiseeById(id).subscribe(response => {
      if (response.state === 'success'){
        this.franchisees = response.franchisees_data;
        console.log('this', this.franchisees);
        this.selected_leadType = this.franchisees.lead_type;
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load franchisees.';
  });
  }
  onChange(opt){
    console.log(opt);
    const obj = {
      'franchisee_Id' : this.route.snapshot.params['franchisee_Id'] ,
      'lead_type': opt.option
    };
    this.spinner.show();
    this.httpService.lead_type(obj).subscribe(response => {
      if (response.state === 'success'){
   
        this.selected_leadType = opt.value;
             this.spinner.hide();
             const toast: Toast = {
              type: 'success',
              title: 'Success',
              timeout: 2000,
              body: '<h5> Lead status changed</h5>',
              bodyOutputType: BodyOutputType.TrustedHtml
            };
            this.toasterService.pop(toast);
      }
    },
  err => {
    this.spinner.hide();
    const message = 'Error to filter';
  });
  }
}
