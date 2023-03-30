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
    thingId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      comment: "An auto-incrementing number that uniquely identifies the row",
    },
  },
  {
    sequelize,
    tableName: "things",
    paranoid: true,
  }
);

const Thing2 = sequelize.define(
  "Thing2",
  {
    // don't need to explicitly define this, it comes from the association implicitly.

    // thingId: {
    //   type: DataTypes.BIGINT,
    // },
  },
  {
    sequelize,
    tableName: "thing_twos",
    paranoid: true,
  }
);

Thing.hasMany(Thing2, {
  foreignKey: {
    name: "thingId",
    // This is what's missing, uncomment to see the NOT NULL constraint appear on CREATE TABLE
    // allowNull: false,
  },
  onUpdate: "CASCADE",
  onDelete: "SET NULL",
});

Thing2.belongsTo(sequelize.models.Thing, {
  foreignKey: {
    name: "thingId",
    allowNull: false,
  },
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

(async () => {
  await sequelize.sync();
  await sequelize.drop();
  await sequelize.close();
})();
