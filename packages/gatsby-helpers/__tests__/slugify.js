const { slugify } = require('../index');

describe('slugify', () => {
  it('string with colon', () => {
    expect(
      slugify(
        'Paris Under Curfew: Europe Reacts As Countries See Highest-Ever Coronavirus Numbers'
      )
    ).toBe(
      'paris-under-curfew-europe-reacts-as-countries-see-highest-ever-coronavirus-numbers'
    );
  });

  it('string with quotes', () => {
    expect(
      slugify(
        "In 'American Crisis,' New York Gov. Cuomo Gives Halftime Review Of Pandemic Response"
      )
    ).toBe(
      'in-american-crisis-new-york-gov-cuomo-gives-halftime-review-of-pandemic-response'
    );
  });

  it('string with number', () => {
    expect(
      slugify("Shakespeare's Original First Folio Sells For Almost $10 Million")
    ).toBe('shakespeare-s-original-first-folio-sells-for-almost-10-million');
  });
});
