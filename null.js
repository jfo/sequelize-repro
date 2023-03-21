const { Sequelize, Model, DataTypes } = require("sequelize");
// const { Sequelize, Model, DataTypes } = require("@sequelize/core");

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
  },
  {
    sequelize,
    tableName: "things",
  }
);

(async () => {
  await sequelize.sync();
  const x = await Thing.create({
    blah: '\x00dsf'
  });
  await Thing.drop();
  await sequelize.close();
})();
