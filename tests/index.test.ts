import ajv from "ajv";
import addStrongPasswordFormat, {
  defaultUpperCharacters,
  defaultLowerCharacters,
  defaultDigitCharacters,
  defaultSpecialCharacters,
} from "../src";
import {
  minUpperTestCasesWithScenarioLabel,
  minLowerTestCasesWithScenarioLabel,
  minSpecialTestCasesWithScenarioLabel,
  minDigitTestCasesWithScenarioLabel,
  minLengthTestCasesWithScenarioLabel,
  everythingTogetherTestCasesWithScenarioLabel,
} from "./data";

const mockAjvSchema = {
  type: "object",
  properties: {
    password: { type: "string", format: "strong-password" },
  },
  required: ["password"],
};

describe("default passwordCriteria respected", () => {
  test("default numerical criteria zero", () => {
    const ajvTestInstance = new ajv();
    // @ts-expect-error: intentionally not passing passwordCriteria to test defaults
    addStrongPasswordFormat({
      ajvInstance: ajvTestInstance,
    });
    const validatorToTest = ajvTestInstance.compile(mockAjvSchema);
    expect(validatorToTest({ password: "" })).toBe(true);
  });

  test("default specialCharacters are ' !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'", () => {
    const ajvTestInstance = new ajv();
    addStrongPasswordFormat({
      ajvInstance: ajvTestInstance,
      passwordCriteria: {
        minSpecial: 33,
      },
    });
    const validatorToTest = ajvTestInstance.compile(mockAjvSchema);
    expect(
      validatorToTest({ password: " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~" })
    ).toBe(true);
  });
});

describe("passwordCriteria enforced", () => {
  test.each([
    ...minUpperTestCasesWithScenarioLabel,
    ...minLowerTestCasesWithScenarioLabel,
    ...minSpecialTestCasesWithScenarioLabel,
    ...minDigitTestCasesWithScenarioLabel,
    ...minLengthTestCasesWithScenarioLabel,
    ...everythingTogetherTestCasesWithScenarioLabel,
  ])(
    "scenario: %p",
    (scenario, { testPasswordCriteria, testPassword, expectValidationRes }) => {
      const ajvTestInstance = new ajv();
      addStrongPasswordFormat({
        ajvInstance: ajvTestInstance,
        passwordCriteria: testPasswordCriteria,
      });
      const validatorToTest = ajvTestInstance.compile(mockAjvSchema);
      expect(validatorToTest({ password: testPassword })).toBe(
        expectValidationRes
      );
    }
  );
});

describe("smoketest that default character sets are exported", () => {
  test("defaultUpperCharacters", () => {
    expect(defaultUpperCharacters).toBe("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  });

  test("defaultLowerCharacters", () => {
    expect(defaultLowerCharacters).toBe("abcdefghijklmnopqrstuvwxyz");
  });

  test("defaultDigitCharacters", () => {
    expect(defaultDigitCharacters).toBe("0123456789");
  });

  test("defaultSpecialCharacters", () => {
    expect(defaultSpecialCharacters).toBe(
      " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    );
  });
});
