const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'user_subscription_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: Sequelize.INTEGER,
        },
        dropoffAt: {
            type: Sequelize.STRING(10)
        },
        pickupAt: {
            type: Sequelize.STRING(10)
        },
        dropoff_address: {
            type: Sequelize.TEXT
        },
        dropoff_point: {
            type: Sequelize.TEXT
        },
        pickup_address: {
            type: Sequelize.TEXT
        },
        pickup_point: {
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