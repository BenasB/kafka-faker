import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";

export const messageDataFieldTypes = ["custom", "object", "array"] as const;

// Common shared properties between all message data field types
export type MessageDataFieldCommon = {
  name: ValidatedInput<string>;
  depth: number;
  toDelete?: boolean;
};

export type ValidatedInput<T> = {
  value: T;
  errorMessages?: string[];
  validate: (value: T) => string[] | undefined;
};

export type MessageDataFieldCustom = {
  valueType: typeof messageDataFieldTypes[0];
  value: string;
};

export type MessageDataFieldObject = {
  valueType: typeof messageDataFieldTypes[1];
  value: MessageDataField[];
};

export type MessageDataFieldArray = {
  valueType: typeof messageDataFieldTypes[2];
  count: number;
  value: MessageDataFieldSpecific;
};

export type MessageDataFieldGeneration = {
  valueType: "generation";
  displayName: string;
  generationGroup: string;
  generationType: typeof messageDataFieldGenerationTypes[number];
  generate: () => string;
  value: string;
};

export type MessageDataFieldSpecific =
  | MessageDataFieldCustom
  | MessageDataFieldObject
  | MessageDataFieldGeneration
  | MessageDataFieldArray;

export type MessageDataField = MessageDataFieldCommon &
  MessageDataFieldSpecific;

// State interface
export interface Message {
  topic: ValidatedInput<string>;
  key?: string;
  autoGeneration: boolean;
  data: MessageDataField[];
}
