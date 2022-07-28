test("should capitalize first word", () => {
  expect("hello world!".toFirstUpperCase()).toBe("Hello world!");
});

test("should remain the same text", () => {
  expect("Hello world!".toFirstUpperCase()).toBe("Hello world!");
  expect(" hello world!".toFirstUpperCase()).toBe(" hello world!");
  expect("Hello world!".toFirstUpperCase()).toBe("Hello world!");
});

test("should return empty", () => {
  expect("".toFirstUpperCase()).toBe("");
});

export {};
