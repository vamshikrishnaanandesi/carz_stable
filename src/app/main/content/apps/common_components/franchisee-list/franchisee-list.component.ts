import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../common-services.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { AppSettings } from '../../../../../constants.component';
import Swal from 'sweetalert2';
import {ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast} from 'angular5-toaster';
declare var swal: any;
@Component({
  selector: 'fuse-app-franchisee-list',
  templateUrl: './franchisee-list.component.html',
  styleUrls: ['./franchisee-list.component.scss'],
  providers: [
    CommonServicesService
  ]
})

export class FranchiseeListComponent implements OnInit {
  public franchisee_archieve_status: any;
  hot_leads: any = [];
  warm_leads: any = [];
  cold_leads: any = [];
  onhold: any = [];
  franchisees: any = [];
  rejected: any = [];
  unassigned: any = [];
  public result: any;
  public franchisees_list = [];
  public route_name = '';
  public franchisee_number: number;
  public constantValue = {};
  public fileReaded;
  public import_leads = [];
  public userData2: any;
  // public franchiseeFilter = "ALL";
  public listviewshow1 = false;
  public gridviewshow1 = true;

  public  MasterNormalFranchisee: string;
  public FranchiseeTypes: any;
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type : 'ball-clip-rotate'
  };

  page_loaded  = false;
  private toasterService: ToasterService;
   public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private route: ActivatedRoute,
    private router: Router, private httpService: CommonServicesService) {
    this.route_name = this.route.snapshot.url[0].path;
    console.log('route_name',this.route_name);
   this.FranchiseeTypes = 'Select Franchisee';
   this.toasterService = toasterService;
    this.get_list();
   }

  ngOnInit() {
    this.constantValue = AppSettings;
  }



  get_list(){

    this.spinner.show();
    this.httpService.getAllFranchisees().subscribe(response => {
      if (response.state === 'success'){

        this.spinner.hide();
        if (this.route_name === 'franchisee-list'){


          this.franchisee_number = response.franchisees_list.length;
        }
        if (this.route_name === 'library-main' || this.route_name === 'common-folder'){
          this.franchisee_number = 12;
        }
        this.franchisees_list = response.franchisees_list;
        for (let i = 0; i < this.franchisees_list.length; i++ ){
           if (this.franchisees_list[i].lead_type === 'Hot' ){
             this.hot_leads.push(this.franchisees_list[i]);
           }
           if (this.franchisees_list[i].lead_type === 'Warm'){
             this.warm_leads.push(this.franchisees_list[i]);
           }
          if (this.franchisees_list[i].lead_type === 'Cold'){
             this.cold_leads.push(this.franchisees_list[i]);
           }
           if (this.franchisees_list[i].lead_type === 'On Hold'){
             this.onhold.push(this.franchisees_list[i]);
           }
           if (this.franchisees_list[i].lead_type === 'Franchisees'){
             this.franchisees.push(this.franchisees_list[i]);
           }
           if (this.franchisees_list[i].lead_type === 'Rejected'){
             this.rejected.push(this.franchisees_list[i]);
           }
            if (this.franchisees_list[i].lead_type === 'Unassigned'){
             this.unassigned.push(this.franchisees_list[i]);

           }
           console.log('franchisees', this.franchisees.length);
    }
    // console.log("warm leads",this.warm_leads.length);
        this.page_loaded = true;
        this.spinner.hide();
        this.sort_array();
      }
      if (response.state === 'failure'){
        this.spinner.hide();
        this.franchisees_list = [];
      }
    },
    err => {
        const message = 'Error to load franchisees.';
    });
  }

  navigate(franchisee){
  localStorage.setItem('state', JSON.stringify(franchisee));
    if (this.route_name === 'franchisee-list'){
      if (franchisee.franchisee_franchise_type === 'Master'){
        this.router.navigate(['apps/crm/master-franchisee-view/' + franchisee._id]);
      }
      else {

          this.router.navigate(['/apps/crm/franchisee-setup/' + franchisee._id + '/discussion']);

      }
      // apps/crm/master-franchisee-view/' + franchisee._id
    }
    if (this.route_name === 'library-main' || this.route_name === 'common-folder'){
      this.router.navigate(['/apps/library/franchisee-folder/' +  franchisee._id]);
    }
  }
  // filter
  sort_array(){
    this.franchisees_list.sort(function(a, b) {
        const aa = a._id,
        bb = b._id;
        return aa > bb ? -1 : (aa < bb ? 1 : 0);
   });
  }

  // convertFile (event) {
  //   let input = document.getElementById('fileInput');
  //   console.log("inut",input);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     let text = reader.result;
  //     console.log('CSV: ', text.substring(0, 100) + '...');

  //   };
  //   reader.readAsText(input);
  // };
  convertFile(event: any) {
  this.spinner.show();
// this.spinner.show();
  console.log(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = ( event : any) => {
      let csv: string = reader.result;
      let allTextLines = csv.split(/\r|\n|\r/);
      let headers = allTextLines[0].split(',');
      let lines = [];

      // swal(
      //       'File Imported Successfully!',
      //       // 'Test Complete!',
      //       'success'
      //     );

      for (let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(/,/);
        if (data.length === headers.length) {
          let tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }

        // log each row to see output
        lines.push(tarr);
      }
    }
    console.log(lines);
     // this.import_leads = lines;
      for (let j = 1; j < lines.length; j++){
      console.log('lines[j]', lines[j][0]);
      const obj = {
        'franchisee_name': lines[j][0],
        'franchisee_address': lines[j][1],
        'franchisee_city': lines[j][2],
        'franchisee_state': lines[j][3],
        'franchisee_pincode': lines[j][4],
        'franchisee_country': lines[j][5],
        'lead_source': lines[j][6],
        'franchisee_franchise_type': lines[j][7],
        'franchisee_franchise_model': lines[j][8],
        'franchisee_date': new Date(),
        'franchisee_email': lines[j][10],
        'franchisee_investment': lines[j][11],
        'partner_name': lines[j][12],
        'partner_occupation': lines[j][13],
        'partner_mobile_number': lines[j][14],
        'partner_age': lines[j][15],
        'partner_house_number': lines[j][16],
        'partner_address': lines[j][17],
        'partner_city': lines[j][18],
        'partner_state': lines[j][19],
        'partner_pincode': lines[j][20],
        'partner_country': lines[j][21],
        'bussiness_type_id': lines[j][22]

      };
      this.import_leads.push(obj);
      }
      this.upload_excel();
      this.get_list();
    };

      reader.readAsText(event.target.files[0]);

    }
}
upload_excel(){
 this.spinner.show();
  this.httpService.upload_excel(this.import_leads).subscribe(response => {

    if (response.state === 'success'){


      this.get_list();
      const toast: Toast = {
       type: 'success',
       title: 'Data imported',
       timeout: 2000,
       body: '<h5>Data inserted successfully</h5>',
       bodyOutputType: BodyOutputType.TrustedHtml
   };
   this.toasterService.pop(toast);
        // swal(
        //     'File Imported Successfully!',
        //     // 'Test Complete!',
        //     'success'
        //   );

    }

    if (response.state === 'failure'){
       this.spinner.hide();
       const toast: Toast = {
        type: 'error',
        title: 'Failed to import',
        timeout: 20000,
        body: '<h5>' + response.message + '</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
    this.get_list();

    }
  },
  err => {
      const message = 'Error to load franchisees.';
      this.spinner.hide();
      console.log('test');
      const toast: Toast = {
       type: 'error',
       title: 'Failed to import',
       timeout: 2000,
       body: '<h5>Error</h5>',
       bodyOutputType: BodyOutputType.TrustedHtml
   };
   this.toasterService.pop(toast);
  });
}


// list view and grid view hareesh

listviewshow(){
this.listviewshow1 = true;
this.gridviewshow1 = false;
}

gridviewshow(){
  this.listviewshow1 = false;
  this.gridviewshow1 = true;
}
    // to archieve franchisee
    to_archieve_franchisee(franchisee) {

      franchisee.archieve_franchisee = true;
      this.httpService.archieve_franchisee(franchisee).subscribe(response => {
        if (response.state === 'success') {
          console.log(response);
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Franchisee archieved</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          // if (response.data.archieve_franchisee == true) {
            const index = this.franchisees_list.indexOf(franchisee);
          this.franchisees_list.splice(index, 1);
          // }
         
        //  this.get_list();
          console.log(this.franchisees_list);
        }
        if (response.state === 'failure') {
  
        }
      },
        err => {
          const message = 'Error to load data.'
        })
    }
 

}
