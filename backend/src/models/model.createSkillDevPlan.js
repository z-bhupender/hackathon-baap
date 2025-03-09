import { DataTypes } from "sequelize";
import { sequelize } from "../database/mysql.js";

export const CreateSkillDevelopmentPlan = sequelize.define(
  "CreateSkillDevelopmentPlan",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    assign_date: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    due_date: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    plan_range_s_date: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    plan_range_e_date: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    period_type: {
      type: DataTypes.CHAR(20),
      allowNull: true,
    },
    plan_template_id: {
      type: DataTypes.CHAR(100),
      allowNull: true,
    },
    version_id: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
    plan_display_name: {
      type: DataTypes.CHAR(250),
      allowNull: true,
    },
    evalution_start_date: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    evalution_end_date: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    updated_at: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "create_skill_development_plan",
    timestamps: false,
    indexes: [
      {
        name: "brand_id_index",
        fields: ["brand_id"],
      },
      {
        name: "plan_range_s_date_index",
        fields: ["plan_range_s_date"],
      },
      {
        name: "plan_range_e_date_index",
        fields: ["plan_range_e_date"],
      },
      {
        name: "period_type_index",
        fields: ["period_type"],
      },
      {
        name: "assign_date_index",
        fields: ["assign_date"],
      },
      {
        name: "due_date_index",
        fields: ["due_date"],
      },
    ],
  }
);
