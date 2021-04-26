import {Component, OnInit, OnDestroy} from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy{
  speedValue = 0;
  speedLimitValue = 50;
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
    this.intervalId = setInterval(() => this.update(), 1000);
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  update(): void {
    this.getLocation();
    this.getSpeed();
    this.checkSpeedLimit();
  }
  getSpeed(): void {
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
      if ((speedKmh - this.speedValue < 100)){ this.speedValue = speedKmh; }
    }
  }
  checkSpeedLimit(): void {
    if (this.speedValue >= (this.speedLimitValue + 3)) {
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
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => this.succes(pos), (err) => this.error(err), {
        enableHighAccuracy: true,
        timeout: 1000,
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
    this.location = null;
  }
  succes(pos): void {
    this.oldLocation = this.location;
    this.location = pos;
  }
  playAudio(): void {
    if (this.signalTone) {
      const audio = new Audio('../../assets/audio/two-beeps.mp3');
      audio.load();
      audio.play();
    }
  }
}
