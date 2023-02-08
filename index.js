const { Sequelize, Model, DataTypes } = require("sequelize");
// const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

class Thing extends Model {}
Thing.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "things" }
);

(async () => {
  await sequelize.sync();
  await Thing.drop();
  await sequelize.close();
})();
