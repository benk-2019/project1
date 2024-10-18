import { Component } from '@angular/core';
import { Coach } from '../models/coach';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { TeamListService } from '../services/team-list.service';
import { TeamSimple } from '../models/team-simple';
import { Router } from '@angular/router';

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
  roleSelect:boolean = false;
  errorCreate:boolean = false;

  constructor(private httpService: HttpService, private teamListService:TeamListService, private router: Router){
    this.teamListService.teamList.subscribe(data=>{//get list of teams
      this.teamList = data;
    });
    this.getAllCoaches();
  }

  getAllCoaches(){
    this.httpService.getAllCoaches().subscribe(data=>{
      this.existing_coaches = (data.body)?data.body:[];
      console.log(this.existing_coaches);
    });
  }

  createCoach(){//find team id, then create coach in back end, handle error if coach with same name already exists
    this.errorCreate = false;
    for(let team of this.teamList){
      if(this.new_coach.teamname === team.teamName){
        this.new_coach.teamId = team.id;
      }
    }
    this.httpService.createCoach(this.new_coach).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/coaches']);
    }, error=>{
      console.error(error);
      if(error.status === 400){
        this.errorCreate = true;
      }
    });
  }

  headCheck(){//decide what user is allowed to select in terms of coaches role
    if(this.new_coach.teamname){//if have team selected
      //if find head, then admin can choose role else has to be assigned head
      let flag = false;
      for(let coach of this.existing_coaches){
        if((coach.teamname === this.new_coach.teamname) && (coach.role === 'Head')){
          flag = true;
          break;
        }
      }

      //force head or allow selection
      if(!flag){
        this.new_coach.role = 'Head';
        this.roleSelect = false;
      }
      else{
        this.roleSelect=true;
      }
    }
    else{//if no team selected new coach shouldn't have a role or be able to choose one
      this.new_coach.role = '';
      this.roleSelect = false;
    }
  }

  resetPage(){//just reset coach and error flags to reset page
    this.new_coach = new Coach(0, '', '', 0, '', 0, '');
    this.errorCreate = false;
  }
}
