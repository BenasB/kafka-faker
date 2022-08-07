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
): Promise<AxiosResponse<never>> => {
  if (messageModel.key)
    return httpClient.post<never>("Send/KeyMessage", messageModel);

  return httpClient.post<never>("Send/Message", messageModel);
};

export default { postMessage };
