# ajv-formats-strong-password

Easy way to add configurable strong password format to ajv to use in schema validations

## installation

` npm install ajv-formats-strong-password --save`

## setup

Similar flow as ajv-formats, you simply import the `addStrongPasswordFormat` function and then pass it your ajv instance and the requirements you've determined for the password.

Example:

```
import ajv from 'ajv';
import addStrongPasswordFormat from 'ajv-formats-strong-password';

const ajv = new Ajv();
const myPasswordCriteriaObj = {
    ... // see below
}
ajv.addStrongPasswordFormat({
    ajvInstance: ajv,
    passwordCriteria: myPasswordCriteriaObj
});

```

Where the `passwordCriteria` parameter of `addStrongPasswordFormat` accepts an object with the following properties:

- minUpper?: number
  - minimum # of uppercase letters required
  - defaults to 0
- minLower?: number
  - minimum # of uppercase letters required
  - defaults to 0
- minSpecial?: number
  - minimum # of special characters required
  - defaults to 0
- minDigit?: number
  - minimum # of digits required
  - defaults to 0
- minLength?: number
  - minimum length of the overall password
  - defaults to 0
  - NOTE: If the sum of minUpper, minLower, minSpecial, and minDigit is larger than minLength it uses that sum as the effective max length and ignores this parameter
- upperCharacters?: string
  - characters that count towards minUpper requirement
  - defaults to "ABCDEFGHIJKLMNOPQRSTUVWXYZ" (ignoring quotes)
- lowerCharacters?: string
  - characters that count towards minLower requirement
  - defaults to "abcdefghijklmnopqrstuvwxyz" (ignoring quotes)
- digitCharacters?: string
  - characters that count towards minDigit requirement
  - defaults to "0123456789" (ignoring quotes)
- specialCharacters?: string
  - characters that count towards minSpecial requirement
  - defaults to (values between wrapper single quotes, first character is a space last is a tilde) ' !\"#$%&'()\*+,-./:;<=>?@[\\]^\_`{|}~' as defined by OWASP https://owasp.org/www-community/password-special-characters

### extending defaults

If you desire just to add some characters to the out-of-the-box defaults you can import them as named imports, add to the strings, and pass those in using the `upperCharacters`/`lowerCharacters`/`digitCharacters`/`specialCharacters` properties of `passwordCriteria`. Those available to import include `defaultUpperCharacters`, `defaultLowerCharacters`, `defaultDigitCharacters`, and `defaultSpecialCharacters`.

Example:

```
import ajv from 'ajv';
import addStrongPasswordFormat, {defaultSpecialCharacters} from 'ajv-formats-strong-password';

const ajv = new Ajv();
const myPasswordCriteriaObj = {
    ...
    specialCharacters: `${defaultSpecialCharacters}¤ẟ▶`
    ...
}
ajv.addStrongPasswordFormat({
    ajvInstance: ajv,
    passwordCriteria: myPasswordCriteriaObj
});

```
