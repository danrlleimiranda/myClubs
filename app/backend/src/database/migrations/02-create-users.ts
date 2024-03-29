import { QueryInterface, DataTypes, Model } from "sequelize"
import IUser from "../../Interfaces/IUser"

export default {
    up(queryInterface: QueryInterface){
       return queryInterface.createTable<Model<IUser>>('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
              },
              username: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              role: {
                type: DataTypes.STRING,
                allowNull: false,
              },
              email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
              },
              password: {
                type: DataTypes.STRING,
                allowNull: false },
            
        })
    }, 
    down(queryInterface: QueryInterface){
      return  queryInterface.dropTable('users')
    }
}