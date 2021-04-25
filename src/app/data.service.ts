import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private vibration = new BehaviorSubject<boolean>(true);
  private signalTone = new BehaviorSubject<boolean>(true);
  private showSpeedLimit = new BehaviorSubject<boolean>(true);
  currentVibrationStatus = this.vibration.asObservable();
  currentSignalToneStatus = this.signalTone.asObservable();
  currentShowSpeedLimitStatus = this.showSpeedLimit.asObservable();

  constructor() { }
  changeVibration(vibration: boolean): void {
    this.vibration.next(vibration);
  }
  changeSignalTone(signalTone: boolean): void {
    this.signalTone.next(signalTone);
  }
  changeShowSpeedLimit(showSpeedLimit: boolean): void {
    this.showSpeedLimit.next(showSpeedLimit);
  }
}
