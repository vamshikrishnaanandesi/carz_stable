import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast} from 'angular5-toaster';


@Component({
  selector: 'fuse-app-master-franchisee-view',
  templateUrl: './master-franchisee-view.component.html',
  styleUrls: ['./master-franchisee-view.component.scss']
})
export class MasterFranchiseeViewComponent implements OnInit {

  franchisees_list: any = [];
  crm_franchisee = '';
  franchisee: any = [];
  master_franchisee_id: any;
  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
   limit: 7,
   tapToDismiss: false,
   showCloseButton: true,
   mouseoverTimerStop: true
 });
  page_loaded  = false;
  constructor(public httpService: CrmService, private router: Router, private route: ActivatedRoute,  toasterService: ToasterService) {
    // this.get_franchisee_list();
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.master_franchisee_id = this.route.snapshot.params['franchisee_Id'];
    this.getMasterFranchiseePartners(this.route.snapshot.params['franchisee_Id']);
  }

  getMasterFranchiseePartners(id) {
    this.httpService.getMasterFranchiseeById(id).subscribe(response => {
      if (response.state === 'success'){
        this.franchisees_list = response.data;
        this.page_loaded  = true;
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load franchisee.';
  });
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
