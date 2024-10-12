import { Team } from "./team"

export class Player {
    id: number
    firstName: string
    lastName: string
    age: number
    position: string
    teamId: number
    teamname: string
    
    constructor(id:number, firstName:string, lastName:string, age:number, position:string, teamId: number, teamname:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.position = position;
        this.teamId = teamId;
        this.teamname = teamname;
    }
}
