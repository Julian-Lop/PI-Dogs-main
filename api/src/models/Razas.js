const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Razas', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    Altura: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Peso: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
};