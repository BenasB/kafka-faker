import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";

export const messageDataFieldTypes = ["custom", "object"] as const;

// Common shared properties between all message data field types
type MessageDataFieldCommon = {
  key: string;
  depth: number;
  toDelete?: boolean;
};

type MessageDataFieldCustom = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[0];
  value: string;
};

type MessageDataFieldObject = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[1];
  value: MessageDataField[];
};

export type MessageDataFieldGeneration = MessageDataFieldCommon & {
  valueType: "generation";
  generationType: typeof messageDataFieldGenerationTypes[number];
  generate: () => string;
  value: string;
};

export type MessageDataField =
  | MessageDataFieldCustom
  | MessageDataFieldObject
  | MessageDataFieldGeneration;

// State interface
export interface Message {
  topic: string;
  autoGeneration: boolean;
  data: MessageDataField[];
}
