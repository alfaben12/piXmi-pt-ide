const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'admin', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleid: {
            type: Sequelize.INTEGER
        },
        shelterid: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(10)
        },
        address: {
            type: Sequelize.TEXT
        },
        phone: {
            type: Sequelize.STRING(50)
        },
        username: {
            type: Sequelize.STRING(50)
        },
        password: {
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