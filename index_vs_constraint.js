const path = require("path");
const { pgCommand } = require("./util.js");
const { Sequelize, Model, DataTypes } = require("sequelize");
// const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const db = {
  host: "localhost",
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
}
const sequelize = new Sequelize(db);

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

  await pgCommand(db, 'pg_dump', `--schema-only > ${path.join('/tmp', 'schema_before.sql')}`);

  await sequelize.drop();
  await sequelize.close();
})();
