import {
  UserMetaNameModel,
  CallMetaDataModel,
  CreateSkillDevelopmentPlanModel,
  UserSkillDevPlanMappingModel,
} from "../models/index.js";
import { Op } from "sequelize";

export async function getDevPlan(
  agentName,
  monthStartDate,
  monthEndDate,
  brandId = 40
) {
  try {
    const results = await UserSkillDevPlanMappingModel.findAll({
      attributes: [
        [
          UserSkillDevPlanMappingModel.sequelize.col(
            "UserSkillDevPlanMapping.id"
          ),
          "id",
        ],
        [
          UserSkillDevPlanMappingModel.sequelize.col(
            "UserSkillDevPlanMapping.user_plan_display_name"
          ),
          "user_plan_display_name",
        ],
        [
          UserSkillDevPlanMappingModel.sequelize.col(
            "UserSkillDevPlanMapping.user_id"
          ),
          "user_id",
        ],
        [
          UserSkillDevPlanMappingModel.sequelize.col(
            "UserSkillDevPlanMapping.user_name"
          ),
          "user_name",
        ],
        [
          UserSkillDevPlanMappingModel.sequelize.col(
            "UserSkillDevPlanMapping.role"
          ),
          "role",
        ],
      ],
      include: [
        {
          model: CreateSkillDevelopmentPlanModel,
          as: "createSkillDevelopmentPlan",
          attributes: [],
          where: {
            brand_id: brandId,
            plan_range_s_date: monthStartDate,
            plan_range_e_date: monthEndDate,
          },
        },
      ],
      where: {
        brand_id: brandId,
        user_name: {
          [Op.like]: `%${agentName}%`,
        },
      },
    });

    return results;
  } catch (error) {
    console.error("Error retrieving user skill development plans:", error);
    throw error;
  }
}

export async function getCalls(agentName, startDate, endDate, brandId = 40) {
  try {
    const startTimestamp = Math.floor(new Date(startDate).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

    const results = await CallMetaDataModel.findAll({
      attributes: ["callid", ["_starttime", "call_date"]],
      include: [
        {
          model: UserMetaNameModel,
          as: "agent",
          where: {
            brand_id: brandId,
            name: {
              [Op.like]: `%${agentName}%`,
            },
          },
          required: true,
        },
      ],
      where: {
        brand_id: brandId,
        call_date: {
          [Op.between]: [startTimestamp, endTimestamp],
        },
      },
    });

    return results;
  } catch (error) {
    console.error("Error retrieving call data:", error);
    throw error;
  }
}
