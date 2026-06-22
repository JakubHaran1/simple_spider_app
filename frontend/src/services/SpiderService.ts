import { privateApi } from "../api/private";
import { publicApi } from "../api/public";
import type { SpiderType, SpiderTypeCreate } from "../api/types";

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
  async createSpider(createObj: SpiderTypeCreate) {
    const { name, type, description, tags } = createObj;
    console.log(tags);
    const tagArr = tags.split(",").map((tag) => ({
      tag: tag,
    }));

    console.log(tagArr);

    const response = await privateApi.post("/spiders/", {
      name: name,
      type: type,
      description: description,
      tags: tagArr,
    });
    return response;
  },
};
