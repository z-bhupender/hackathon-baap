import { DataTypes } from "sequelize";
import { sequelize } from "../database/mysql.js";
import { CreateSkillDevelopmentPlan } from "./model.createSkillDevPlan.js";

const UserSkillDevPlanMapping = sequelize.define(
  "UserSkillDevPlanMapping",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sdp_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CreateSkillDevelopmentPlan,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_plan_display_name: {
      type: DataTypes.CHAR(100),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      comment: "hrchy_user_id is a user which we create skill dev plan",
    },
    user_name: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      comment: "hrchy_user_id is a user which we create skill dev plan",
    },
    role: {
      type: DataTypes.CHAR(25),
      allowNull: true,
      comment: "hrchy_role is a user role which we create skill dev plan",
    },
    parent_id: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      comment: "hrchy_parent_id is a parent user of hrchy_user_id",
    },
    parent_name: {
      type: DataTypes.CHAR(100),
      allowNull: true,
      comment: "hrchy_parent_id is a parent user of hrchy_user_id",
    },
    parent_role: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      comment: "hrchy_user_id is a parent user role",
    },
    overall_score: {
      type: DataTypes.FLOAT(4, 1),
      allowNull: true,
    },
    skill_data_json: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "not_started",
    },
    total_action_items_completed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    total_action_items_assigned: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exclude_from_completion_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0,
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
    tableName: "user_skill_dev_plan_mapping",
    timestamps: false,
    indexes: [
      {
        name: "sdp_id_index",
        fields: ["sdp_id"],
      },
      {
        name: "brand_id_index",
        fields: ["brand_id"],
      },
      {
        name: "user_id_index",
        fields: ["user_id"],
      },
      {
        name: "role_index",
        fields: ["role"],
      },
      {
        name: "inactive_index",
        fields: ["inactive"],
      },
      {
        name: "parent_id_index",
        fields: ["parent_id"],
      },
    ],
  }
);

// Define the association with SkillDevelopmentPlan
UserSkillDevPlanMapping.belongsTo(CreateSkillDevelopmentPlan, {
  foreignKey: "sdp_id",
  targetKey: "id",
  as: "createSkillDevelopmentPlan",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default UserSkillDevPlanMapping;
