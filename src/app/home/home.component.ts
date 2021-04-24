import {Component, OnInit} from '@angular/core';


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
  constructor() {
  }
  ngOnInit(): void {
    this.getLocation();
    setInterval(() => this.getSpeed(), 1000);
  }
  getSpeed(): void {
    this.getLocation();
    if (this.oldLocation != null && this.location != null) {
      const oldLatitude = this.oldLocation.coords.latitude;
      const oldLongitude = this.oldLocation.coords.longitude;
      const newLatitude = this.location.coords.latitude;
      const newLongitude = this.location.coords.longitude;
      const dist = this.getDistance(oldLatitude, oldLongitude, newLatitude, newLongitude);
      console.log('this.oldLocation.timestamp');
      console.log(this.oldLocation.timestamp);
      console.log('this.location.timestamp');
      console.log(this.location.timestamp);
      const time = ((this.location.timestamp) - this.oldLocation.timestamp) / 1000.0;
      console.log('time');
      console.log(time);
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
    console.log('Your current position is:');
    console.log(`Latitude : ${this.location.coords.latitude}`);
    console.log(`Longitude: ${this.location.coords.longitude}`);
    console.log(`More or less ${this.location.coords.accuracy} meters.`);
  }

}
