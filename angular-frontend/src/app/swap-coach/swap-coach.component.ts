import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { HttpService } from '../services/http.service';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';

@Component({
  selector: 'app-swap-coach',
  standalone: true,
  imports: [],
  templateUrl: './swap-coach.component.html',
  styleUrl: './swap-coach.component.css'
})
export class SwapCoachComponent {
  coach1: Coach = new Coach(0, '', '', 0, '', 0, '');
  teamList: TeamSimple[] = [];


  constructor(private httpService:HttpService, private teamListService:TeamListService){
    this.teamListService.teamList.subscribe(data=>{
      this.teamList = data;
    });
  }

  changeTeam(){
    this.httpService.updateCoach(this.coach1).subscribe(data=>{
      console.log(data);
    });
  }
}
