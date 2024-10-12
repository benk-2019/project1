import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { CoachComponent } from '../coach/coach.component';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coaches',
  standalone: true,
  imports: [CoachComponent, FormsModule, RouterLink],
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.css'
})
export class CoachesComponent {
  coaches: Coach[] =[];

  teamSelected: string = '';
  teamNames: string[] = [];

  constructor(private httpService: HttpService){
    this.getAllCoaches();
  }

  teamList(){
    let teams: string[] = [];
    for(let coach of this.coaches){
      if(teams.indexOf(coach.teamname) === -1){
        teams.push(coach.teamname);
      }
    }
    this.teamNames = teams;
  }

  getAllCoaches(){
    this.httpService.getAllCoaches().subscribe(data=>{
      this.coaches = (data.body)?data.body:[];
      console.log(this.coaches);
      this.teamList();
    })
  }

  updateCoach(coach_change: Coach, index: number){
    this.coaches[index] = coach_change;
  }

  deleteCoach(id: number, index: number){
    console.log("Delete " + index);
    let coaches_new : Coach[] = [];
    for(let i = 0; i<this.coaches.length; i++){
      if(i !== index){
        coaches_new.push(this.coaches[i]);
      }
    }

    this.coaches=coaches_new;

    this.httpService.deleteCoach(id).subscribe(data=>{
      console.log(data);
    })
  }
}
