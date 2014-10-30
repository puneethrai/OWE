/*global describe, beforeEach, it, expect, spyOn, Backbone, TransactionRouter, FriendCollection ,templates, xit*/
describe("Transaction", function () {
    var TR, FC, loaded = false;

    beforeEach(function (done) {
        if (!loaded) {
            templates.load({
                names: ['Transaction', 'Transactions'],
                modulePath: 'www/js/transactions',
                templatePath: 'templates',
                moduleName: 'transaction'
            }, function () {
                loaded = true;
                done();
            });
        } else {
            done();
        }
    });
    describe("Router", function () {
        beforeEach(function () {
            Backbone.history.stop();
            spyOn(TransactionRouter.prototype, 'onTransaction');
            TR = new TransactionRouter();
            Backbone.history.start();
        });
        it("should have one route", function () {
            expect(Object.keys(TR.routes).length).toEqual(1);
        });
        it("should be listen to transaction url change", function () {
            Backbone.history.navigate("transaction", {
                trigger: true
            });
            expect(TR.onTransaction).toHaveBeenCalled();
        });
    });


    describe("Collection", function () {
        beforeEach(function () {});
        xit("should able to fetch data from abstraction layer", function () {

        });
        xit("should able to add model and notify the same", function () {

        });
        xit("should not create new model when creating with invalid amount ", function () {

        });
    });

    describe("Model", function () {
        beforeEach(function () {});
        xit("should able to add amount and notify the change", function () {

        });
        xit("should not allow invalid amount to be passed", function () {

        });
        xit("should able to delete and notify the same", function () {

        });
        xit("should delete if it can't save on to persistence layer", function () {

        });

    });

    describe("Views:transactions", function () {
        beforeEach(function () {});
        xit("should update the view upon render", function () {

        });
        xit("should listen for user click event on debit or credit button", function () {

        });
        xit("should listen for add and remove event of transaction collection", function () {

        });
        xit("should listen for add event of transaction collection and update the UI", function () {

        });
        xit("should listen for remove event of transaction collection and update the UI", function () {

        });
        xit("should listen for add and remove event of transaction collection and update the UI", function () {

        });
    });

    describe("Views:transaction", function () {
        beforeEach(function () {});
        xit("should update the view upon render", function () {

        });
        xit("should listen for user click event on close button", function () {

        });

        xit("should listen for destroy event of model", function () {

        });

        xit("should listen for change in amount of its model", function () {

        });
    });
});