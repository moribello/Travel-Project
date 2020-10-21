const fieldChecker = require('../src/client/js/fieldChecker')

    import{ validateText } from "../src/client/js/fieldChecker";

    test('Checks for True or False response', () => {
    expect(validateText("").toBeFalsy);
})
