export class Team {
    id: number//use as primmary key here 
    teamName: string//foreign key to other tables
    numPlayers: number
    headCoach: string
    
    constructor(id:number, teamName:string, numPlayers:number, headCoach:string, players:string[], coaches:string[]){
        this.id = id;
        this.teamName = teamName;
        this.numPlayers = numPlayers;
        this.headCoach = headCoach;
    }
}
