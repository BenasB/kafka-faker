import { messageDataFieldTypes } from "../components/messageForm/messageTypes";
import toNonCamelCase from "../utils/toNonCamelCase";
import WithOptional from "../utils/withOptional";

interface GeneralMessageDataFieldTypeData {
  type: typeof messageDataFieldTypes[number];
  displayName: string;
  description: string;
}

const partialGeneralMessageDataFieldTypeData: WithOptional<
  GeneralMessageDataFieldTypeData,
  "displayName"
>[] = [
  {
    type: "custom",
    description: "A custom constant value",
  },
  {
    type: "object",
    description: "Allows you to nest fields",
  },
  {
    type: "array",
    description: "Allows you to create repeated fields in an array",
  },
];

const generalMessageDataFieldTypeData: GeneralMessageDataFieldTypeData[] =
  partialGeneralMessageDataFieldTypeData.map((d) => ({
    displayName: toNonCamelCase(d.type),
    ...d,
  }));

export default generalMessageDataFieldTypeData;
