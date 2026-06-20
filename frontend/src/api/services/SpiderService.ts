import { publicApi } from "../public";
import type { SpiderType } from "../types";

export const SpiderService = {
  async getSpiders(): Promise<SpiderType[]> {
    const response = await publicApi.get("/spiders");
    return response.data;
  },
  async searchSpiders(search: string): Promise<SpiderType[]> {
    const params = { search };
    const response = await publicApi.get("/spiders", { params });
    return response.data;
  },
};
