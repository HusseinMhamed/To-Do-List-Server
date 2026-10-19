import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    host:'localhost',
    username:'root',
    dialect:'mysql',
    port:3307,
    database:'todo_list',
    logging:false
})

export const connection =async ()=>{
    try{
       await sequelize.authenticate()
       await sequelize.sync()
       console.log("connected to database successfully")
    }catch(err){
        console.log("database Error:" , err )
    }
}
