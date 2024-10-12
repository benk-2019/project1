export class Coach {
    id: number
    firstName: string
    lastName: string
    age: number
    role: string
    teamId: number
    teamname: string
    
    constructor(id:number, firstName:string, lastName:string, age:number, role:string, teamId: number, teamname:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.role = role;
        this.teamId = teamId;
        this.teamname = teamname;
    }
}
