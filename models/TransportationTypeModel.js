const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'transportation_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(255)
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