import {sequelize} from '../../common/config/database.js'
import { DataTypes } from 'sequelize'
export const User = sequelize.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        unique:true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{notEmpty:true}
    },
    email:{
        type: DataTypes.STRING(150),
        unique:true,
        validate:{isEmail:true,isLowercase:true}
    },
    password:{
        type: DataTypes.STRING(255)
    }
},{
timestamps:true
})