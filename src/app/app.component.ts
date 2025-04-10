import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripInputComponent } from './trip-input/trip-input.component';
import { TripVisualizerComponent } from './trip-visualizer/trip-visualizer.component';
@Component({
  selector: 'app-root',
  imports: [TripInputComponent, TripVisualizerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'trip-tracker';
  trips: any[] = [];

  handleAddTrip(trip:any) {
    console.log(trip);
    
    this.trips = [...this.trips, trip];
  }
}
