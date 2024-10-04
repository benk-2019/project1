import { AppDataSource } from "./data-source"
import { Player } from "./entity/Player"
import { Team } from "./entity/Team"

AppDataSource.initialize().then(async () => {
    // const team = new Team()

    // team.numPlayers = 1;
    // team.teamName = "Black Hawks"
    // await AppDataSource.manager.save(team);
    const teams = await AppDataSource.manager.find(Team)
    console.log("Loaded Teams: ", teams)


    // console.log("Inserting a new player into the database...")
    // const player = new Player()
    // player.firstName = "Timber"
    // player.lastName = "Saw"
    // player.age = 25
    // player.team = teams[0]
    // await AppDataSource.manager.save(player)
    // console.log("Saved a new player with id: " + player.id)

    console.log("Loading players from the database...")
    const players = await AppDataSource.manager.find(Player)
    console.log("Loaded players: ", players[0].team)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
