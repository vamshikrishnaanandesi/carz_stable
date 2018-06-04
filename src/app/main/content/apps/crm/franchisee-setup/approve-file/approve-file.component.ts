import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { CrmService } from '../../crm.service';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'fuse-app-approve-file',
  templateUrl: './approve-file.component.html',
  styleUrls: ['./approve-file.component.scss']
})
export class ApproveFileComponent implements OnInit {

  constructor(private httpService: CrmService, private router: Router, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<ApproveFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  approve(){
    const obj = {
      'status' : 'Approved',
      'doc_name' : this.data.file.doc_name,
      'franchisee_Id' : this.data.file.franchisee_Id,
      'partner_Id' : this.data.file.partner_Id,
      'kyc_id' : this.data.file.kyc_id
    };
    this.httpService.approve_doc(obj).subscribe(response => {
      console.log(response);
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
