import axios, { AxiosInstance, AxiosResponse } from "axios";

interface BackEndMessageModel {
  topic: string;
  message: string;
  key?: string;
}

export interface BackEndSchemaModel {
  title: string;
  jsonString: string;
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

const getAllSchemas = (): Promise<AxiosResponse<BackEndSchemaModel[]>> => {
  return httpClient.get<BackEndSchemaModel[]>("Schema");
};

const deleteSchema = (title: string): Promise<AxiosResponse<never>> => {
  return httpClient.delete<never>(`Schema/${title}`);
};

const upsertSchema = (
  schema: BackEndSchemaModel
): Promise<AxiosResponse<never>> => {
  return httpClient.post<never>(`Schema`, schema);
};

export default { postMessage, getAllSchemas, deleteSchema, upsertSchema };
