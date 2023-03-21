import { Sequelize, DataType, Model, Column, Table } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "main",
  username: "postgres",
  password: "postgres",
  port: 5433,
});

// const UserModel = sequelize.define("UserModel",
// {
//   firstName: DataType.STRING,
//   lastName: DataType.STRING,
// }, {
//   sequelize
// });

// @Table
class UserModel extends Model {
  // @Column
  firstName: string
  // @Column
  lastName: string
}
UserModel.init(
  {
    firstName: DataType.STRING,
    lastName: DataType.STRING,
  },
  {
    sequelize,
  }
);
const fn = async () => {
  await sequelize.sync();

  let user: UserModel = (await UserModel.create({
    firstName: "Peter",
    lastName: "Griffin",
  })).get();
  console.log(user.firstName);

  console.log(user);

  await sequelize.close();
  return;
};

fn();
