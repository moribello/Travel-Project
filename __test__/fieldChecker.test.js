const fieldChecker = require('../src/client/js/fieldChecker')

    import{ validateDate } from "../src/client/js/fieldChecker";

    test('Checks for True or False response', () => {
    expect(validateDate("Sun Nov 08 2020 00:00:00 GMT-0500 \(Eastern Standard Time\)").toBeFalsy);
})
