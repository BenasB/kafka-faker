import { faker } from "@faker-js/faker";
import toNonCamelCase from "../utils/toNonCamelCase";

export const messageDataFieldGenerationGroups = [
  "address",
  "animal",
  "color",
  "commerce",
  "company",
  "database",
  "datatype",
  "date",
  "fake",
  "finance",
  "git",
  "hacker",
  "helpers",
  "image",
  "internet",
  "localization",
  "lorem",
  "mersenne",
  "music",
  "name",
  "phone",
  "random",
  "science",
  "system",
  "unique",
  "vehicle",
  "word",
] as const;

export const messageDataFieldGenerationTypes = [
  "buildingNumber",
  "cardinalDirection",
] as const;

export type GenerationFunction = {
  type: typeof messageDataFieldGenerationTypes[number];
  function: () => string;
  displayName?: string;
};

export type GenerationGroup = {
  group: typeof messageDataFieldGenerationGroups[number];
  functions: GenerationFunction[];
};

export const generationGroups: GenerationGroup[] = [
  {
    group: "address",
    functions: [
      {
        type: "buildingNumber",
        function: faker.address.buildingNumber,
      },
      {
        type: "cardinalDirection",
        function: faker.address.cardinalDirection,
      },
    ],
  },
];

const generationFunctions: GenerationFunction[] = generationGroups
  .reduce<GenerationFunction[]>(
    (prev, value) => [...prev, ...value.functions],
    []
  )
  .map((o) => ({
    displayName: toNonCamelCase(o.type),
    ...o,
  }));

export default generationFunctions;
