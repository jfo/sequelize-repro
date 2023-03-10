// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

const Thing = sequelize.define(
  "Thing",
  {
    thingKey: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    blah: {
      type: DataTypes.STRING,
    },
    arrayOfStrings: {
      type: DataTypes.ARRAY(DataTypes.STRING(128)),
    },
  },
  {
    sequelize,
    tableName: "things",

    defaultScope: {},

    scopes: {
      everything: {},
    },
  }
);

(async () => {
  await sequelize.sync();
  await Thing.create();
  const x = await Thing.withScope('everything').findAll();
  console.log(x)
  await Thing.drop();
  await sequelize.close();
})();
