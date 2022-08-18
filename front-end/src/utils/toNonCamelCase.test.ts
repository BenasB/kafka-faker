test("Simple cases", () => {
  expect("helloWorld".toNonCamelCase()).toBe("Hello world");
  expect("itHandlesMultipleWords".toNonCamelCase()).toBe(
    "It handles multiple words"
  );
});

export {};
