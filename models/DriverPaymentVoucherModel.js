const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'driver_payment_voucher', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherid: {
            type: Sequelize.INTEGER
        },
        payment_number: {
            type: Sequelize.TEXT
        },
        point_destination: {
            type: Sequelize.TEXT
        },
        point_pickup: {
            type: Sequelize.TEXT
        },
        address_destination: {
            type: Sequelize.TEXT
        },
        driverid: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.INTEGER
        },
        distance: {
            type: Sequelize.DOUBLE
        },
        status: {
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