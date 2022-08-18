import { faker } from "@faker-js/faker";
import toNonCamelCase from "../utils/toNonCamelCase";
import WithOptional from "../utils/withOptional";

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
  group: typeof messageDataFieldGenerationGroups[number];
  function: () => string;
  displayName: string;
};

export type GenerationGroup = {
  group: typeof messageDataFieldGenerationGroups[number];
  functions: GenerationFunction[];
};

type PartialGenerationGroup = Omit<GenerationGroup, "functions"> & {
  functions: WithOptional<Omit<GenerationFunction, "group">, "displayName">[];
};

const partialGenerationGroups: PartialGenerationGroup[] = [
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

export const generationGroups: GenerationGroup[] = partialGenerationGroups.map(
  (generationGroup) => ({
    ...generationGroup,
    functions: generationGroup.functions.map<GenerationFunction>((f) => ({
      ...f,
      group: generationGroup.group,
      displayName: toNonCamelCase(f.type),
    })),
  })
);

const generationFunctions: GenerationFunction[] = generationGroups.reduce<
  GenerationFunction[]
>(
  (prev, value) => [
    ...prev,
    ...value.functions.map<GenerationFunction>((f) => ({
      ...f,
      group: value.group,
    })),
  ],
  []
);

export default generationFunctions;
