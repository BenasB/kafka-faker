export const messageDataFieldGenerationTypes = [
  "name",
  "date",
  "location",
] as const;

export interface GenerationFunction {
  type: typeof messageDataFieldGenerationTypes[number];
  function: () => string;
}

const generationFunctions: GenerationFunction[] = [
  {
    type: "name",
    function: () => "Benas" + Math.floor(Math.random() * 100),
  },
  {
    type: "date",
    function: () => "Date" + Math.floor(Math.random() * 100),
  },
  {
    type: "location",
    function: () => "Location" + Math.floor(Math.random() * 100),
  },
];

export default generationFunctions;
