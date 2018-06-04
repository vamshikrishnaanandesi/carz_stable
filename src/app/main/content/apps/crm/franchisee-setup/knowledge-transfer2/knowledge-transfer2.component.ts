import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../../../../../../app.service';
@Component({
  selector: 'app-knowledge-transfer2',
  templateUrl: './knowledge-transfer2.component.html',
  styleUrls: ['./knowledge-transfer2.component.scss']
})
export class KnowledgeTransfer2Component implements OnInit {
user_data: any;
  constructor(public dialogRef: MatDialogRef<KnowledgeTransfer2Component>,
 @Inject(MAT_DIALOG_DATA) public data: any, private appService: AppService) { }

  ngOnInit() {
    this.user_data = this.appService.getLocal();
  }
  cancel() {
    this.dialogRef.close();
    this.user_data.show_kt_popup_first_time = false;
    this.user_data = this.appService.getLocal();
    this.appService.setLocal(this.user_data);
  }

}
