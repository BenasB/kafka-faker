export const messageDataFieldGenerationTypes = [
  "name",
  "date",
  "location",
] as const;

export type GenerationFunctions = Record<
  typeof messageDataFieldGenerationTypes[number],
  () => string
>;

const generationFunctions: GenerationFunctions = {
  name: () => "Benas" + Math.floor(Math.random() * 100),
  date: () => "Date" + Math.floor(Math.random() * 100),
  location: () => "Location" + Math.floor(Math.random() * 100),
};

export default generationFunctions;
