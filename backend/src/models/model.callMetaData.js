import { DataTypes } from "sequelize";

export const initCallMetaData = (sequelize) => {
  const CallMetaData = sequelize.define(
    "CallMetaData",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "call_meta_data",
      timestamps: false,
      indexes: [
        {
          name: "brand_id_index",
          fields: ["brand_id"],
        },
      ],
    }
  );

  return CallMetaData;
};
