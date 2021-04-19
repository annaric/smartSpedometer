import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    vibration: any;
    speedLimit: any;
    signalTone: any;
    accidentRecognition: any;
    isCar: any;
    emergencyContact: any;
  constructor() {
    this.vibration = false;
    this.speedLimit = true;
    this.signalTone = false;
    this.accidentRecognition = false;
    this.isCar = true;
    this.emergencyContact = {name: '', phone: ''};
  }

  ngOnInit(): void {
  }

}
