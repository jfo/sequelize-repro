// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

// class IMPRECISE_DECIMAL extends DataTypes.DECIMAL {
//   parseDatabaseValue(value) {
//     return parseFloat(value);
//   }
// }
// DataTypes.IMPRECISE_DECIMAL = IMPRECISE_DECIMAL;

Sequelize.DataTypes.DECIMAL.parseDatabaseValue = parseFloat;
class Thing extends Model {}
Thing.init(
  {
    blah: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "things",
  }
);

// const parseImpreciseDecimal = DataTypes.getDataTypeParser(dialect, BaseTypes.IMPRECISE_DECIMAL);
// const parseImpreciseDecimal = parseFloat

console.log(sequelize.dialect);
sequelize.dialect.registerDataTypeParser(["numeric"], parseFloat);

(async () => {
  // await sequelize.sync();
  // const thing = await Thing.create({ blah: 0.123 });
  // console.log(thing);
  // await Thing.drop();
  const x = await sequelize.query(`SELECT sum(3.5 * 2.1) / sum(2.3) AS mean`);

  console.log(x);

  await this.business.sequelize.query(
    `SELECT * FROM business_profile WHERE 1 = ANY(ARRAY[1,2,3])`
  );

})();
