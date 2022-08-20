String.prototype.limitLength = function (this: string, limit: number) {
  return this.length > limit ? this.substring(0, limit) + "..." : this;
};

export {};
