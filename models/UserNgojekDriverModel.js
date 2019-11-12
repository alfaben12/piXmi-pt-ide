const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'user_mutation', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userid: {
            type: Sequelize.INTEGER
        },
        driverid: {
            type: Sequelize.INTEGER
        },
        transaction_number: {
            type: Sequelize.TEXT
        },
        pickup_address:{
            type: Sequelize.TEXT
        },
        pickup_point:{
            type: Sequelize.TEXT
        },
        destination_address:{
            type: Sequelize.TEXT
        },
        destination_point:{
            type: Sequelize.TEXT
        },
        distance: {
            type: Sequelize.DOUBLE
        },
        total: {
            type: Sequelize.DOUBLE
        },
        destination_point:{
            type: Sequelize.STRING(50)
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