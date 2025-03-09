import { getCalls } from "./controller.gptActions.js";

export async function list(req, res) {
    console.log(await getCalls("Paula", "2025-01-01T00:00:00", "2025-01-01T23:59:59", 40));
}