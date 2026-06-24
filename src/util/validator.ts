export function isValidURL(val: string) {
  try {
    new URL(val);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function isDefined(val: unknown) {
  return val !== undefined;
}

export function isString(val: unknown) {
  return typeof val === "string";
}

export function isNumberInRange(val: unknown, min: number, max: number) {
  return typeof val === "number" && !isNaN(val) && val >= min && val <= max;
}

export function runSchemaValidation(
  obj: Record<string, any>,
  schema: Record<string, (val: any) => string>
) {
  const result = [];

  for (const [key, validatorFn] of Object.entries(schema)) {
    const val = obj[key];

    result.push({
      key,
      message: validatorFn(val),
    });
  }

  return result.filter((res) => !!res.message);
}
