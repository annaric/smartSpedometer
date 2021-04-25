import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  speedValue: any = 0;
  speedLimit: any = 0;
  location = null;
  oldLocation: any = null;
  vibration: boolean;
  signalTone = true;
  showSpeedLimit = true;
  constructor(private data: DataService) {
  }
  ngOnInit(): void {
    this.data.currentVibrationStatus.subscribe(vibration => this.vibration = vibration);
    this.data.currentShowSpeedLimitStatus.subscribe(showSpeedLimit => this.showSpeedLimit = showSpeedLimit);
    this.data.currentSignalToneStatus.subscribe(signalTone => this.signalTone = signalTone);
    this.getLocation();
    setInterval(() => this.getSpeed(), 1000);
    setInterval(() => this.simulateSpeedLimit(), 5000);
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
      this.speedValue = String(Math.ceil((speedMps * 3600.0) / 1000.0));
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
    const currValue = this.speedValue;
    const currOverflow = this.speedValue % 10;
    if ( currOverflow <= 3 && currOverflow > 0 && currValue > 30) {
      this.speedLimit = Math.round(currValue - currOverflow);
      this.ifMediumFast();
    } else if (currOverflow > 3 && currValue > 30 && currOverflow <= 7) {
      this.speedLimit = Math.round(currValue - currOverflow);
      this.ifTooFast();
    } else {
      this.speedLimit = Math.round(currValue + (10 - currOverflow));
      this.ifSlowEnough();
    }
  }
  ifTooFast(): void {
    const homeBody = document.getElementById('homeBody');
    if (this.showSpeedLimit) { homeBody.setAttribute('class', 'too-fast'); }
    if (this.vibration) { window.navigator.vibrate(400); }
    this.playAudio();
  }
  ifSlowEnough(): void {
    const homeBody = document.getElementById('homeBody');
    if (this.showSpeedLimit) { homeBody.setAttribute('class', 'slow-enough'); }
  }
  ifMediumFast(): void {
    const homeBody = document.getElementById('homeBody');
    if (this.showSpeedLimit) { homeBody.setAttribute('class', 'medium-fast'); }
  }
  playAudio(): void {
    if (this.signalTone) {
      const audio = new Audio();
      audio.src = '../../assets/audio/two-beeps.mp3';
      audio.load();
      audio.play();
    }
  }
}
