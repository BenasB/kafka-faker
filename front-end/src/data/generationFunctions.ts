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
  "city",
  "cityName",
  "country",
  "countryCode",
  "county",
  "direction",
  "latitude",
  "longitude",
  "gpsCoordinate",
  "ordinalDirection",
  "secondaryAddress",
  "state",
  "stateAbbr",
  "street",
  "streetAddress",
  "streetName",
  "timeZone",
  "zipCode",
  "bear",
  "bird",
  "cat",
  "cetacean",
  "cow",
  "crocodilia",
  "dog",
  "fish",
  "horse",
  "insect",
  "lion",
  "rabbit",
  "rodent",
  "snake",
  "animalType",
  "cmyk",
  "colorByCSSColorSpace",
  "cssSupportedFunction",
  "cssSupportedSpace",
  "hsl",
  "humanColor",
  "hwb",
  "lab",
  "lch",
  "rgb",
  "colorSpace",
  "department",
  "price",
  "product",
  "productAdjective",
  "productDescription",
  "productMaterial",
  "productName",
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
      {
        type: "city",
        function: faker.address.city,
      },
      {
        type: "cityName",
        function: faker.address.cityName,
      },
      {
        type: "country",
        function: faker.address.country,
      },
      {
        type: "countryCode",
        function: faker.address.countryCode,
      },
      {
        type: "county",
        function: faker.address.county,
      },
      {
        type: "direction",
        function: faker.address.direction,
      },
      {
        type: "latitude",
        function: faker.address.latitude,
      },
      {
        type: "longitude",
        function: faker.address.longitude,
      },
      {
        type: "gpsCoordinate",
        function: () => faker.address.nearbyGPSCoordinate().toString(),
        displayName: "GPS coordinate",
      },
      {
        type: "ordinalDirection",
        function: faker.address.ordinalDirection,
      },
      {
        type: "secondaryAddress",
        function: faker.address.secondaryAddress,
      },
      {
        type: "state",
        function: faker.address.state,
      },
      {
        type: "stateAbbr",
        function: faker.address.stateAbbr,
        displayName: "State abbreviation",
      },
      {
        type: "street",
        function: faker.address.street,
      },
      {
        type: "streetAddress",
        function: faker.address.streetAddress,
      },
      {
        type: "streetName",
        function: faker.address.streetName,
      },
      {
        type: "timeZone",
        function: faker.address.timeZone,
      },
      {
        type: "zipCode",
        function: faker.address.zipCode,
      },
    ],
  },
  {
    group: "animal",
    functions: [
      {
        type: "bear",
        function: faker.animal.bear,
      },
      {
        type: "bird",
        function: faker.animal.bird,
      },
      {
        type: "cat",
        function: faker.animal.cat,
      },
      {
        type: "cetacean",
        function: faker.animal.cetacean,
      },
      {
        type: "cow",
        function: faker.animal.cow,
      },
      {
        type: "crocodilia",
        function: faker.animal.crocodilia,
      },
      {
        type: "dog",
        function: faker.animal.dog,
      },
      {
        type: "fish",
        function: faker.animal.fish,
      },
      {
        type: "horse",
        function: faker.animal.horse,
      },
      {
        type: "insect",
        function: faker.animal.insect,
      },
      {
        type: "lion",
        function: faker.animal.lion,
      },
      {
        type: "rabbit",
        function: faker.animal.rabbit,
      },
      {
        type: "rodent",
        function: faker.animal.rodent,
      },
      {
        type: "snake",
        function: faker.animal.snake,
      },
      {
        type: "animalType",
        function: faker.animal.type,
      },
    ],
  },
  {
    group: "color",
    functions: [
      {
        type: "cmyk",
        function: () => faker.color.cmyk().toString(),
        displayName: "CMYK",
      },
      {
        type: "colorByCSSColorSpace",
        function: () => faker.color.colorByCSSColorSpace().toString(),
        displayName: "Color by CSS color space",
      },
      {
        type: "cssSupportedFunction",
        function: faker.color.cssSupportedFunction,
        displayName: "CSS supported function",
      },
      {
        type: "cssSupportedSpace",
        function: faker.color.cssSupportedSpace,
        displayName: "CSS supported space",
      },
      {
        type: "hsl",
        function: () => faker.color.hsl().toString(),
        displayName: "HSL",
      },
      {
        type: "humanColor",
        function: faker.color.human,
        displayName: "Human readable color",
      },
      {
        type: "hwb",
        function: () => faker.color.hwb().toString(),
        displayName: "HWB",
      },
      {
        type: "lab",
        function: () => faker.color.lab().toString(),
        displayName: "LAB",
      },
      {
        type: "lch",
        function: () => faker.color.lch().toString(),
        displayName: "LCH",
      },
      {
        type: "rgb",
        function: () => faker.color.rgb().toString(),
        displayName: "RGB",
      },
      {
        type: "colorSpace",
        function: faker.color.space,
      },
    ],
  },
  {
    group: "commerce",
    functions: [
      {
        type: "department",
        function: faker.commerce.department,
      },
      {
        type: "price",
        function: faker.commerce.price,
      },
      {
        type: "product",
        function: faker.commerce.product,
      },
      {
        type: "productAdjective",
        function: faker.commerce.productAdjective,
      },
      {
        type: "productDescription",
        function: faker.commerce.productDescription,
      },
      {
        type: "productMaterial",
        function: faker.commerce.productMaterial,
      },
      {
        type: "productName",
        function: faker.commerce.productName,
      },
    ],
  },
];

export const generationGroups: GenerationGroup[] = partialGenerationGroups.map(
  (generationGroup) => ({
    ...generationGroup,
    functions: generationGroup.functions.map<GenerationFunction>((f) => ({
      displayName: toNonCamelCase(f.type),
      ...f,
      group: generationGroup.group,
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
