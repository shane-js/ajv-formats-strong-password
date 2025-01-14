import Ajv from "ajv";

export type GeneratePasswordStrengthValidatorOptions = {
  minUpper?: number;
  upperCharacters?: string;
  minLower?: number;
  lowerCharacters?: string;
  minDigit?: number;
  digitCharacters?: string;
  minSpecial?: number;
  specialCharacters?: string;
  minLength?: number;
};

// Define character sets
export const defaultUpperCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const defaultLowerCharacters = "abcdefghijklmnopqrstuvwxyz";
export const defaultDigitCharacters = "0123456789";
export const defaultSpecialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"; // as defined by OWASP https://owasp.org/www-community/password-special-characters

// Count the occurrences of characters in a string
const countCharacters = (str: string, characters: string): number => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (characters.includes(str[i])) {
      count++;
    }
  }
  return count;
};

export const generatePasswordStrengthValidator = ({
  minUpper = 0,
  minLower = 0,
  minDigit = 0,
  minSpecial = 0,
  minLength = 0,
  upperCharacters = defaultUpperCharacters,
  lowerCharacters = defaultLowerCharacters,
  digitCharacters = defaultDigitCharacters,
  specialCharacters = defaultSpecialCharacters,
}: GeneratePasswordStrengthValidatorOptions = {}) => {
  return (password: string) => {
    const effectiveMinLength = Math.max(
      minUpper + minSpecial + minDigit + minLower,
      minLength
    );

    // Check if the password meets the criteria
    const hasMinUpper = countCharacters(password, upperCharacters) >= minUpper;
    const hasMinLower = countCharacters(password, lowerCharacters) >= minLower;
    const hasMinDigit = countCharacters(password, digitCharacters) >= minDigit;
    const hasMinSpecial =
      countCharacters(password, specialCharacters) >= minSpecial;
    const hasMinLength = password.length >= effectiveMinLength;

    // Check if the password meets all criteria
    const isStrongPassword =
      hasMinUpper &&
      hasMinLower &&
      hasMinDigit &&
      hasMinSpecial &&
      hasMinLength;

    return isStrongPassword;
  };
};

type AddStrongPasswordFormatParams = {
  ajvInstance: Ajv;
  passwordCriteria: GeneratePasswordStrengthValidatorOptions;
};
export const addStrongPasswordFormat = ({
  ajvInstance,
  passwordCriteria,
}: AddStrongPasswordFormatParams): void => {
  const generatedPasswordStrengthValidator =
    generatePasswordStrengthValidator(passwordCriteria);
  ajvInstance.addFormat("strong-password", {
    type: "string",
    validate: (x) => generatedPasswordStrengthValidator(x),
  });
};
