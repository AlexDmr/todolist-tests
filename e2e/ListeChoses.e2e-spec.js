// import {browser, element, by, protractor} from "protractor";
describe('Premiers tests', function () {
    let inputNewTodo;
    beforeEach(function () {
        browser.get('');
        // Gets the button to call Jarvis
        inputNewTodo = element(by.css('input.new-todo'));
    });
    it('should display correct title', function () {
        expect(browser.getTitle()).toEqual('Liste de choses à faire');
    });
    it('should add 3 new item', function () {
        inputNewTodo.sendKeys("toto");
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        inputNewTodo.sendKeys("titi");
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        inputNewTodo.sendKeys("tata");
        browser.actions().sendKeys(protractor.Key.ENTER).perform();
        let items = element.all(by.css("item-chose"));
        expect(items.count()).toEqual(3);
        let cases = element.all(by.css("item-chose input.toggle"));
        cases.each(c => {
            expect(c.isSelected()).toBe(false);
        });
    });
});
//# sourceMappingURL=ListeChoses.e2e-spec.js.map