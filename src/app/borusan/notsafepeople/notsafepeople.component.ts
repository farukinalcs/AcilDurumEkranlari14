import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BorusanService } from '../borusan.service';

@Component({
  selector: 'app-notsafepeople',
  templateUrl: './notsafepeople.component.html',
  styleUrls: ['./notsafepeople.component.scss']
})
export class NotsafepeopleComponent implements OnInit {

  constructor(private store: Store,
    private borusan : BorusanService) { }
  @Output() myevent: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    
  }
  
  notSafe(){
    this.store.dispatch({type:"[State] getState"})
    this.myevent.emit("not")
    this.borusan.statusSubject.next(2)
  }
}
