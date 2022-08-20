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
  "finance",
  "git",
  "hacker",
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
  "corporateSpeak",
  "corporateSpeakAdjective",
  "corporateSpeakBuzz",
  "corporateSpeakNoun",
  "catchPhrase",
  "catchPhraseAdjective",
  "catchPhraseDescriptor",
  "catchPhraseNoun",
  "companySuffix",
  "companyName",
  "collation",
  "column",
  "engine",
  "mongodbObjectId",
  "databaseType",
  "bigInt",
  "boolean",
  "datetime",
  "float",
  "hexadecimal",
  "number",
  "string",
  "uuid",
  "birthdate",
  "future",
  "month",
  "past",
  "recent",
  "soon",
  "weekday",
  "account",
  "accountName",
  "amount",
  "bic",
  "bitcoinAddress",
  "creditCardCVV",
  "creditCardIssuer",
  "creditCardNumber",
  "currencyCode",
  "currencyName",
  "currencySymbol",
  "ethereumAddress",
  "iban",
  "litecoinAddress",
  "mask",
  "pin",
  "routingNumber",
  "transactionDescription",
  "transactionType",
  "branch",
  "commitEntry",
  "commitMessage",
  "commitSha",
  "shortSha",
  "hackerAbbreviation",
  "hackerAdjective",
  "hackerIngverb",
  "hackerNoun",
  "hackerPhrase",
  "hackerVerb",
  "abstractImage",
  "animalImage",
  "avatar",
  "businessImage",
  "catImage",
  "cityImage",
  "svgDataUri",
  "fashionImage",
  "foodImage",
  "image",
  "natureImage",
  "nightlifeImage",
  "personImage",
  "sportsImage",
  "technicsImage",
  "transportImage",
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
  {
    group: "company",
    functions: [
      {
        type: "corporateSpeak",
        function: faker.company.bs,
      },
      {
        type: "corporateSpeakAdjective",
        function: faker.company.bsAdjective,
      },
      {
        type: "corporateSpeakBuzz",
        function: faker.company.bsBuzz,
      },
      {
        type: "corporateSpeakNoun",
        function: faker.company.bsNoun,
      },
      {
        type: "catchPhrase",
        function: faker.company.catchPhrase,
      },
      {
        type: "catchPhraseAdjective",
        function: faker.company.catchPhraseAdjective,
      },
      {
        type: "catchPhraseDescriptor",
        function: faker.company.catchPhraseDescriptor,
      },
      {
        type: "catchPhraseNoun",
        function: faker.company.catchPhraseNoun,
      },
      {
        type: "companySuffix",
        function: faker.company.companySuffix,
      },
      {
        type: "companyName",
        function: faker.company.name,
      },
    ],
  },
  {
    group: "database",
    functions: [
      {
        type: "collation",
        function: faker.database.collation,
      },
      {
        type: "column",
        function: faker.database.column,
      },
      {
        type: "engine",
        function: faker.database.engine,
      },
      {
        type: "mongodbObjectId",
        function: faker.database.mongodbObjectId,
      },
      {
        type: "databaseType",
        function: faker.database.type,
      },
    ],
  },
  {
    group: "datatype",
    functions: [
      {
        type: "bigInt",
        function: () => faker.datatype.bigInt().toString(),
        displayName: "BigInt",
      },
      {
        type: "boolean",
        function: () => faker.datatype.boolean().toString(),
      },
      {
        type: "datetime",
        function: () => faker.datatype.datetime().toISOString(),
      },
      {
        type: "float",
        function: () => faker.datatype.float().toString(),
      },
      {
        type: "hexadecimal",
        function: faker.datatype.hexadecimal,
      },
      {
        type: "number",
        function: () => faker.datatype.number().toString(),
      },
      {
        type: "string",
        function: faker.datatype.string,
      },
      {
        type: "uuid",
        function: faker.datatype.uuid,
        displayName: "UUID",
      },
    ],
  },
  {
    group: "date",
    functions: [
      {
        type: "birthdate",
        function: () => faker.date.birthdate().toISOString(),
      },
      {
        type: "future",
        function: () => faker.date.future().toISOString(),
      },
      {
        type: "month",
        function: faker.date.month,
      },
      {
        type: "past",
        function: () => faker.date.past().toISOString(),
      },
      {
        type: "recent",
        function: () => faker.date.recent().toISOString(),
      },
      {
        type: "soon",
        function: () => faker.date.soon().toISOString(),
      },
      {
        type: "weekday",
        function: faker.date.weekday,
      },
    ],
  },
  {
    group: "finance",
    functions: [
      {
        type: "account",
        function: faker.finance.account,
      },
      {
        type: "accountName",
        function: faker.finance.accountName,
      },
      {
        type: "amount",
        function: faker.finance.amount,
      },
      {
        type: "bic",
        function: faker.finance.bic,
      },
      {
        type: "bitcoinAddress",
        function: faker.finance.bitcoinAddress,
      },
      {
        type: "creditCardCVV",
        function: faker.finance.creditCardCVV,
        displayName: "Credit card CVV",
      },
      {
        type: "creditCardIssuer",
        function: faker.finance.creditCardIssuer,
      },
      {
        type: "creditCardNumber",
        function: faker.finance.creditCardNumber,
      },
      {
        type: "currencyCode",
        function: faker.finance.currencyCode,
      },
      {
        type: "currencyName",
        function: faker.finance.currencyName,
      },
      {
        type: "currencySymbol",
        function: faker.finance.currencySymbol,
      },
      {
        type: "ethereumAddress",
        function: faker.finance.ethereumAddress,
      },
      {
        type: "iban",
        function: faker.finance.iban,
      },
      {
        type: "litecoinAddress",
        function: faker.finance.litecoinAddress,
      },
      {
        type: "mask",
        function: faker.finance.mask,
      },
      {
        type: "pin",
        function: faker.finance.pin,
      },
      {
        type: "routingNumber",
        function: faker.finance.routingNumber,
      },
      {
        type: "transactionDescription",
        function: faker.finance.transactionDescription,
      },
      {
        type: "transactionType",
        function: faker.finance.transactionType,
      },
    ],
  },
  {
    group: "git",
    functions: [
      {
        type: "branch",
        function: faker.git.branch,
      },
      {
        type: "commitEntry",
        function: () => faker.git.commitEntry({ eol: "LF" }),
      },
      {
        type: "commitMessage",
        function: faker.git.commitMessage,
      },
      {
        type: "commitSha",
        function: faker.git.commitSha,
      },
      {
        type: "shortSha",
        function: faker.git.shortSha,
      },
    ],
  },
  {
    group: "hacker",
    functions: [
      {
        type: "hackerAbbreviation",
        function: faker.hacker.abbreviation,
      },
      {
        type: "hackerAdjective",
        function: faker.hacker.adjective,
      },
      {
        type: "hackerIngverb",
        function: faker.hacker.ingverb,
      },
      {
        type: "hackerNoun",
        function: faker.hacker.noun,
      },
      {
        type: "hackerPhrase",
        function: faker.hacker.phrase,
      },
      {
        type: "hackerVerb",
        function: faker.hacker.verb,
      },
    ],
  },
  {
    group: "image",
    functions: [
      {
        type: "abstractImage",
        function: faker.image.abstract,
      },
      {
        type: "animalImage",
        function: faker.image.animals,
      },
      {
        type: "avatar",
        function: faker.image.avatar,
      },
      {
        type: "businessImage",
        function: faker.image.business,
      },
      {
        type: "catImage",
        function: faker.image.cats,
      },
      {
        type: "cityImage",
        function: faker.image.city,
      },
      {
        type: "svgDataUri",
        function: faker.image.dataUri,
        displayName: "SVG data URI",
      },
      {
        type: "fashionImage",
        function: faker.image.fashion,
      },
      {
        type: "foodImage",
        function: faker.image.food,
      },
      {
        type: "image",
        function: faker.image.image,
      },
      {
        type: "natureImage",
        function: faker.image.nature,
      },
      {
        type: "nightlifeImage",
        function: faker.image.nightlife,
      },
      {
        type: "personImage",
        function: faker.image.people,
      },
      {
        type: "sportsImage",
        function: faker.image.sports,
      },
      {
        type: "technicsImage",
        function: faker.image.technics,
      },
      {
        type: "transportImage",
        function: faker.image.transport,
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
