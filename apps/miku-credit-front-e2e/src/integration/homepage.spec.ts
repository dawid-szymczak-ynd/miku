import { getLeftTitle, getMainCTA } from '../support/homepage.po';

describe('homepage', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title and main call to action', () => {
    getLeftTitle().contains('Miku Credit');
    getMainCTA().contains('Take your money!');
  });
});
