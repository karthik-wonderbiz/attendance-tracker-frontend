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

  activeTab: string = '';
  filteredData: any[] = [];

  ngOnInit(): void {
    if (this.tabs && this.tabs.length > 0) {
      this.activeTab = this.tabs[0];
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
  }

  filterData(): void {
    this.filteredData = this.data
      .map(item => ({
        ...item,
        totalHours: this.convertToHours(item, this.activeTab)
      }))
      .sort((a, b) => this.sortByHours(a, b, this.activeTab));
      
    // Emit the filtered data
    this.filteredDataChange.emit(this.filteredData);
  }

  getFilteredData(): any[] {
    return this.filteredData;
  }

  private convertToHours(item: any, period: string): string {
    switch (period) {
      case 'Daily':
        return this.convertMinutesToHours(item.dailyHours);
      case 'Weekly':
        return this.convertMinutesToHours(item.weeklyHours);
      case 'Monthly':
        return this.convertMinutesToHours(item.monthlyHours);
      case 'Quarterly':
        return this.convertMinutesToHours(item.quarterlyHours);
      case 'Yearly':
        return this.convertMinutesToHours(item.yearlyHours);
      case 'AllTime':
        return this.convertMinutesToHours(item.allTimeHours);
      default:
        return this.convertMinutesToHours(item.dailyHours);
    }
  }

  private sortByHours(a: any, b: any, period: string): number {
    switch (period) {
      case 'Daily':
        return b.dailyHours - a.dailyHours;
      case 'Weekly':
        return b.weeklyHours - a.weeklyHours;
      case 'Monthly':
        return b.monthlyHours - a.monthlyHours;
      case 'Quarterly':
        return b.quarterlyHours - a.quarterlyHours;
      case 'Yearly':
        return b.yearlyHours - a.yearlyHours;
      case 'AllTime':
        return b.allTimeHours - a.allTimeHours;
      default:
        return b.dailyHours - a.dailyHours;
    }
  }

  private convertMinutesToHours(minutes: number): string {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}`;
  }
}
