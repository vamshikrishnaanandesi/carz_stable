import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NavigationEnd, Router, CanActivate, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'fuse-app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss']
})


export class EmptyComponent implements OnInit {
  return_url: any;
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  constructor(private spinner: NgxSpinnerService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.return_url = this.route.snapshot.queryParams['returnUrl'];
    this.router.navigate([this.return_url]);
  }
 
  
 
}

