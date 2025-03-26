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
    date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          msg: 'Date cannot be empty'
        },
        notNull: {
          msg: 'Date cannot be empty'
        }
      }
    },
    time: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Time cannot be empty'
        },
        notNull: {
          msg: 'Time cannot be empty'
        }
      }
    },
    status: {
      type: DataTypes.ENUM([
        'pending_payment',
        'confirmed',
        'completed',
        'cancelled'
      ]),
      defaultValue: 'pending_payment'
    },
    symptoms: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Symptoms cannot be empty'
        },
        notNull: {
          msg: 'Symptoms cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Appointment',
    hook: {
      beforeCreate(instance){
        instance.status = 'pending_payment'
      }
    }
  });
  return Appointment;
};