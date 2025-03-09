import { sequelize } from "../database/mysql.js";

// Import and initialize models
import { initUserMetaName } from "./model.userMetaNames.js";
import { initCallMetaData } from "./model.callMetaData.js";
import { initCreateSkillDevelopmentPlan } from "./model.createSkillDevPlan.js";
import { initUserSkillDevPlanMapping } from "./model.userSkillDevPlanMapping.js";

// Initialize models
const UserMetaName = initUserMetaName(sequelize);
const CallMetaData = initCallMetaData(sequelize);
const CreateSkillDevelopmentPlan = initCreateSkillDevelopmentPlan(sequelize);
const UserSkillDevPlanMapping = initUserSkillDevPlanMapping(sequelize);

// Define associations
UserMetaName.hasMany(CallMetaData, {
  sourceKey: "user_id",
  foreignKey: "agent_id",
  as: "calls",
});

CallMetaData.belongsTo(UserMetaName, {
  targetKey: "user_id",
  foreignKey: "agent_id",
  as: "agent",
});

// Other associations
CreateSkillDevelopmentPlan.hasMany(UserSkillDevPlanMapping, {
  foreignKey: "sdp_id",
  as: "userSkillMappings",
});

UserSkillDevPlanMapping.belongsTo(CreateSkillDevelopmentPlan, {
  foreignKey: "sdp_id",
  targetKey: "id",
  as: "createSkillDevelopmentPlan",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Create db object with all models
const db = {
  sequelize,
  UserMetaName,
  CallMetaData,
  CreateSkillDevelopmentPlan,
  UserSkillDevPlanMapping,
};

// Export individual models and sequelize instance
export {
  sequelize,
  UserMetaName as UserMetaNameModel,
  CallMetaData as CallMetaDataModel,
  CreateSkillDevelopmentPlan as CreateSkillDevelopmentPlanModel,
  UserSkillDevPlanMapping as UserSkillDevPlanMappingModel,
};

// Export the db object as default
export default db;
