import { Task } from "../../modules/tasks/task.model.js";
import { User } from "../../modules/users/user.model.js";
import { Category } from '../../modules/categories/category.model.js' 
export const association = ()=>{
    User.hasMany(Task,{foreignKey:'creatorId',
        as:'taskCreator'
        ,onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'
    });
    User.hasMany(Task,{foreignKey:'implementorId',
        as:'taskImplementer',
        onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'
    });
    Task.belongsTo(User,{foreignKey:'creatorId' ,
        as:'taskCreator'
        ,onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'
    });
    Task.belongsTo(User,{foreignKey:'implementorId'
        ,as:'implementor'
        ,onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'
    });
    Category.hasMany(Task,{foreignKey:'categoryId'        
        ,onDelete: 'SET NULL'
        ,onUpdate: 'CASCADE'})
    Task.belongsTo(Category,{foreignKey:'categoryId'
        ,onDelete: 'SET NULL'
        ,onUpdate: 'CASCADE'})
    User.hasMany(Category,{foreignKey:'userId'        
        ,onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'})
    Category.belongsTo(User,{foreignKey:'userId'        
        ,onDelete: 'CASCADE'
        ,onUpdate: 'CASCADE'})
}
