import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import { CrmService } from '../../crm.service';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']
})
export class ViewFileComponent implements OnInit {
    public pdfUrl;
    constructor(private httpService: CrmService, private router: Router, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<ViewFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
      console.log("file",this.data);
      this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.file.path);
    }

}
