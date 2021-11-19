'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class kelas extends Model {
        static associate(models) {
            this.hasMany(models.siswa, {
                foreignKey: "id_kelas",
                as: "kelas"
            })
        }
    };
    kelas.init({
        id_kelas: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nama_kelas: DataTypes.STRING,
        jurusan: DataTypes.STRING,
        angkatan: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'kelas',
        tableName: 'kelas'
    });
    return kelas;
};