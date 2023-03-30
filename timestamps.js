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
  {},
  {
    sequelize,
    tableName: "things",
  }
);

(async () => {
  await sequelize.sync();
  await Thing.create();
  await Thing.drop();
  await sequelize.close();
})();
