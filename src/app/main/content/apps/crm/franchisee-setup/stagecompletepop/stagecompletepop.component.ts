import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { CommonServicesService } from '../../../common_components/common-services.service';

@Component({
  selector: 'fuse-app-stagecompletepop',
  templateUrl: './stagecompletepop.component.html',
  styleUrls: ['./stagecompletepop.component.scss'],
  providers: [
    CommonServicesService
  ]
})
export class StagecompletepopComponent implements OnInit {
  public franchisees: any;
  public save_route: any;
  public userData: any;
  public selected_leadType = '';
  public options_list = [
    {'value': 'Unassigned', 'option': 'Unassigned'},
    {'value': 'Cold', 'option': 'Cold'},
    {'value': 'Warm', 'option': 'Warm'},
    {'value': 'Hot', 'option': 'Hot'},
    {'value': 'On Hold', 'option': 'On Hold'},
    {'value': 'Franchisees', 'option': 'Franchisees'},
    {'value': 'Rejected', 'option': 'Rejected'}
  ];


  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private httpService: CommonServicesService, public dialogRef: MatDialogRef<StagecompletepopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);
    console.log('id franchisee', this.route.snapshot.params['franchisee_Id']);
    this.userData = JSON.parse(localStorage.getItem('user_data'));

  }

  ngOnInit() {

    this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);
    console.log('id franchisee', this.route.snapshot.params['franchisee_Id']);
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }

  viewFranchisee(id) {

    this.httpService.viewFranchiseeById(id).subscribe(response => {
      if (response.state === 'success'){
        this.franchisees = response.franchisees_data;
        console.log('this', this.franchisees);
        this.selected_leadType = this.franchisees.lead_type;
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load franchisees.';
  });
  }
  closeDialogpop(): void {
    this.dialogRef.close();
  }

  changeLeadStatus(opt){
    console.log(opt);
    const obj = {
      'franchisee_Id' : this.route.snapshot.params['franchisee_Id'] ,
      'lead_type': opt.option
    };
    this.httpService.lead_type(obj).subscribe(res => {
      if (res.status === 'success'){
        this.selected_leadType = opt.value;
      }
    },
  err => {
    const message = 'Error to filter';
  });
  }

}
