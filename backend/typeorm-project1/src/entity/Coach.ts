import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import {Team} from './Team';

@Entity()
export class Coach {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    role: string

    @ManyToOne(()=>Team, (team)=>team.coaches, {
        cascade:true
    })
    team: Team
}
