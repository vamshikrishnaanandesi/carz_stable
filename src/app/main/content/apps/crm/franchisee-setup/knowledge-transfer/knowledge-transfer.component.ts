import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { KnowledgeTransfer2Component } from '../knowledge-transfer2/knowledge-transfer2.component';
@Component({
  selector: 'fuse-app-knowledge-transfer',
  templateUrl: './knowledge-transfer.component.html',
  styleUrls: ['./knowledge-transfer.component.scss']
})
export class KnowledgeTransferComponent implements OnInit {
  franchiseeData: any;
  profilePic: any;
  public show_kt_popup_first_time: any;
  // public user_data_new = this.user_data_new;
  constructor( public dialog: MatDialog, public dialogRef: MatDialogRef<KnowledgeTransfer2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      const user_data_new = JSON.parse(localStorage.getItem('user_data'));
      console.log('user_data_new', user_data_new);

      // const show_kt_popup_first_time = user_data.show_kt_popup_first_time;

      // console.log("userdata_kt_popup555555", show_kt_popup_first_time);


     }

  ngOnInit() {
    // public user_data_new =

    this.franchiseeData = JSON.parse(localStorage.getItem('state'));
    this.profilePic = this.franchiseeData.franchisee_profile_pic.path;

  }

  knowledgeTransfer2(): void{
    this.show_kt_popup_first_time = false;
  //  const userdata_new_array = this.user_data_new;
  //  console.log("userdata_new_array", userdata_new_array);
  //  userdata_new_array.push(this.show_kt_popup_first_time);
    console.log('this.show_kt_popup_first_time', this.show_kt_popup_first_time);
    // localStorage.setItem('user_data', this.show_kt_popup_first_time);
    // console.log(" this.show_kt_popup_first_time 22222",  this.show_kt_popup_first_time );
    this.dialogRef.close();
    const dialogRef = this.dialog.open(KnowledgeTransfer2Component, {
      width: '650px',
      height: '464px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close();
      console.log('The dialog was closed');
      // this.animal = result;
    });



  }


}
