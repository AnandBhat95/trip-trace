import {Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxKonvaModule  } from 'ngx-konva';

@Component({
  selector: 'app-trip-visualizer',
  imports: [CommonModule,NgxKonvaModule],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.css'
})
export class TripVisualizerComponent implements OnChanges {
  @Input() trips: any[] = [];
  processedTrips: any[] = [];
  stageConfig = { width: 1500, height: 300 };
  labelWidth = 80; 

  colorPalette = [
    '#ff6b6b',
    '#feca57', 
    '#48dbfb', 
    '#1dd1a1', 
    '#ff9ff3', 
    '#5f27cd', 
    '#54a0ff',
    '#00d2d3' 
  ];

  ngOnChanges() {
    this.processTrips();
  }

 processTrips() {
  this.processedTrips = [];

  for (let i = 0; i < this.trips.length; i++) {
    const current = this.trips[i];
    let level = 1;
    const x = 50 + i * 180;
    const color = this.colorPalette[i % this.colorPalette.length];
    const label = `${current.start.slice(0, 3)}-${current.end.slice(0, 3)}`;

    this.processedTrips.push({
      ...current,
      level,
      continued: false,
      x,
      y: 50,
      color,
      label
    });
    if (
      i > 0 &&
      current.start.toLowerCase() === this.trips[i - 1].start.toLowerCase() &&
      current.end.toLowerCase() === this.trips[i - 1].end.toLowerCase()
    ) {
      this.processedTrips[i].level = 2;
      this.processedTrips[i].y = 20;
      this.processedTrips[i - 1].level = 2;
      this.processedTrips[i - 1].y = 20;
    }
  }

  for (let i = 1; i < this.processedTrips.length; i++) {
    const prev = this.processedTrips[i - 1];
    const current = this.processedTrips[i];

    const continued =
      prev.end.slice(0, 3).toLowerCase() ===
      current.start.slice(0, 3).toLowerCase();

    this.processedTrips[i - 1].continued = continued;
  }
}
}
