'use strict';
const {
  Model
} = require('sequelize');
const { hashingPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Doctor, {
        through: models.Appointment,
        foreignKey: 'patientId'
      })
    }

    static async fungsi(){
      try {
        await User.create()
      } catch (error) {
        
      }
    }

  }
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required'
        },
        notNull: {
          msg: 'Name is required'
        }
      }
    },
    email: {
      allowNull: false,
      unique: {
        msg: 'Email must be unique'
      },
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Email format not valid'
        }
      }
    },
    phone: DataTypes.INTEGER,
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        notNull: {
          msg: 'Password is required'
        },
        len: {
          msg: 'Password at least 8 characters',
          args: true
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance){
        const newPass = hashingPassword(instance.password)
        instance.password = newPass
      }
    }
  });
  return User;
};