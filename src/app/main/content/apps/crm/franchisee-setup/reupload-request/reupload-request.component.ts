import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { CrmService } from '../../crm.service';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'fuse-app-reupload-request',
  templateUrl: './reupload-request.component.html',
  styleUrls: ['./reupload-request.component.scss']
})
export class ReuploadRequestComponent implements OnInit {
  public reasons = [
    {'id': 0, 'reason': 'The Scanned documents submitted are not captured well, needs to be re uploaded.'},
    {'id': 1, 'reason': 'Change in partners or share holding patterns.'},
    {'id': 2, 'reason': 'Change of location.'},
    {'id': 3, 'reason': 'Change of Business Model.'},
    {'id': 4, 'reason': 'Franchisee not appearing for Interview on time.'},
    {'id': 5, 'reason': 'All the specified partners not appeared for interview.'},
    {'id': 6, 'reason': 'Cheque bounce:The token amount or the Franchisee fees Instrument has not been honored'},
    {'id': 7, 'reason': 'Basic list of documents not submitted.'},
    {'id': 8, 'reason': 'Not answering calls or responding to emails.'},
    {'id': 9, 'reason': 'Intend or Intention /purpose of taking up franchisee not ethical.'}
  ];
  public reason_mention: String = '';
  constructor(private httpService: CrmService, private router: Router, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<ReuploadRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  reason_select(reason){
    this.reason_mention = reason;
  }
  reject(text){
    const obj = {
      'reason_listed': this.reason_mention,
      'reason_in_text': text,
      'status' : 'Rejected',
      'doc_name' : this.data.file.doc_name,
      'franchisee_Id' : this.data.file.franchisee_Id,
      'partner_Id' : this.data.file.partner_Id,
      'kyc_id' : this.data.file.kyc_id
    };
    this.httpService.reject_doc(obj).subscribe(response => {
      if (response.state === 'success') {
          this.dialogRef.close(response);
      }
      if (response.state === 'failure') {
      }
    },
    err => {
      const message = 'Error to load franchisee.';
    });
  }

}
