// const { Sequelize } = require("sequelize");
const { Sequelize } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
  define: {
    schema: "myFavSchema",
  },
});

const Thing = sequelize.define("Thing", {}, { schema: undefined });

// console.log(Thing._schema); // myFavSchema
console.log(Thing.modelDefinition?.options.schema); // undefined
