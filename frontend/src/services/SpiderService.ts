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
    const form_data = new FormData();
    form_data.append("name", createObj.name);
    form_data.append("type", createObj.type);
    form_data.append("description", createObj.description);
    form_data.append("tags", createObj.tags);
    if (createObj.spider_img.img)
      form_data.append("spider_img", createObj.spider_img.img);

    const response = await privateApi.post("/spiders/", form_data);
    return response;
  },
  async updateSpider(updateObj: SpiderTypeCreate, id: number) {
    const form_data = new FormData();
    form_data.append("name", updateObj.name);
    form_data.append("type", updateObj.type);
    form_data.append("description", updateObj.description);
    form_data.append("tags", updateObj.tags);
    if (updateObj.spider_img.img)
      form_data.append("spider_img", updateObj.spider_img.img);

    const response = await privateApi.put(`/spiders/${id}/`, form_data);
    return response;
  },
  async deleteSpider(id: number) {
    const response = await privateApi.delete(`/spiders/${id}/`);
    return response;
  },
};
