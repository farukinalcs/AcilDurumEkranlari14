import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-safepeople',
  templateUrl: './safepeople.component.html',
  styleUrls: ['./safepeople.component.scss']
})
export class SafepeopleComponent implements OnInit {

  constructor(private store : Store) { }
  @Output() myevent: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {

  }

  safe(){
      this.store.dispatch({type:"[State] getState"})
      this.myevent.emit("safe")
  }

}
