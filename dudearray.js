const { Sequelize, Model, DataTypes, Op } = require("sequelize");
// const { Sequelize, Model, DataTypes, Op } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

class Business extends Model {}
Business.init(
  {
    column: DataTypes.ARRAY(DataTypes.STRING),
  },
  {
    sequelize,
    modelName: "businesses",
  }
);

(async () => {
  await sequelize.sync();

  // await Business.findAll({
  //   where: { column: { [Op.contains]: "string" } }, // this works
  // });

  Business.findAll({
    where: { column: { [Op.in]: "string" } }, // errors out
  });

  // Business.findAll({
  //   where: { column: { [Op.any]: "string" } }, // errors out
  // });

  await sequelize.close();
})();
