String.prototype.toFirstUpperCase = function (this: string) {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
