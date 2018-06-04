import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'fuse-app-assesments',
  templateUrl: './assesments.component.html',
  styleUrls: ['./assesments.component.scss']
})
export class AssesmentsComponent implements OnInit {

  tabs = ['Dashboard', 'Library'];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }


  navigateQuestions(){
    this.router.navigate(['/apps/assesments/questions']);
    }
}
