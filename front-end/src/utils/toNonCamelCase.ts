const toNonCamelCase = (name: string) => {
  const replaced = name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return replaced.charAt(0).toUpperCase() + replaced.slice(1);
};

String.prototype.toNonCamelCase = function (this: string) {
  return toNonCamelCase(this);
};

export default toNonCamelCase;
