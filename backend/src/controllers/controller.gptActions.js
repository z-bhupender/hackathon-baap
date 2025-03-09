export async function getDevPlan(agentName, monthStartDate, monthEndDate) {
  return {
    devPlans: [
      {
        id: 1,
        agentName: agentName,
        monthStartDate: monthStartDate,
        monthEndDate: monthEndDate,
        planName: "Plan 1",
      },
    ],
  };
}

export async function getCalls(agentName, startDate, endDate) {
  return {
    calls: [
      {
        id: 1,
        agentName: agentName,
        callDate: "2025-01-01 00:00:00",
      },
    ],
  };
}
