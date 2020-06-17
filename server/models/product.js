'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Nama barang tidak boleh kosong!',
          },
        },
      },
      image_url: DataTypes.STRING,
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          isInt: true,
          isNumeric: true,
          min: 1,
          notEmpty: {
            msg: 'Harga barang tidak boleh dikosongi!',
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          notNull: true,
          isInt: true,
          min: 1,
          notEmpty: {
            msg: 'Stock barang tidak boleh kosong!',
          },
        },
      },
    },
    { sequelize }
  );
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User);
  };
  return Product;
};

