import { Entity, ObjectIdColumn, ObjectId, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import {Player} from './Player'
import { Coach } from "./Coach"

@Entity()
export class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    teamName: string

    @Column()
    numPlayers: number

    @Column({nullable:true})
    headCoach: string

    @OneToMany(()=>Player, (player)=>player.team)
    players: Player[]

    @OneToMany(()=>Coach, (coach)=>coach.team)
    coaches: Coach[]
}
