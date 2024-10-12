import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';

@Component({
  selector: 'app-new-coach',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-coach.component.html',
  styleUrl: './new-coach.component.css'
})
export class NewCoachComponent {
  new_coach: Coach = new Coach(0, '', '', 0, '', 0, '');
  existing_coaches: Coach[] = [];
  teamList: TeamSimple[] = [];

  constructor(private httpService: HttpService, private teamListService:TeamListService){
    this.teamListService.teamList.subscribe(data=>{
      this.teamList = data;
    });
  }

  getAllCoaches(){
    this.httpService.getAllCoaches().subscribe(data=>{
      this.existing_coaches = (data.body)?data.body:[];
      console.log(this.existing_coaches);
    });
  }

  createCoach(){
    for(let team of this.teamList){
      if(this.new_coach.teamname === team.teamName){
        this.new_coach.teamId = team.id;
      }
    }
    console.log(this.new_coach)
    this.httpService.createCoach(this.new_coach).subscribe(data=>{
      console.log(data);
    });
  }
}
