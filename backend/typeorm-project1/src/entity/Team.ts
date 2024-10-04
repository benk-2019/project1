import { Entity, ObjectIdColumn, ObjectId, Column, OneToMany } from "typeorm"
import {Player} from './Player'

@Entity()
export class Team {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    teamName: string

    @Column()
    numPlayers: number

    @OneToMany(()=>Player, (player)=>player.team)
    players: Player[]
}
