const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const Model = sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_subscription_categoryid: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING(255)
        },
        balance: {
            type: Sequelize.INTEGER
        },
        username: {
            type: Sequelize.STRING(255)
        },
        password: {
            type: Sequelize.TEXT
        },
        token: {
            type: Sequelize.TEXT
        },
        address: {
            type: Sequelize.TEXT
        },
        ktp_number: {
            type: Sequelize.TEXT
        },
        phone: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.TEXT
        },
        photo_profile: {
            type: Sequelize.TEXT
        },
        is_verify: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
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