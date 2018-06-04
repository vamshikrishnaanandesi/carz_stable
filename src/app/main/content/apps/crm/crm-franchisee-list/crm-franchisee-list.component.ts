import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'fuse-crm-franchisee-list',
  templateUrl: './crm-franchisee-list.component.html',
  styleUrls: ['./crm-franchisee-list.component.scss']
})
export class CrmFranchiseeListComponent implements OnInit {
  franchisees_list: any = [];
  crm_franchisee = '';
  constructor(public httpService: CrmService, private router: Router, private route: ActivatedRoute) {
    this.get_franchisee_list();
  }

  ngOnInit() {

  }
  get_franchisee_list(){
    this.httpService.getAllFranchisees().subscribe(response => {
      if (response.state === 'success'){
         this.franchisees_list = response.franchisees_list;
      }
      if (response.state === 'failure'){
        this.franchisees_list = [];
        this.sort_array();
      }
    },
    err => {
        const message = 'Error to load franchisees.';
    });
  }

  navigate(franchisees_data){
    localStorage.setItem('state', JSON.stringify(franchisees_data));
    this.router.navigate(['/apps/crm/franchisee-setup/' + franchisees_data._id + '/discussion']);
  }
  // filter
  sort_array(){
    this.franchisees_list.sort(function(a, b) {
        const aa = a._id,
        bb = b._id;
        return aa > bb ? -1 : (aa < bb ? 1 : 0);
   });
  }
}
