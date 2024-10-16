import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coach } from '../models/coach';

//just simple list of coach details, and emit event to include coach in selected
@Component({
  selector: 'app-add-coach',
  standalone: true,
  imports: [],
  templateUrl: './add-coach.component.html',
  styleUrl: './add-coach.component.css'
})
export class AddCoachComponent {
  @Input() coach:Coach = new Coach(0,'','',0,'', 0, '');
  
  @Output() addCoachEvent = new EventEmitter<void>();
  
  addCoach(){
    this.addCoachEvent.emit();
  }
}
