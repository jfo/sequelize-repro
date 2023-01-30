const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'main',
  username: 'postgres',
  password: 'postgres',
  port: 5433
});

class Thing extends Model {}
Thing.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "things" }
);

class ShardedThing extends Model {}
ShardedThing.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "sharded_things" }
);

(async () => {
  await sequelize.sync();
})();
