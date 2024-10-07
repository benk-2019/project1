export class Coach {
    id: number
    firstName: string
    lastName: string
    age: number
    role: string
    teamName: string
    
    constructor(id:number, firstName:string, lastName:string, age:number, role:string, teamName:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.role = role;
        this.teamName = teamName;
    }
}
