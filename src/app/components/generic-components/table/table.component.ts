import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string, subColumns?: { key: string, label: string }[] }[] = [];

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  objectKeys(value: any): string[] {
    return Object.keys(value);
  }
}
