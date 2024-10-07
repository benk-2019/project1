export class Player {
    id: number
    firstName: string
    lastName: string
    age: number
    position: string
    teamName: string
    
    constructor(id:number, firstName:string, lastName:string, age:number, position:string, teamName:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.position = position;
        this.teamName = teamName;
    }
}
