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
  "lorem",
  "music",
  "name",
  "phone",
  "random",
  "science",
  "system",
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
  "domainName",
  "domainSuffix",
  "domainWord",
  "email",
  "emoji",
  "exampleEmail",
  "httpMethod",
  "httpStatusCode",
  "ipv4",
  "ipv6",
  "mac",
  "password",
  "port",
  "protocol",
  "url",
  "userAgent",
  "userName",
  "lines",
  "paragraph",
  "paragraphs",
  "sentence",
  "sentences",
  "slug",
  "text",
  "loremWord",
  "loremWords",
  "genre",
  "songName",
  "firstName",
  "fullName",
  "gender",
  "jobArea",
  "jobDescriptor",
  "jobTitle",
  "jobType",
  "lastName",
  "middleName",
  "prefix",
  "sex",
  "suffix",
  "imei",
  "phoneNumber",
  "alpha",
  "alphaNumeric",
  "locale",
  "numeric",
  "word",
  "words",
  "chemicalElementSymbol",
  "chemicalElementName",
  "chemicalElementAtomicNumber",
  "unitName",
  "unitSymbol",
  "commonFileExt",
  "commonFileName",
  "commonFileType",
  "directoryPath",
  "fileExt",
  "fileName",
  "filePath",
  "fileType",
  "mimeType",
  "networkInterface",
  "semver",
  "bicycle",
  "vehicleColor",
  "fuel",
  "manufacturer",
  "vehicleModel",
  "vehicleType",
  "vehicle",
  "vin",
  "vrm",
  "adjective",
  "adverb",
  "conjunction",
  "interjection",
  "noun",
  "preposition",
  "verb",
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
  {
    group: "internet",
    functions: [
      {
        type: "domainName",
        function: faker.internet.domainName,
      },
      {
        type: "domainSuffix",
        function: faker.internet.domainSuffix,
      },
      {
        type: "domainWord",
        function: faker.internet.domainWord,
      },
      {
        type: "email",
        function: faker.internet.email,
      },
      {
        type: "emoji",
        function: faker.internet.emoji,
      },
      {
        type: "exampleEmail",
        function: faker.internet.exampleEmail,
      },
      {
        type: "httpMethod",
        function: faker.internet.httpMethod,
      },
      {
        type: "httpStatusCode",
        function: () => faker.internet.httpStatusCode().toString(),
      },
      {
        type: "ipv4",
        function: faker.internet.ipv4,
        displayName: "IPv4",
      },
      {
        type: "ipv6",
        function: faker.internet.ipv6,
        displayName: "IPv6",
      },
      {
        type: "mac",
        function: faker.internet.mac,
      },
      {
        type: "password",
        function: faker.internet.password,
      },
      {
        type: "port",
        function: () => faker.internet.port().toString(),
      },
      {
        type: "protocol",
        function: faker.internet.protocol,
      },
      {
        type: "url",
        function: faker.internet.url,
        displayName: "URL",
      },
      {
        type: "userAgent",
        function: faker.internet.userAgent,
      },
      {
        type: "userName",
        function: faker.internet.userName,
      },
    ],
  },
  {
    group: "lorem",
    functions: [
      {
        type: "lines",
        function: faker.lorem.lines,
      },
      {
        type: "paragraph",
        function: faker.lorem.paragraph,
      },
      {
        type: "paragraphs",
        function: faker.lorem.paragraphs,
      },
      {
        type: "sentence",
        function: faker.lorem.sentence,
      },
      {
        type: "sentences",
        function: faker.lorem.sentences,
      },
      {
        type: "slug",
        function: faker.lorem.slug,
      },
      {
        type: "text",
        function: faker.lorem.text,
      },
      {
        type: "loremWord",
        function: faker.lorem.word,
      },
      {
        type: "loremWords",
        function: faker.lorem.words,
      },
    ],
  },
  {
    group: "music",
    functions: [
      {
        type: "genre",
        function: faker.music.genre,
      },
      {
        type: "songName",
        function: faker.music.songName,
      },
    ],
  },
  {
    group: "name",
    functions: [
      {
        type: "firstName",
        function: faker.name.firstName,
      },
      {
        type: "fullName",
        function: faker.name.fullName,
      },
      {
        type: "gender",
        function: faker.name.gender,
      },
      {
        type: "jobArea",
        function: faker.name.jobArea,
      },
      {
        type: "jobDescriptor",
        function: faker.name.jobDescriptor,
      },
      {
        type: "jobTitle",
        function: faker.name.jobTitle,
      },
      {
        type: "jobType",
        function: faker.name.jobType,
      },
      {
        type: "lastName",
        function: faker.name.lastName,
      },
      {
        type: "middleName",
        function: faker.name.middleName,
      },
      {
        type: "prefix",
        function: faker.name.prefix,
      },
      {
        type: "sex",
        function: () => faker.name.gender(true),
      },
      {
        type: "suffix",
        function: faker.name.suffix,
      },
    ],
  },
  {
    group: "phone",
    functions: [
      {
        type: "imei",
        function: faker.phone.imei,
        displayName: "IMEI",
      },
      {
        type: "phoneNumber",
        function: faker.phone.number,
      },
    ],
  },
  {
    group: "random",
    functions: [
      {
        type: "alpha",
        function: faker.random.alpha,
      },
      {
        type: "alphaNumeric",
        function: faker.random.alphaNumeric,
      },
      {
        type: "locale",
        function: faker.random.locale,
      },
      {
        type: "numeric",
        function: faker.random.numeric,
      },
      {
        type: "word",
        function: faker.random.word,
      },
      {
        type: "words",
        function: faker.random.words,
      },
    ],
  },
  {
    group: "science",
    functions: [
      {
        type: "chemicalElementSymbol",
        function: () => faker.science.chemicalElement().symbol,
      },
      {
        type: "chemicalElementName",
        function: () => faker.science.chemicalElement().name,
      },
      {
        type: "chemicalElementAtomicNumber",
        function: () => faker.science.chemicalElement().atomicNumber.toString(),
      },
      {
        type: "unitName",
        function: () => faker.science.unit().name,
      },
      {
        type: "unitSymbol",
        function: () => faker.science.unit().symbol,
      },
    ],
  },
  {
    group: "system",
    functions: [
      {
        type: "commonFileExt",
        function: faker.system.commonFileExt,
      },
      {
        type: "commonFileName",
        function: faker.system.commonFileName,
      },
      {
        type: "commonFileType",
        function: faker.system.commonFileType,
      },
      {
        type: "directoryPath",
        function: faker.system.directoryPath,
      },
      {
        type: "fileExt",
        function: faker.system.fileExt,
      },
      {
        type: "fileName",
        function: faker.system.fileName,
      },
      {
        type: "filePath",
        function: faker.system.filePath,
      },
      {
        type: "fileType",
        function: faker.system.fileType,
      },
      {
        type: "mimeType",
        function: faker.system.mimeType,
      },
      {
        type: "networkInterface",
        function: faker.system.networkInterface,
      },
      {
        type: "semver",
        function: faker.system.semver,
      },
    ],
  },
  {
    group: "vehicle",
    functions: [
      {
        type: "bicycle",
        function: faker.vehicle.bicycle,
      },
      {
        type: "vehicleColor",
        function: faker.vehicle.color,
      },
      {
        type: "fuel",
        function: faker.vehicle.fuel,
      },
      {
        type: "manufacturer",
        function: faker.vehicle.manufacturer,
      },
      {
        type: "vehicleModel",
        function: faker.vehicle.model,
      },
      {
        type: "vehicleType",
        function: faker.vehicle.type,
      },
      {
        type: "vehicle",
        function: faker.vehicle.vehicle,
      },
      {
        type: "vin",
        function: faker.vehicle.vin,
        displayName: "VIN",
      },
      {
        type: "vrm",
        function: faker.vehicle.vrm,
        displayName: "VRM",
      },
    ],
  },
  {
    group: "word",
    functions: [
      {
        type: "adjective",
        function: faker.word.adjective,
      },
      {
        type: "adverb",
        function: faker.word.adverb,
      },
      {
        type: "conjunction",
        function: faker.word.conjunction,
      },
      {
        type: "interjection",
        function: faker.word.interjection,
      },
      {
        type: "noun",
        function: faker.word.noun,
      },
      {
        type: "preposition",
        function: faker.word.preposition,
      },
      {
        type: "verb",
        function: faker.word.verb,
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
