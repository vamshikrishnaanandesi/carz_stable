import {
    CalendarEventAction
} from 'angular-calendar';

import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';
// import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';

/*
export interface EventAction
{
    label: string;
    cssClass?: string;

    onClick({event}: {
        event: CalendarEvent;
    }): any;
}*/

export class CalendarEventModel
{
    start: Date;
    end?: Date;
    title: string;
    type: string;
    notes: string;
    campaign_color: string;
    medium: string;
    budget: string;
    feedback: string;
    _id: string;
    location: string;
    franchisor_id: string;
    campaign_files: any = [];
    color: {
        primary: string;
        secondary: string;
    };
    actions?: CalendarEventAction[];
    allDay?: boolean;
    cssClass?: string;
    resizable?: {
        beforeStart?: boolean;
        afterEnd?: boolean;
    };
    draggable?: boolean;
    meta?: {
        location: string,
        notes: string
    };

    constructor(data?)
    {
        data = data || {};
        this.start = new Date(data.start) || startOfDay(new Date());
        this.end = new Date(data.end) || endOfDay(new Date());
        this.title = data.title || '';
        this.type = data.type || '';
        this.notes = data.notes || '';
        this.campaign_color = data.campaign_color || '';
        this.medium = data.medium || '';
        this.budget = data.budget || '';
        this.franchisor_id = data.franchisor_id || '';
        this.franchisor_id = data.franchisor_id || '';
        this._id = data._id || '';
        this.location = data.location || '';
        this.color = {
            primary  : data.color && data.color.primary || '#1e90ff',
            secondary: data.color && data.color.secondary || '#D1E8FF'
        };
        this.draggable = data.draggable || true;
        this.resizable = {
            beforeStart: data.resizable && data.resizable.beforeStart || true,
            afterEnd   : data.resizable && data.resizable.afterEnd || true
        };
        this.actions = data.actions || [];
        this.allDay = data.allDay || false;
        this.cssClass = data.cssClass || '';
        this.meta = {
            location: data.meta && data.meta.location || '',
            notes   : data.meta && data.meta.notes || ''
        };
    }

}
