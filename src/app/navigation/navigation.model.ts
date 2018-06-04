import { Component, OnInit } from '@angular/core';
import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';
import { AppService } from '../app.service';
export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];
    public user_data: any = {};
    constructor()
    {
      this.user_data = JSON.parse(localStorage.getItem('user_data'));
      if (this.user_data){

      if (this.user_data.user_role === 'franchisor'){
          this.model = [
                      {
                        'id'       : 'setup',
                        'title'    : 'Franchisee CRM',
                        'type'     : 'item',
                        'icon'     : 'verified_user',
                        'url'      : '/apps/franchisees'
                    },
                    {
                      'id'       : 'library',
                      'title'    : 'Library',
                      'type'     : 'item',
                      'icon'     : 'library_books',
                      'url'      : '/apps/library'
                  },
                  {
                    'id'       : 'settings',
                    'title'    : 'Settings',
                    'type'     : 'item',
                    'icon'     : 'settings',
                    'url'      : '/apps/settings'
                },

                {
                  'id'       : 'assesments',
                  'title'    : 'Assesments',
                  'type'     : 'item',
                  'icon'     : 'book',
                  'url'      : '/apps/assesments'
              },

              //   {
              //     'id'       : 'marketing',
              //     'title'    : 'Marketing',
              //     'type'     : 'item',
              //     'icon'     : 'today',
              //     'url'      : '/apps/marketing'
              // },
              {
                  'id'       : 'calendar',
                  'title'    : 'Marketing',
                  'translate': 'NAV.CALENDAR',
                  'type'     : 'item',
                  'icon'     : 'today',
                  'url'      : '/apps/calendar'
              },

              {
                'id'       : 'discussion-forum',
                'title'    : 'Discussion Forum',
                'type'     : 'item',
                'icon'     : 'comment',
                'url'      : '/apps/discussion-forum'
            },

            {
              'id'       : 'ticketing-system',
              'title'    : 'Ticketing System',
              'type'     : 'item',
              'icon'     : 'comment',
              'url'      : '/apps/ticketing-system'
          },

                //   {
                //     'id'       : 'master',
                //     'title'    : 'Master Franchisee',
                //     'type'     : 'item',
                //     'icon'     : 'book',
                //     'url'      : '/apps/crm/master-franchisee'
                // }
              //   {
              //     'id'       : 'master',
              //     'title'    : 'Master Franchisee',
              //     'type'     : 'item',
              //     'icon'     : 'book',
              //     'url'      : '/apps/crm/master-franchisee-list'
              // }

          ];
        }
        if (this.user_data.user_role === 'franchisee'){
          // '/apps/franchisees/franchisee/'  + this.user_data._id
          this.model = [
                        {
                          'id'       : 'setup',
                          'title'    : 'Setup',
                          'type'     : 'item',
                          'icon'     : 'school',
                          'url'      : '/apps/crm/franchisee-setup/' + this.user_data._id + '/discussion'
                      },
                      {
                        'id'       : 'library',
                        'title'    : 'Library',
                        'type'     : 'item',
                        'icon'     : 'book',
                        'url'      : '/apps/library/library-main'
                        // 'url'      : '/apps/franchisees/franchisee-files/' + this.user_data._id
                    },
                    {
                        'id'       : 'calendar',
                        'title'    : 'Marketing',
                        'translate': 'NAV.CALENDAR',
                        'type'     : 'item',
                        'icon'     : 'today',
                        'url'      : '/apps/calendar/' + this.user_data._id
                    },

                    {
                      'id'       : 'discussion-forum',
                      'title'    : 'Discussion Forum',
                      'type'     : 'item',
                      'icon'     : 'comment',
                      'url'      : '/apps/discussion-forum/' + this.user_data._id
                  },

            ];
        }
      }
      }
}
