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
    token: DataTypes.STRING(64),
  },
  {
    sequelize,
    tableName: "things",
    indexes: [
      {
        fields: ["token"],
        unique: true,
      },
    ],
  }
);

(async () => {
  await sequelize.sync();
  // await sequelize.drop();
  await sequelize.close();
})();
