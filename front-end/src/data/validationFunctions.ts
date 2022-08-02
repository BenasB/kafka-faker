type ValidationFunction<T> = (value: T) => string[] | undefined;

const nameValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Name must not be empty"];
};

const topicValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Topic must not be empty"];
};

const schemaTitleValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Schema title must not be empty"];
};

export default { nameValidation, topicValidation, schemaTitleValidation };
