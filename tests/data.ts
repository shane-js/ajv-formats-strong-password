import { GeneratePasswordStrengthValidatorOptions } from "../src/addStrongPasswordFormat";

type PasswordCriteriaTestCaseParams = {
  testPasswordCriteria: GeneratePasswordStrengthValidatorOptions;
  testPassword: string;
  expectValidationRes: boolean;
  scenarioExtraInfo?: string;
};
type PasswordCriteriaTestCaseWithScenario = [
  string,
  PasswordCriteriaTestCaseParams
];

const minUpperTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: { minUpper: 0 },
    testPassword: "",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minUpper: 1 },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minUpper: 1, upperCharacters: "" },
    testPassword: "A",
    expectValidationRes: false,
    scenarioExtraInfo:
      "WITH upperCharacters override empty so 'A' should not count",
  },
  {
    testPasswordCriteria: { minUpper: 1 },
    testPassword: "A",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minUpper: 1, upperCharacters: "Ⓜ" },
    testPassword: "Ⓜ",
    expectValidationRes: true,
    scenarioExtraInfo: "WITH upperCharacters override 'Ⓜ' so should count",
  },
  {
    testPasswordCriteria: { minUpper: 20 },
    testPassword: "A",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minUpper: 20 },
    testPassword: "A".repeat(20),
    expectValidationRes: true,
  },
];
export const minUpperTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  minUpperTestCasesRaw.map((testCaseParams) => [
    `minUpper=${testCaseParams.testPasswordCriteria.minUpper} with password=${
      testCaseParams.testPassword
    } expect: ${testCaseParams.expectValidationRes}${
      testCaseParams.scenarioExtraInfo
        ? ` ${testCaseParams.scenarioExtraInfo}`
        : ""
    }`,
    testCaseParams,
  ]);

const minLowerTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: { minLower: 0 },
    testPassword: "",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minLower: 1 },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minLower: 1, lowerCharacters: "" },
    testPassword: "a",
    expectValidationRes: false,
    scenarioExtraInfo:
      "WITH lowerCharacters override empty so 'a' should not count",
  },
  {
    testPasswordCriteria: { minLower: 1 },
    testPassword: "a",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minLower: 1, lowerCharacters: "ⓦ" },
    testPassword: "ⓦ",
    expectValidationRes: true,
    scenarioExtraInfo: "WITH lowerCharacters override 'ⓦ' so should count",
  },
  {
    testPasswordCriteria: { minLower: 20 },
    testPassword: "a",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minLower: 20 },
    testPassword: "a".repeat(20),
    expectValidationRes: true,
  },
];
export const minLowerTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  minLowerTestCasesRaw.map((testCaseParams) => [
    `minLower=${testCaseParams.testPasswordCriteria.minLower} with password=${
      testCaseParams.testPassword
    } expect: ${testCaseParams.expectValidationRes}${
      testCaseParams.scenarioExtraInfo
        ? ` ${testCaseParams.scenarioExtraInfo}`
        : ""
    }`,
    testCaseParams,
  ]);

const minSpecialTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: { minSpecial: 0 },
    testPassword: "",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minSpecial: 1 },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minSpecial: 6 },
    testPassword: "!@#$*&",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minSpecial: 20 },
    testPassword: "!",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minSpecial: 24 },
    testPassword: "!@#$*&".repeat(4),
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minSpecial: 1, specialCharacters: "" },
    testPassword: "!",
    expectValidationRes: false,
    scenarioExtraInfo:
      "WITH specialCharacters override empty so '!' should not count",
  },
  {
    testPasswordCriteria: { minSpecial: 1, specialCharacters: "¤" },
    testPassword: "¤", // specifically something not in the default list
    expectValidationRes: true,
    scenarioExtraInfo: "WITH specialCharacters override of '¤'",
  },
  {
    testPasswordCriteria: { minSpecial: 1 },
    testPassword: "¤", // specifically something not in the default list
    expectValidationRes: false,
    scenarioExtraInfo:
      "WITHOUT specialCharacters override non-default should not count",
  },
];
export const minSpecialTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  minSpecialTestCasesRaw.map((testCaseParams) => [
    `minSpecial=${
      testCaseParams.testPasswordCriteria.minSpecial
    } with password=${testCaseParams.testPassword} expect: ${
      testCaseParams.expectValidationRes
    }${
      testCaseParams.scenarioExtraInfo
        ? ` ${testCaseParams.scenarioExtraInfo}`
        : ""
    }`,
    testCaseParams,
  ]);

const minDigitTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: { minDigit: 0 },
    testPassword: "",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minDigit: 1 },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minDigit: 1, digitCharacters: "" },
    testPassword: "1",
    expectValidationRes: false,
    scenarioExtraInfo:
      "WITH digitCharacters override empty so '1' should not count",
  },
  {
    testPasswordCriteria: { minDigit: 1 },
    testPassword: "1",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minDigit: 1, digitCharacters: "⓮" },
    testPassword: "⓮",
    expectValidationRes: true,
    scenarioExtraInfo: "WITH digitCharacters override '⓮' so should count",
  },
  {
    testPasswordCriteria: { minDigit: 20 },
    testPassword: "1",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minDigit: 20 },
    testPassword: "1".repeat(20),
    expectValidationRes: true,
  },
];
export const minDigitTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  minDigitTestCasesRaw.map((testCaseParams) => [
    `minDigit=${testCaseParams.testPasswordCriteria.minDigit} with password=${
      testCaseParams.testPassword
    } expect: ${testCaseParams.expectValidationRes}${
      testCaseParams.scenarioExtraInfo
        ? ` ${testCaseParams.scenarioExtraInfo}`
        : ""
    }`,
    testCaseParams,
  ]);

const minLengthTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: { minLength: 0 },
    testPassword: "",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minLength: 1 },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minLength: 1 },
    testPassword: ".",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: { minLength: 20 },
    testPassword: ".",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: { minLength: 20 },
    testPassword: ".".repeat(20),
    expectValidationRes: true,
  },
];
export const minLengthTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  minLengthTestCasesRaw.map((testCaseParams) => [
    `minLength=${testCaseParams.testPasswordCriteria.minLength} with password=${testCaseParams.testPassword} expect: ${testCaseParams.expectValidationRes}`,
    testCaseParams,
  ]);

const everythingTogetherTestCasesRaw: PasswordCriteriaTestCaseParams[] = [
  {
    testPasswordCriteria: {
      minUpper: 1,
      minLower: 1,
      minSpecial: 1,
      specialCharacters: "¤", // specifically something not in the default list
      minDigit: 1,
      minLength: 1,
    },
    testPassword: "",
    expectValidationRes: false,
  },
  {
    testPasswordCriteria: {
      minUpper: 1,
      minLower: 1,
      minSpecial: 1,
      specialCharacters: "¤", // specifically something not in the default list
      minDigit: 1,
      minLength: 4,
    },
    testPassword: "Aa¤1",
    expectValidationRes: true,
  },
  {
    testPasswordCriteria: {
      minUpper: 100,
      minLower: 100,
      minSpecial: 100,
      specialCharacters: "¤", // specifically something not in the default list
      minDigit: 100,
      minLength: 400,
    },
    testPassword: `${"A".repeat(100)}${"a".repeat(100)}${"¤".repeat(
      100
    )}${"1".repeat(100)}`,
    expectValidationRes: true,
  },
];
export const everythingTogetherTestCasesWithScenarioLabel: PasswordCriteriaTestCaseWithScenario[] =
  everythingTogetherTestCasesRaw.map((testCaseParams) => [
    `everythingTogether with passwordCriteria=${JSON.stringify(
      testCaseParams.testPasswordCriteria
    )} with password=${testCaseParams.testPassword} expect: ${
      testCaseParams.expectValidationRes
    }`,
    testCaseParams,
  ]);
