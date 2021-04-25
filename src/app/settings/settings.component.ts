import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    vibration: boolean;
    showSpeedLimit: boolean;
    signalTone: boolean;
    accidentRecognition = false;
    isCar = true;
    emergencyContact = {name: '', phone: ''};
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.currentVibrationStatus.subscribe(vibration => this.vibration = vibration);
    this.data.currentShowSpeedLimitStatus.subscribe(showSpeedLimit => this.showSpeedLimit = showSpeedLimit);
    this.data.currentSignalToneStatus.subscribe(signalTone => this.signalTone = signalTone);
    const vibrationButton = document.getElementById('vibration');
    const speedLimitButton = document.getElementById('speedLimit');
    const signalToneButton = document.getElementById('signalTone');
    if (this.vibration) { vibrationButton.setAttribute('checked', ''); }
    if (this.showSpeedLimit) { speedLimitButton.setAttribute('checked', ''); }
    if (this.signalTone) { signalToneButton.setAttribute('checked', ''); }
  }
  changeSpeedLimit(): void {
    this.data.changeShowSpeedLimit(!this.showSpeedLimit);
  }

  changeSignalTone(): void {
    this.data.changeSignalTone(!this.signalTone);
  }
  changeVibration(): void {
    this.data.changeVibration(!this.vibration);
  }
  changeAccidentRecognition(): void {
    this.accidentRecognition = !this.accidentRecognition;
  }
}
