import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fuse-app-master-franchisee-list',
  templateUrl: './master-franchisee-list.component.html',
  styleUrls: ['./master-franchisee-list.component.scss']
})
export class MasterFranchiseeListComponent implements OnInit {
  franchisees_list: any = [];
  crm_franchisee:String = '';
     spinnerConfig: object = {
        bdColor: '#333',
        size: 'medium',
        color: '#fff',
        type : 'ball-clip-rotate'
      };
  constructor(private spinner: NgxSpinnerService, public httpService: CrmService, private router: Router, private route: ActivatedRoute) {
    this.get_franchisee_list();
  }

  ngOnInit() {

  }
  get_franchisee_list(){
    this.spinner.show(); // To show the spinner
    this.httpService.getMasterFranchisee().subscribe(response => {
      if (response.state === 'success'){
         this.franchisees_list = response.data;
          this.spinner.hide(); // To hide the spinner
        }
      if (response.state === 'failure'){
        this.franchisees_list = [];
        this.spinner.hide();
      }
    },
    err => {
      this.spinner.hide();
        const message = 'Error to load franchisees.';
    });

  }
}
