type ValidationFunction<T> = (value: T) => string[] | undefined;

const keyValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Key must not be empty"];
};

const topicValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Topic must not be empty"];
};

export default { keyValidation, topicValidation };
