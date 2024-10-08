export class Team {
    id: number//use as primmary key here 
    teamName: string//foreign key to other tables
    numPlayers: number
    headCoach: string
    players: number[]
    coaches: number[]
    
    constructor(id:number, teamName:string, numPlayers:number, headCoach:string, players: number[], coaches: number[]){
        this.id = id;
        this.teamName = teamName;
        this.numPlayers = numPlayers;
        this.headCoach = headCoach;
        this.players = players;
        this.coaches = coaches;
    }
}
