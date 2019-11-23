import bcrypt from 'bcrypt';
import Authentication from '../../middlewares/authentication';

export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      credit_card: DataTypes.TEXT,
      address_1: DataTypes.STRING(100),
      address_2: DataTypes.STRING(100),
      city: DataTypes.STRING(100),
      region: DataTypes.STRING(100),
      postal_code: DataTypes.STRING(100),
      country: DataTypes.STRING(100),
      shipping_region_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      day_phone: DataTypes.STRING(100),
      eve_phone: DataTypes.STRING(100),
      mob_phone: DataTypes.STRING(100),
    },
    {
      underscored: true,
      tableName: 'customer',
      timestamps: false,
    }
  );

  Customer.beforeCreate(async customer => {
    // eslint-disable-next-line no-param-reassign
    customer.password = await customer.generatePasswordHash();
  });

  Customer.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = 10;
    return bcrypt.hash(this.password, saltRounds);
  };

  Customer.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  Customer.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };

  Customer.prototype.generateToken = function generateToken() {
    return Authentication.generateToken(this.customer_id);
  };

  Customer.prototype.updateAddress = async function updateAddress(address) {
    const {
      address_1,
      address_2,
      city,
      region,
      postal_code,
      country,
      shipping_region_id,
    } = address;
    this.address_1 = address_1 || this.address_1;
    this.address_2 = address_2 || this.address_2;
    this.city = city || this.city;
    this.region = region || this.region;
    this.postal_code = postal_code || this.postal_code;
    this.country = country || this.country;
    this.shipping_region_id = parseInt(shipping_region_id, 10) || this.shipping_region_id;
    await this.save();
    await this.reload();
    return this;
  };

  Customer.associate = ({ Order }) => {
    // associations can be defined here
    Customer.hasMany(Order, {
      foreignKey: 'customer_id',
    });
  };
  return Customer;
};
