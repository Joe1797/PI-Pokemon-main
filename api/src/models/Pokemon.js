const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 20]
      }
    },
    hp:{ 
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    attack:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    defense:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    speed:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    height:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 1000
      }
    },
    image:{
      type: DataTypes.STRING
    },
    origin:{
      type: DataTypes.STRING
    }
  },{
    timestamps:false
  })
};
