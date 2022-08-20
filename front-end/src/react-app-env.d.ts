/// <reference types="react-scripts" />

declare interface String {
  toFirstUpperCase(): string;
  toNonCamelCase(): string;
  limitLength(limit: number): string;
}
