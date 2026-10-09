import { sequelize } from "../../common/config/database.js";
import { DataTypes } from "sequelize";
import { User } from "../users/user.model.js";
export const Category = sequelize.define('category',{
    id:{
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type: DataTypes.STRING(80),
        allowNull:false,
        validate:{notEmpty:true,len:[3,30]}
    },description:{
        type: DataTypes.TEXT,
    },userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{notEmpty:true},
        // references:{
        //     model:User,
        //     key:'id'
        // }
        // we used association instead of it
    },
},{
    timestamps:true
})