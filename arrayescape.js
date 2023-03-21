// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes, Op } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

(async () => {
  await sequelize.sync();

  const x = await sequelize.query("select 1 where 'hey' = $1 and 'blah' = ANY(ARRAY[$2] ) and $3 = 'here'", {
    bind: ['hey', 'blah', "here"],
  });

  console.log(x);

  await sequelize.close();
})();
