'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class spp extends Model {
        static associate(models) {
            this.hasMany(models.siswa, {
                foreignKey: "id_spp",
                as: "spp"
            })
        }
    };
    spp.init({
        id_spp: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        angkatan: DataTypes.INTEGER,
        tahun: DataTypes.INTEGER,
        nominal: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'spp',
        tableName: 'spp'
    });
    return spp;
};