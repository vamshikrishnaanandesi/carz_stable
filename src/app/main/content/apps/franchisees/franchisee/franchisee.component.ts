import { Component, OnInit } from '@angular/core';
import { FranchiseesService } from '../../franchisees/franchisees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';
@Component({
  selector: 'fuse-franchisee',
  templateUrl: './franchisee.component.html',
  styleUrls: ['./franchisee.component.scss']
})
export class FranchiseeComponent implements OnInit {
  franchisees: {};
  id: any;
  userData = [];
  constructor(private route: ActivatedRoute, public httpService: FranchiseesService, private router: Router, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) { 
  }

  ngOnInit() {
   // this.viewFranchisee(this.route.snapshot.params['id']);
   this.userData = JSON.parse(localStorage.getItem('user_data'));
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
  });
      this.ng4LoadingSpinnerService.show();
    
  //   setTimeout(function() {
  //    this.ng4LoadingSpinnerService.hide();
  //  }.bind(this), 2000);
  }
  // routeToView(){
  //   this.router.navigate(['editprofile']);
  // }
}
