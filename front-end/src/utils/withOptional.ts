// Reference: https://github.com/Microsoft/TypeScript/issues/25760
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export default WithOptional;
