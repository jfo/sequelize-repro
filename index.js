const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "postgres://postgres:postgres@127.0.0.1:5433/main"
);

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
