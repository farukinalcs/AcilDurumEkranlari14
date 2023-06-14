import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-notsafepeople',
  templateUrl: './notsafepeople.component.html',
  styleUrls: ['./notsafepeople.component.scss']
})
export class NotsafepeopleComponent implements OnInit {

  constructor(private store: Store) { }
  @Output() myevent: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    
  }
  
  notSafe(){
    this.store.dispatch({type:"[State] getState"})
    this.myevent.emit("not")
  }
}
