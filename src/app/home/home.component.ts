import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy{
  speedValue: any = 0;
  speedLimitValue: any = 50;
  location = null;
  oldLocation: any = null;
  vibration: boolean;
  signalTone: boolean;
  showSpeedLimit: boolean;
  intervalId: any;
  constructor(private data: DataService) {
  }
  ngOnInit(): void {
    this.data.currentVibrationStatus.subscribe(vibration => this.vibration = vibration);
    this.data.currentShowSpeedLimitStatus.subscribe(showSpeedLimit => this.showSpeedLimit = showSpeedLimit);
    this.data.currentSignalToneStatus.subscribe(signalTone => this.signalTone = signalTone);
    this.data.currentSpeedLimitValue.subscribe(speedLimitValueValue => this.speedLimitValue = speedLimitValueValue);
    this.getLocation();
    this.intervalId = setInterval(() => this.getSpeed(), 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  getSpeed(): void {
    this.getLocation();
    if (this.oldLocation != null && this.location != null) {
      const oldLatitude = this.oldLocation.coords.latitude;
      const oldLongitude = this.oldLocation.coords.longitude;
      const newLatitude = this.location.coords.latitude;
      const newLongitude = this.location.coords.longitude;
      const dist = this.getDistance(oldLatitude, oldLongitude, newLatitude, newLongitude);
      const time = ((this.location.timestamp) - this.oldLocation.timestamp) / 1000.0;
      let speedMps = 0;
      if (time !== 0) {
        speedMps = dist / time;
      }
      const speedKmh = Math.ceil((speedMps * 3600.0) / 1000.0);
      if ((speedKmh - this.speedValue < 100)){ this.speedValue = String(speedKmh); }
      if (this.speedValue >= Number(this.speedLimitValue) + 3) {
        if (this.showSpeedLimit){
          const homeBody = document.getElementById('homeBody');
          homeBody.setAttribute('class', 'too-fast');
        }
        if (this.vibration) {window.navigator.vibrate(500); }
        this.playAudio();
      } else {
        const homeBody = document.getElementById('homeBody');
        homeBody.setAttribute('class', 'slow-enough');
      }
    }
  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.succes(pos), (err) => this.error(err), {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });
    } else {
      this.location = null;
    }
  }
  getDistance(lat1: number, lon1: number, lat2: number, lon2: number): any {
      // Convert degrees to radians
      lat1 = lat1 * Math.PI / 180.0;
      lon1 = lon1 * Math.PI / 180.0;

      lat2 = lat2 * Math.PI / 180.0;
      lon2 = lon2 * Math.PI / 180.0;

      // radius of earth in metres
      const r = 6378100;

      // P
      const rho1 = r * Math.cos(lat1);
      const z1 = r * Math.sin(lat1);
      const x1 = rho1 * Math.cos(lon1);
      const y1 = rho1 * Math.sin(lon1);

      // Q
      const rho2 = r * Math.cos(lat2);
      const z2 = r * Math.sin(lat2);
      const x2 = rho2 * Math.cos(lon2);
      const y2 = rho2 * Math.sin(lon2);

      // Dot product
      const dot = (x1 * x2 + y1 * y2 + z1 * z2);
      const cosTheta = dot / (r * r);

      const theta = Math.acos(cosTheta);

      // Distance in Metres
      return r * theta;
    }
  error(err): void {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    localStorage.setItem('location', null);
  }
  succes(pos): void {
    this.oldLocation = this.location;
    this.location = pos;
  }

  simulateSpeedLimit(): void {
    const homeBody = document.getElementById('homeBody');
    if (this.showSpeedLimit) {
      if ((this.speedValue % 10) <= 3 && (this.speedValue % 10) > 0 && this.speedValue > 30 && this.speedValue < 140) {
        this.speedLimitValue = Math.round(Number(this.speedValue) - (Number(this.speedValue) % 10));
        homeBody.setAttribute('class', 'medium-fast');
      } else if ((this.speedValue % 10) > 3 && this.speedValue > 30 && (this.speedValue % 10) <= 7 && this.speedValue < 140) {
        this.speedLimitValue = Math.round(Number(this.speedValue) - (Number(this.speedValue) % 10));
        homeBody.setAttribute('class', 'too-fast');
        if (this.vibration) {window.navigator.vibrate(1000); }
        this.playAudio();
      } else {
        this.speedLimitValue = Math.round(Number(this.speedValue) + (10 - (Number(this.speedValue) % 10)));
        homeBody.setAttribute('class', 'slow-enough');
      }
    }
  }
  playAudio(): void {
    if (this.signalTone) {
      const audio = new Audio('../../assets/audio/two-beeps.mp3');
      audio.load();
      audio.play();
    }
  }
}
