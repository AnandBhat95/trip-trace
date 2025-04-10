import {Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-visualizer',
  imports: [CommonModule],
  templateUrl: './trip-visualizer.component.html',
  styleUrl: './trip-visualizer.component.css'
})
export class TripVisualizerComponent implements OnChanges {
  @Input() trips: any[] = [];
  processedTrips: any[] = [];

  ngOnChanges() {
    this.processTrips();
  }

  processTrips() {
    const seenRoutes = new Set();
    this.processedTrips = [];
  
    for (let i = 0; i < this.trips.length; i++) {
      const current = this.trips[i];
      const key = `${current.start}-${current.end}`;
      let level = seenRoutes.has(key) ? 2 : 1;
      seenRoutes.add(key);
      this.processedTrips.push({
        ...current,
        level,
        continued: false, 
      });
  
      if (i > 0) {
        const prev = this.processedTrips[i - 1];
        if (
          current.start.slice(0, 3).toLowerCase() ===
          prev.end.slice(0, 3).toLowerCase()
        ) {
          this.processedTrips[i - 1].continued = true;
        }
      }
    }
  }
  
  
  
  
  
}
