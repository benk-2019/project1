import { Component } from '@angular/core';
import { Team } from '../models/team';
import { TeamComponent } from '../team/team.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teams: Team[] = [
    new Team(1, 'Hawks', 0, '', [],["Not Player Coach"]),
    new Team(2, 'Badgers', 0, '', [],[]),
    new Team(3, 'Bulldogs', 0, '', [],[])
  ]

  updateTeam(index:number, team:Team){
    this.teams[index] = team;
  }
}
