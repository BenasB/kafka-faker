import { messageDataFieldGenerationTypes } from "../../data/generationFunctions";

export const messageDataFieldTypes = ["custom", "object", "array"] as const;

// Common shared properties between all message data field types
type MessageDataFieldCommon = {
  name: ValidatedInput<string>;
  depth: number;
  toDelete?: boolean;
};

export type ValidatedInput<T> = {
  value: T;
  errorMessages?: string[];
  validate: (value: T) => string[] | undefined;
};

export type MessageDataFieldCustom = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[0];
  value: string;
};

export type MessageDataFieldObject = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[1];
  value: MessageDataField[];
};

export type MessageDataFieldArray = MessageDataFieldCommon & {
  valueType: typeof messageDataFieldTypes[2];
  count: number;

  // Array of one element so we can use the indices method to update message data fields
  value: FixedLengthArray<[MessageDataField]>;
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
  | MessageDataFieldGeneration
  | MessageDataFieldArray;

// State interface
export interface Message {
  topic: ValidatedInput<string>;
  key: string;
  autoGeneration: boolean;
  data: MessageDataField[];
}

// Fixed length array type for MessageDataFieldArray to use
// https://stackoverflow.com/a/59906630
type ArrayLengthMutationKeys =
  | "splice"
  | "push"
  | "pop"
  | "shift"
  | "unshift"
  | number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems>
  ? TItems
  : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FixedLengthArray<T extends any[]> = Pick<
  T,
  Exclude<keyof T, ArrayLengthMutationKeys>
> & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> };
