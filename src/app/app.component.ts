import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  isOn = true;

  toggle() {
    this.isOn = !this.isOn;
  }

  toggleOff() {
    if (!this.isOn) {
      this.isOn = !this.isOn
    }
  }


  constructor() { }
}
