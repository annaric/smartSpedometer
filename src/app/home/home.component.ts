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
  myVar: any;

  constructor() {
    this.speedValue = 0;
    this.speedLimit = 50;
    this.myVar = setInterval(this.myTimer, 1000);
  }

  ngOnInit(): void {
  }

  myTimer(): void {
    this.speedValue = (this.speedValue) + 1;
    document.getElementById('speed-bubble').innerHTML = this.speedValue;
  }

}
