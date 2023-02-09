// const { Sequelize, Model, DataTypes } = require("sequelize");
const { Sequelize, Model, DataTypes } = require("@sequelize/core");
//

const cls = require("cls-hooked");

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

class Thing extends Model {
  static async helperIMade() {
    await Thing.findOne({
      where: {
        name: 'dsfjio'
      }
    })
  }
}

Thing.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "things",
    validate: {
      async callMePls() {
        await Thing.helperIMade()
        console.log('made it here');
      },
    },
  }
);

sequelize.getCurrentClsTransaction = function () {
  return this.constructor._cls.get("transaction");
};
const namespace = cls.createNamespace("a-namespace");
Sequelize._cls = namespace;

const fn = async () => {
  await sequelize.sync();
  const transaction = await sequelize.startUnmanagedTransaction();
  namespace.set("transaction", transaction);
  console.log('IDJIDFO', transaction.id)

  await Thing.create({ name: "dsfji" });
  await sequelize.close();
  return;
}

// sequelize.transaction(fn);
namespace.run(fn);
// fn()
