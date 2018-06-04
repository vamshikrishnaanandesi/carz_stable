import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fuse-crm-franchisee',
  templateUrl: './crm-franchisee.component.html',
  styleUrls: ['./crm-franchisee.component.scss']
})
export class CrmFranchiseeComponent implements OnInit {
  franchisees: {};
  id: any;
  constructor(private route: ActivatedRoute, public httpService: CrmService) {

   }

  ngOnInit() {
    this.viewFranchisee(this.route.snapshot.params['id']);
  }
  viewFranchisee(id) {
    this.httpService.viewFranchiseeById(id).subscribe(response => {
      console.log('response', response);
      if (response.state === 'success'){
      this.franchisees = response.franchisees_data;
      console.log('response', this.franchisees);
      }
      if (response.state === 'failure'){
              // this.franchisees = [];
            } 
    },
    err => {
      const message = 'Error to load franchisees.';
  }
  );
  }
}
