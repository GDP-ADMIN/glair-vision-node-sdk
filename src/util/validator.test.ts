import { describe, expect, test } from "vitest";

import { isDefined, isNumberInRange, isValidURL, runSchemaValidation } from "./validator";

describe("isValidURL", () => {
  test("should return false", () => {
    const input = "not_an_url";

    expect(isValidURL(input)).toBe(false);
  });

  test("should return true", () => {
    const input = "https://www.google.com";

    expect(isValidURL(input)).toBe(true);
  });
});

describe("isDefined", () => {
  test("should return false", () => {
    const input = undefined;

    expect(isDefined(input)).toBe(false);
  });

  test("should return true", () => {
    const input = "";

    expect(isDefined(input)).toBe(true);
  });
});

describe("isString", () => {
  test("should return false", () => {
    const input = undefined;

    expect(isDefined(input)).toBe(false);
  });

  test("should return truefor string literal", () => {
    const input = "test_string";

    expect(isDefined(input)).toBe(true);
  });

  test("should return true for string object", () => {
    const input = new String("test_string");

    expect(isDefined(input)).toBe(true);
  });
});

describe("isNumberInRange", () => {
  test("should return true for value within range", () => {
    expect(isNumberInRange(2, 1, 4)).toBe(true);
  });

  test("should return true for min boundary", () => {
    expect(isNumberInRange(1, 1, 4)).toBe(true);
  });

  test("should return true for max boundary", () => {
    expect(isNumberInRange(4, 1, 4)).toBe(true);
  });

  test("should return false for value below min", () => {
    expect(isNumberInRange(0, 1, 4)).toBe(false);
  });

  test("should return false for value above max", () => {
    expect(isNumberInRange(5, 1, 4)).toBe(false);
  });

  test("should return false for NaN", () => {
    expect(isNumberInRange(NaN, 1, 4)).toBe(false);
  });

  test("should return false for non-number types", () => {
    expect(isNumberInRange("2", 1, 4)).toBe(false);
    expect(isNumberInRange(undefined, 1, 4)).toBe(false);
    expect(isNumberInRange(null, 1, 4)).toBe(false);
  });
});

describe("runSchemaValidation", () => {
  test("should return validation errors", () => {
    const schema = {
      foo: (val: any) => (val === "bar" ? "" : "not good"),
    };

    const obj = {
      foo: "baz",
    };

    const result = runSchemaValidation(obj, schema);

    expect(result).toStrictEqual([
      {
        key: "foo",
        message: "not good",
      },
    ]);
  });

  test("should return empty errors", () => {
    const schema = {
      foo: (val: any) => (val === "bar" ? "" : "not good"),
    };

    const obj = {
      foo: "bar",
    };

    const result = runSchemaValidation(obj, schema);

    expect(result).toStrictEqual([]);
  });
});
