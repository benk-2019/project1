import "reflect-metadata"
import { DataSource } from "typeorm"
import { Player } from "./entity/Player"
import {Team} from './entity/Team'

require('dotenv').config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: `mongodb+srv://${process.env.USER}:${process.env.USER_PASSWORD}@cluster0.lalky.mongodb.net/Hockey?retryWrites=true&w=majority&appName=Cluster0`,
    synchronize: true,
    logging: false,
    entities: [Player, Team],
})
