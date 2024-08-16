import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-table-with-tabs',
  templateUrl: './table-with-tabs.component.html',
  styleUrls: ['./table-with-tabs.component.css']
})

export class TableWithTabsComponent implements OnInit, OnChanges {
  @Input() tabs: string[] = [];
  @Input() tabNames: string[] = [];
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  
  @Output() filteredDataChange = new EventEmitter<any[]>();
  @Output() tabChanged = new EventEmitter<string>();  // New Output EventEmitter

  activeTab: string = '';
  filteredData: any[] = [];

  ngOnInit(): void {
    if (this.tabs && this.tabs.length > 0) {
      this.activeTab = this.tabs[1];
    }
    this.filterData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['tabs']) {
      this.filterData();
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.filterData();
    this.tabChanged.emit(tab);  // Emit the tab change event
  }

  filterData(): void {
    this.filteredData = this.data
      .map(item => ({
        ...item
      }));
    this.filteredDataChange.emit(this.filteredData);
  }

  getFilteredData(): any[] {
    return this.filteredData;
  }
}
