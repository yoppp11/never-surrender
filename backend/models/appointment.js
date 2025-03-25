'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User, {foreignKey: 'patientId'})
      Appointment.belongsTo(models.Doctor, {foreignKey: 'doctorId'})
    }
  }
  Appointment.init({
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    doctorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Doctors',
        key: 'id'
      }
    },
    date: DataTypes.DATE,
    time: DataTypes.STRING,
    status: DataTypes.ENUM(
      'pending_payment',
      'confirmed',
      'completed',
      'cancelled'
      ),
    symptoms: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};