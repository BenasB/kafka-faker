String.prototype.escapeSpecialCharacters = function (this: string) {
  return this.replace(/[\\]/g, "\\\\")
    .replace(/["]/g, '\\"')
    .replace(/[/]/g, "\\/")
    .replace(/[\b]/g, "\\b")
    .replace(/[\f]/g, "\\f")
    .replace(/[\n]/g, "\\n")
    .replace(/[\r]/g, "\\r")
    .replace(/[\t]/g, "\\t");
};

export {};
