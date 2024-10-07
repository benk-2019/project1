import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { CoachComponent } from '../coach/coach.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CoachComponent, FormsModule],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css'
})
export class CoachesComponent {
  coaches: Coach[] = [
    new Coach(1, 'Jim', 'Coacherson', 49, 'none', ''),
    new Coach(2, 'Lenny', 'Gibson', 53, 'none', 'Jets'),
    new Coach(3, 'Carl', 'Poppers', 36, 'none', ''),
    new Coach(4, 'Terrance', 'Kankle', 40, 'none', '')
  ];

  teamSelected: string = '';
  teamNames: string[] = [];

  teamList(){
    let teams: string[] = [];
    for(let coach of this.coaches){
      if(teams.indexOf(coach.teamName) === -1){
        teams.push(coach.teamName);
      }
    }
    this.teamNames = teams;
  }

  updateCoach(coach_change: Coach, index: number){
    this.coaches[index] = coach_change;
  }

  deleteCoach(index: number){
    console.log("Delete " + index);
    let coaches_new : Coach[] = [];
    for(let i = 0; i<this.coaches.length; i++){
      if(i !== index){
        coaches_new.push(this.coaches[i]);
      }
    }

    this.coaches=coaches_new;
  }
}
