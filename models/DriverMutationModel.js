const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'driver_mutation', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ngojekid: {
            type: Sequelize.INTEGER
        },
        userid: {
            type: Sequelize.INTEGER
        },
        driverid: {
            type: Sequelize.INTEGER
        },
        credit: {
            type: Sequelize.INTEGER
        },
        debit: {
            type: Sequelize.INTEGER
        },
        balance: {
            type: Sequelize.INTEGER
        },
        payment_type: {
            type: Sequelize.TEXT
        },
        createdAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatedAt: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: process.env.TIMESTAMPS, // true = ketambahan 2 kolom create_at & update_at (AUTO) klo false tidak ketambahan
        freezeTableName: true // true = nama table asli , false = nama table ketambahan 's' diakhir
    }
);

module.exports = Model;