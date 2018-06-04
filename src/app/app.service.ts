import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

    freshdesk: any;
  constructor() { }
  baseUrl(){
    // return 'https://carz-api.herokuapp.com';
    return 'http://localhost:3000';
  }
  freshDeskUrl(){
    return 'https://wtadomain.freshdesk.com';
  }

  setLocal(user): void {
    user.show_kt_popup_first_time = false;
    localStorage.setItem('user_data', JSON.stringify(user));
    console.log(user);
  }
  getLocal(): void {
    return JSON.parse(localStorage.getItem('user_data'));
  }

}
