import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TeamListService } from './services/team-list.service';
import { HttpService } from './services/http.service';
import { TeamCoachPlayer } from './models/team-coach-player';
import { TeamSimple } from './models/team-simple';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend';

  teams: TeamCoachPlayer[] = [];

  constructor(private teamListService:TeamListService, private httpService: HttpService){
    this.getAllTeams();
  }

  getAllTeams(){
    this.httpService.getAllTeams().subscribe(data=>{
      let temp_team: TeamCoachPlayer[] = [];
      temp_team = (data.body)?data.body:[];
      this.teams = temp_team;
      this.setTeamList();
    })
  };


  setTeamList(){
    let temp_tList: TeamSimple[] = []
    for(let team of this.teams){
      if(temp_tList.indexOf({id:team.id,teamName:team.teamName}) === -1){
        temp_tList.push({id:team.id,teamName:team.teamName});
      }
    }
    this.teamListService.setTeamList(temp_tList);
  }

  
}
