import {sequelize} from '../../common/config/database.js'
import { DataTypes, DATE } from 'sequelize'
let statusTypes = [ "pending" , "in Progress" , "completed"]
let prioritytypes= ["low", "medium", "high"]
export const Task = sequelize.define('task',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING(150),
        allowNull: false,
        validate:{notEmpty:true}
    },description:{
        type: DataTypes.TEXT
    },status:{
        type: DataTypes.ENUM(...statusTypes)
    },
    priority:{
        type: DataTypes.ENUM(...prioritytypes)
    },dueDate:{
        type: DataTypes.DATE,
    },
    implementorId:{
        type: DataTypes.INTEGER,
        allowNull:true
    },
    creatorId:{
        type: DataTypes.INTEGER,
        allowNull: true 
    }
    ,categoryId:{
        type: DataTypes.INTEGER,
        allowNull:true
    }
},{timestamps:true})