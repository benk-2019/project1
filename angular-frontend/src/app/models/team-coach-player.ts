import { Coach } from "./coach"
import { Player } from "./player"

export class TeamCoachPlayer {
    id: number//use as primmary key here 
    teamName: string//foreign key to other tables
    numPlayers: number
    headCoach: string
    players: Player[]
    coaches: Coach[]
    
    constructor(id:number, teamName:string, numPlayers:number, headCoach:string, players: Player[], coaches: Coach[]){
        this.id = id;
        this.teamName = teamName;
        this.numPlayers = numPlayers;
        this.headCoach = headCoach;
        this.players = players;
        this.coaches = coaches;
    }
}
