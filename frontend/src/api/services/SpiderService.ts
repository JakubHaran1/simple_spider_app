import { publicApi } from "../public";
import type { SpiderType } from "../types";

export const SpiderService = {
  async getSpiders(): Promise<SpiderType[]> {
    const response = await publicApi.get("/spiders");
    return response.data;
  },
};
