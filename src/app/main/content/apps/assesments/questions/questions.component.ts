import { Component, OnInit } from '@angular/core';
import { CrmService } from '../../crm/crm.service';
import { MatTabChangeEvent } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PageEvent} from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'fuse-app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss', '../assesments.component.scss']
})
export class QuestionsComponent implements OnInit {
  tabs = ['Dashboard', 'Library'];
  // public assessment_types_list = [];
  // public answers = [];
  // public datasource = [];
  // public pageIndex = 0;
  // public pageSize = 3;
  // public length = 0;
  // public p: any = 1;
  // public assessment_types_name = [];
  // pratner_id: any;

  constructor(public httpService: CrmService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  // assessment_questions(qid) {
  //   this.assessment_types_list = [];
  //   this.httpService.question_list().subscribe(response => {
  //     if (response.state === 'success') {
  //       this.assessment_types_list = response.data;
  //       this.answers = this.assessment_types_list;
  //       this.datasource = _.filter(this.assessment_types_list, function (o) {
  //         return o.question_type === qid;
  //       });
  //       this.pageIndex = 1;
  //       this.pageSize = 3;
  //       this.length = response.data.length;
  //     }
  //     if (response.state === 'failure') {

  //     }
  //   });
  // }

  // filter_ques(qid) {
  //   this.p = 1;
  //   this.datasource = _.filter(this.assessment_types_list, function (o) {
  //     return o.question_type === qid;
  //   });
  // }

  // onLinkClick(event: MatTabChangeEvent) {
  //   this.filter_ques(event.tab.textLabel);
  // }

  // assessment_types() {
  //   this.httpService.question_types().subscribe(response => {
  //     if (response.state === 'success') {
  //       this.assessment_types_name = response.data;
  //       this.assessment_questions(this.assessment_types_name[0].question_type_name);
  //     }
  //     if (response.state === 'failure') {

  //     }
  //   });
  // }

  // get_assessment_types(partner_id) {
  //   if (partner_id !== this.pratner_id) {
  //     this.pratner_id = partner_id;
  //     this.answers = [];
  //     this.assessment_types();
  //   }
  // }

  // loadIdValueInForm(selected_option, type_name, question, j) {
  //   for (let i = 0; this.datasource.length; i++) {
  //     if (this.datasource[i].question_EN === question.question_EN) {
  //       this.datasource[i].selected_option = selected_option;
  //       const search = this.datasource[i].question_EN;
  //       const results = _.findIndex(this.answers, function (chr) {
  //         return chr.question_EN === search;
  //       });
  //       if (results !== -1) {
  //         this.answers[results] = this.datasource[i];
  //       }
  //       if (results === -1) {
  //         this.answers.push(this.datasource[i]);
  //       }
  //       return this.answers;
  //     }
  //   }
  // }

  navigateResource(){
    this.router.navigate(['/apps/assesments/resources-list']);
    }

}
