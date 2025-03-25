'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Doctor.belongsToMany(models.User, {
        through: models.Appointment,
        foreignKey: 'doctorId'
      })
    }
  }
  Doctor.init({
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    schedule: DataTypes.JSONB,
    fee: DataTypes.INTEGER,
    photoUrl: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};