import axios, { AxiosPromise } from "axios";
import { TopicsParams, TopicsItem } from "@/interface/topics";
const apiHost: string = process.env.VUE_APP_API_HOST;
//  https://cnodejs.org/api/v1

const request = axios.create({
  timeout: 30 * 1000,
  baseURL: apiHost
});
request.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.warn(error);
    const response = error.response;

    return Promise.reject(response || { message: error.message });
  }
);
export function getTopics(param: TopicsParams): AxiosPromise<TopicsItem[]> {
  const { tab, page, limit, mdrender } = param;
  const params: TopicsParams = { tab, page, limit };
  if (mdrender) {
    params.mdrender = mdrender;
  }
  return request({
    url: "/topics",
    method: "GET",
    params
  });
}

export function getTopicDetails(id: string) {
  // /topic/5433d5e4e737cbe96dcef312
  const params = {};
  return request({
    url: "/topic/" + id,
    method: "GET",
    params
  });
}
