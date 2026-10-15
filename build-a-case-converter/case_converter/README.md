# Case Converter
This package is used to convert strings to a specific case.

## Installation.

Install the package using npm:

```bash
npm install case-converter
```

## Usage.

```js
const caseConverter = require('case-converter');

// Convert to uppercase
console.log(caseConverter.getUpperCase('hello free code camp'));

// Convert to lowercase
console.log(caseConverter.getLowerCase('HELLO FREE CODE CAMP'));

// Convert to sentence case
console.log(caseConverter.getSentenceCase('hello free code camp'));

// Hello free code camp!
```

## License.

MIT