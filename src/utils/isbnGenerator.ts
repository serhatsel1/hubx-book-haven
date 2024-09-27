interface IsbnGenerator {
  // generateISBN10(): string; // Uncomment if you want to implement ISBN-10 generation later
  generateISBN13(): string;
}

const isbnGenerator: IsbnGenerator = {
  // /**
  //  * Generates a random ISBN-10 number.
  //  * @returns {string} - The ISBN-10 number
  //  */
  // generateISBN10() {
  // },

  /**
   * Generates a random ISBN-13 number.
   * @returns {string} - The ISBN-13 number
   */
  generateISBN13() {
    let isbn = "978";
    let sum = 0;

    // Generate the first 12 digits
    for (let i = 0; i < 12; i++) {
      let digit = Math.floor(Math.random() * 10);
      isbn += digit;
      sum += i % 2 === 0 ? digit : 3 * digit; // Alternate between 1 and 3 as multipliers
    }

    // Calculate the check digit
    let checkDigit = 10 - (sum % 10);
    if (checkDigit === 10) {
      checkDigit = 0;
    }
    isbn += checkDigit;

    return isbn;
  },
};

export default isbnGenerator;
