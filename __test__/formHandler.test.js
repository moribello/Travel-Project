const formHandler = require('../src/client/js/formHandler')

    import{ validateText } from "../src/client/js/formHandler";

    test('Sending \'This is a test\' to function', () => {
    expect("This is a test").toMatch(/test/);
})
