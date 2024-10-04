import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne } from "typeorm"
import {Team} from './Team';

@Entity()
export class Player {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @ManyToOne(()=>Team, (team)=>team.players)
    team: Team
}
