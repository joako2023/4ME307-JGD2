import { Injectable } from "@angular/core";
import { parseISO } from 'date-fns';
export interface Item {
    unitStatus: { [status: string]: number };
    units: number;
    date: Date;
  }
  
  @Injectable({ providedIn: 'root' })
  export class TimeService {
    async fetch() {
      const response = await fetch('/assets/data.json');
      const data: Item[] = await response.json();
      return data.map(item => {
        const dateStr = (item.date as unknown) as string;
        item.date = parseISO(`${dateStr}Z`);
        return item;
      });
    }
  }