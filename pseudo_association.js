// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

const MainThing = sequelize.define(
  "MainThing",
  {
    mainThingKey: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "main_things" }
);

const SecondaryThing = sequelize.define(
  "SecondaryThing",
  {
    mainThingKey: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "secondary_things" }
);

const AncillaryThing = sequelize.define(
  "AncillaryThing",
  {
    name: DataTypes.STRING,
    mainThingKey: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "answer_topics" }
);

MainThing.hasMany(AncillaryThing, { foreignKey: "mainThingKey", as: "topics" });
AncillaryThing.belongsTo(MainThing, {
  foreignKey: {
    name: "mainThingKey",
    allowNull: false,
    onDelete: "cascade",
  },
  as: "answer",
});
SecondaryThing.hasMany(AncillaryThing, { foreignKey: "mainThingKey" });

(async () => {
  await sequelize.sync();
  await sequelize.close();
})();
