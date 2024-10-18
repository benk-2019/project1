import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Team } from '../models/team';
import { TeamCoachPlayer } from '../models/team-coach-player';
import { Player } from '../models/player';
import { HttpService } from '../services/http.service';
import { Coach } from '../models/coach';
import { AddCoachComponent } from '../add-coach/add-coach.component';
import { AddPlayerComponent } from '../add-player/add-player.component';
import { RmCoachComponent } from '../rm-coach/rm-coach.component';
import { RmPlayerComponent } from '../rm-player/rm-player.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-team',
  standalone: true,
  imports: [FormsModule, AddCoachComponent, AddPlayerComponent, 
            RmCoachComponent, RmPlayerComponent],
  templateUrl: './new-team.component.html',
  styleUrl: './new-team.component.css'
})
export class NewTeamComponent {
  team : TeamCoachPlayer = new TeamCoachPlayer(0,'', 0, '', [], []);
  unassignedPlayers: Player[] = [];
  unassignedCoaches: Coach[] = [];
  createError: boolean = false;

  constructor(private httpService: HttpService, private router: Router){
    this.getUnassignedPlayers();
    this.getUnassignedCoaches();
  }

  getUnassignedPlayers(){//want to be able to select any currently unassigned players during team creation
    this.httpService.getUnassingedPlayers().subscribe(data=>{
      this.unassignedPlayers = (data.body)?data.body:[];
    });
  }

  getUnassignedCoaches(){//want to be able to select any currently unassigned coaches during team creation
    this.httpService.getUnassingedCoaches().subscribe(data=>{
      this.unassignedCoaches = (data.body)?data.body:[];
    })
  }


  addPlayer(index:number){//add player locally
    this.team.players.push(this.unassignedPlayers[index]);
    let temp_players: Player[] = [];
    for(let i = 0; i < this.unassignedPlayers.length; i++){
      if(i !== index){
        temp_players.push(this.unassignedPlayers[i]);
      }
    }
    this.unassignedPlayers = temp_players;
    this.team.numPlayers = this.team.numPlayers + 1;
  }

  addCoach(index:number){//add coach locally and decide if it has to be head or the user can select which coach to be made ehad
    if(this.team.headCoach === ''){
      this.team.headCoach = this.unassignedCoaches[index].firstName + " " + this.unassignedCoaches[index].lastName;
      this.unassignedCoaches[index].role = "Head";
    }
    else{
      this.unassignedCoaches[index].role = "Assistant";
    }
    this.team.coaches.push(this.unassignedCoaches[index]);
    let temp_coaches: Coach[] = [];
    for(let i = 0; i < this.unassignedCoaches.length; i++){
      if(i !== index){
        temp_coaches.push(this.unassignedCoaches[i]);
      }
    }
    this.unassignedCoaches = temp_coaches;
  }

  rmPlayer(index:number){//remove player from selected(locally)
    this.unassignedPlayers.push(this.team.players[index]);
    let temp_players: Player[] = [];
    for(let i = 0; i < this.team.players.length; i++){
      if(i !== index){
        temp_players.push(this.team.players[i]);
      }
    }
    this.team.players = temp_players;
    this.team.numPlayers = this.team.numPlayers - 1;
  }

  rmCoach(index:number){//remove player from selected(locally)
    let flag = false;
    if(this.team.headCoach === (this.team.coaches[index].firstName + " " + this.team.coaches[index].lastName)){
      this.team.headCoach = '';
      this.team.coaches[index].role = '';
    }
    else{
      this.team.coaches[index].role = '';
    }
    this.unassignedCoaches.push(this.team.coaches[index]);
    let temp_coaches: Coach[] = [];
    for(let i = 0; i < this.team.coaches.length; i++){
      if(i !== index){
        temp_coaches.push(this.team.coaches[i]);
      }
    }
    this.team.coaches = temp_coaches;
  }

  createTeam(){//create team, handle error if we try create team with same name as existing team
    this.createError = false;
    this.httpService.createTeam(this.team).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/teams']);
    }, error=>{
      if(error.status === 400){
        this.createError = true;
      }
    });
  }

  resetPage(){//get unassigned players/coaches reset team variable and any error flags to reset page
    this.team = new TeamCoachPlayer(0,'', 0, '', [], []);
    this.getUnassignedPlayers();
    this.getUnassignedCoaches();
    this.createError = false;
  }
}
