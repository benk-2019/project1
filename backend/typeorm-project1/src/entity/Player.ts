import { Entity, ObjectIdColumn, ObjectId, Column, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import {Team} from './Team';

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    position: string

    @ManyToOne(()=>Team, (team)=>team.players, {
        cascade:true
    })
    team: Team
}
