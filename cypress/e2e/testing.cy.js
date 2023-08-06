describe('Goodreads Automation Test', () => {
  const email = 'email';
  const password = 'password';
  const bookTitle = 'book_title';

  before(() => {
    // Log in before the test
    cy.visit('https://www.goodreads.com/');
    cy.contains('Sign In').click();
   
    cy.contains('Sign in with email').click();
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('input[type="submit"]').click();
    cy.contains('Find & read books').should('be.visible');
  });

  it('Search for a specific book title and mark it as "Want to Read"', () => {
    // Search for a specific book title
    cy.get('input[placeholder="Search books"]').type(bookTitle);
    cy.get('input[type="submit"]').click();
    cy.contains(bookTitle).then((foundText) => {
      const nextButton = foundText.next('button');
      cy.wrap(nextButton).should('be.visible').click();
    });
  });

  it('Remove the selected book from "My Books" list', () => {
    // Go to "My Books" page
    cy.contains('My Books').click();
    cy.contains(bookTitle).then((foundText) => {
      const nextImg = foundText.next('img');
      cy.wrap(nextImg).should('be.visible').click();
    });
  });
  after(() => {
  cy.contains('Sign out').click();
  });
});
