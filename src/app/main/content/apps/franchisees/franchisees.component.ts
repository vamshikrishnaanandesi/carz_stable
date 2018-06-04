import { Component, OnInit } from '@angular/core';
import { FranchiseesService } from '../franchisees/franchisees.service';
import { Router } from '@angular/router';
import { FranchiseeComponent  } from '../franchisees/franchisee/franchisee.component';

@Component({
  selector: 'fuse-franchisees',
  templateUrl: './franchisees.component.html',
  styleUrls: ['./franchisees.component.scss']
})
export class FranchiseesComponent implements OnInit {
  franchisees_list: any = [];
  franchisees: any;
  constructor(public httpService: FranchiseesService, private router: Router, ) {
    
   }

  ngOnInit() {
    this.get_list();
  }
  get_list(){
    this.httpService.getAllFranchisees().subscribe(response => {
      if (response.state === 'success'){
        this.franchisees_list = response.franchisees_list;
      }
      if (response.state === 'failure'){
        this.franchisees_list = [];
      } 
    },
    err => {
        const message = 'Error to load franchisees.';
    });
  }
  routeToView(){
    this.router.navigate(['franchisee']);
  }
}
