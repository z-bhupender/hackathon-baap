export const functions = {
  getDevPlan: {
    name: "getDevPlan",
    description:
      "Get me development plans of an agentName between a monthStartDate & monthEndDate.",
    parameters: {
      type: "object",
      properties: {
        agentName: {
          type: "string",
          description: "Name of the agent",
        },
        monthStartDate: {
          type: "string",
          description: "Start date of the month",
        },
        monthEndDate: {
          type: "string",
          description: "End date of the month",
        },
        devPlans: {
          type: "array",
          items: {
            type: "object",
          },
          description: "The development plans of the agent",
        },
      },
      required: ["devPlans"],
    },
  },
  getCalls: {
    name: "getCalls",
    description:
      "Get me call_ids of an agentName between a monthStartDate & monthEndDate.",
    parameters: {
      type: "object",
      properties: {
        agentName: {
          type: "string",
          description: "Name of the agent",
        },
        monthStartDate: {
          type: "string",
          description: "Start date of the month",
        },
        monthEndDate: {
          type: "string",
          description: "End date of the month",
        },
        call_id: {
          type: "array",
          items: {
            type: "object",
          },
          description: "The unique ID's of the call",
        },
      },
      required: ["agentName", "monthStartDate", "monthEndDate", "call_id"],
    },
  },
};
