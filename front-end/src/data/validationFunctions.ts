type ValidationFunction<T> = (value: T) => string[] | undefined;

const nameValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Name must not be empty"];
};

const topicValidation: ValidationFunction<string> = (value) => {
  const errors: string[] = [];
  if (value.length === 0) errors.push("Topic must not be empty");
  else if (!RegExp(/^[a-zA-Z0-9-_.]+$/).test(value))
    errors.push(
      "Topic must only contain letters, dots, dashes and underscores"
    );
  if (value.length > 255)
    errors.push("Topic must not contain more that 255 characters");

  return errors.length > 0 ? errors : undefined;
};

const schemaTitleValidation: ValidationFunction<string> = (value) => {
  return value.length > 0 ? undefined : ["Schema title must not be empty"];
};

export default { nameValidation, topicValidation, schemaTitleValidation };
