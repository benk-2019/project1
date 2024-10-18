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
  updateError1 = false;
  updateError2 = false;

  constructor(private httpService: HttpService){
    this.getAllCoaches();
  }

  teamList(){//only list teams that have coaches on them
    let teams: string[] = [];
    for(let coach of this.coaches){
      if((teams.indexOf(coach.teamname) === -1) && coach.teamname){
        teams.push(coach.teamname);
      }
    }
    this.teamNames = teams;
  }

  getAllCoaches(){//get all coaches
    this.httpService.getAllCoaches().subscribe(data=>{
      this.coaches = (data.body)?data.body:[];
      console.log(this.coaches);
      this.teamList();
    })
  }

  //handle error if happens, otherwise just console log result of update
  updateCoach(coach_change: Coach, index: number){//update coach
    this.updateError1 = false;
    this.updateError2 = false;
    this.coaches[index] = coach_change;
    this.httpService.updateCoach(coach_change).subscribe(data=>{
      console.log(data);
      this.getAllCoaches();
    }, error=>{
      console.error(error);
      if(error.status === 404){//not found
        this.updateError1 = true;
      }
      else if(error.status === 400){//name already exist in db
        this.updateError2 = true;
      }
    });
  }

  deleteCoach(index: number){//delete coach
    let coach: Coach = this.coaches[index];
    let coaches_new : Coach[] = [];
    for(let i = 0; i<this.coaches.length; i++){//can just remove coach locally, don't need to do extra get operation
      if(i !== index){
        coaches_new.push(this.coaches[i]);
      }
    }

    this.coaches=coaches_new;

    this.httpService.deleteCoach(coach).subscribe(data=>{
      console.log(data);
    })
  }

  resetCoach(){//just need to get all coaches to reset page, also reset error flags
    this.getAllCoaches();
    this.updateError1 = false;
    this.updateError2 = false;
  }
}
