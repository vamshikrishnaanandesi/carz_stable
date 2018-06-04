import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
    selector   : 'fuse-google-maps-docs',
    templateUrl: './google-maps.component.html',
    styleUrls  : ['./google-maps.component.scss']
})
export class FuseGoogleMapsDocsComponent
{
    public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

    constructor()
    {

    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
        // set google maps defaults
 
        
        // create search FormControl
        this.searchControl = new FormControl();
     
     
   }
}

