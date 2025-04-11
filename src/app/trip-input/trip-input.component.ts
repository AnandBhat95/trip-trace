import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-trip-input',
  imports: [FormsModule],
  templateUrl: './trip-input.component.html',
  styleUrl: './trip-input.component.css'
})
export class TripInputComponent {
  start: string = '';
  end: string = '';
  @Output() addTrip = new EventEmitter();

  @ViewChild('startInput') startInputRef!: ElementRef;

  submitTrip() {
    if (this.start && this.end) {
      this.addTrip.emit({ start: this.start.toUpperCase(), end: this.end.toUpperCase() });
      this.start = '';
      this.end = '';
      setTimeout(() => this.startInputRef.nativeElement.focus(), 0);
    }
  }
}
