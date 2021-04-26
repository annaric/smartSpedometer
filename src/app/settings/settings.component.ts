import { Component, OnInit, AfterViewInit  } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit  {
    vibration: boolean;
    showSpeedLimit = true;
    signalTone: boolean;
    accidentRecognition = false;
    isCar = true;
    emergencyContact = {name: '', phone: ''};
    speedLimitValue = '';
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.currentVibrationStatus.subscribe(vibration => this.vibration = vibration);
    this.data.currentShowSpeedLimitStatus.subscribe(showSpeedLimit => this.showSpeedLimit = showSpeedLimit);
    this.data.currentSignalToneStatus.subscribe(signalTone => this.signalTone = signalTone);
    this.data.currentSpeedLimitValue.subscribe(speedLimitValue => this.speedLimitValue = speedLimitValue);
    const vibrationButton = document.getElementById('vibration');
    const speedLimitButton = document.getElementById('speedLimit');
    const signalToneButton = document.getElementById('signalTone');
    if (this.vibration) { vibrationButton.setAttribute('checked', ''); }
    if (this.showSpeedLimit) { speedLimitButton.setAttribute('checked', ''); }
    if (this.signalTone) { signalToneButton.setAttribute('checked', ''); }
  }
  ngAfterViewInit(): void {
    const speedLimitValueInput = document.getElementById('speedLimitValue');
    speedLimitValueInput.setAttribute('value', this.speedLimitValue);
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

  setNewSpeedLimitValue(): void {
    this.data.changeSpeedLimitValue(this.speedLimitValue);
    console.log(this.speedLimitValue);
  }
}
