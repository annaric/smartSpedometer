import { Component, OnInit } from '@angular/core';
import {INT_TYPE} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  speedValue: any;
  speedLimit: any;
  mySpeed: any;
  myLocation: any;
  position: any;
  oldLocation: any;

  constructor() {
    this.speedValue = 0;
    this.speedLimit = 50;
    this.mySpeed = setInterval(this.getSpeed, 10000);
    this.myLocation = setInterval(this.getLocation, 1000);
  }

  ngOnInit(): void {
  }

  getSpeed(): void {
    this.oldLocation = this.position;
    this.getLocation();
    const oldLatitude = this.oldLocation.coords.latitude;
    const newLatitude = this.position.coords.latitude;
    const oldLongitude = this.oldLocation.coords.latitude;
    const newLongitude = this.position.coords.latitude;
    const dist = this.getDistance(oldLatitude, oldLongitude, newLatitude, newLongitude);
    const time = (this.position.timestamp - this.oldLocation.timestamp) / 1000.0;
    const speedMps = dist / time;
    this.speedValue = (speedMps * 3600.0) / 1000.0;
    document.getElementById('speed-bubble').innerHTML = this.speedValue;
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.position = position);
    } else {
      this.position = null;
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
  }
