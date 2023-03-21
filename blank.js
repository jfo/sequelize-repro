// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");

sequelize.dialect.registerDataTypeParser(['timestamptz', 'timestamp'], (value) => {
    return new Date(value);
});

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

const fn = async () => {
  await sequelize.sync();

  const x = (await sequelize.query(`select '2012-10-01'::timestamptz;`, {
    type: 'select'
  }));

  console.log(x);

  await sequelize.close();
  return;
};

fn();
