import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() starID!: number;
  @Input() rating!: number;

  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onStarEnter() {
    this.starEnter.emit(this.starID);
  }

  onStarLeave() {
    this.starLeave.emit();
  }

  starred() {
    console.log(this.starID);
    this.starClicked.emit(this.starID);
  }
}
