import axios, { AxiosInstance, AxiosResponse } from "axios";

interface BackEndMessageModel {
  topic: string;
  message: string;
  key?: string;
}

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:7204/", // TODO: Correct this
  timeout: 5000,
});

const postMessage = (
  messageModel: BackEndMessageModel
): Promise<AxiosResponse<BackEndMessageModel, BackEndMessageModel>> => {
  return httpClient.post<BackEndMessageModel>("Send", messageModel);
};

export default { postMessage };
