import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string, label: string, subColumns?: { key: string, label: string }[] }[] = [];
  @Output() rowClicked = new EventEmitter<any>();

  isObject(value: any): boolean {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }
}
