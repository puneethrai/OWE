/*global describe, beforeEach, it, expect, spyOn, Backbone, TransactionRouter, FriendCollection ,templates, xit*/
(function (jasmine, describe, beforeEach, it, expect, spyOn, Backbone, TransactionRouter, FriendCollection, templates, xit, TransactionCollection, TransactionModel, DataLayer, ViewTransactions) {
    describe("Friend", function () {
        var loaded = false;

        beforeEach(function (done) {
            if (!loaded) {
                templates.load({
                    names: ['Friend', 'Friends'],
                    modulePath: 'www/js/friends',
                    templatePath: 'templates',
                    moduleName: 'friend'
                }, function () {
                    loaded = true;
                    done();
                });
            } else {
                done();
            }
        });
        describe("Router", function () {
            var FR;
            beforeEach(function () {
                Backbone.history.stop();
                spyOn(FriendRouter.prototype, 'onFriend');
                FR = new FriendRouter();
                Backbone.history.start();
            });

            it("should have one route", function () {
                expect(Object.keys(FR.routes).length).toEqual(1);
            });

            it("should be listen to friend url change", function () {
                Backbone.history.navigate("friends", {
                    trigger: true
                });
                expect(FR.onFriend).toHaveBeenCalled();
            });
        });


        describe("Collection", function () {
            beforeEach(function () {});
            xit("should able to fetch data from abstraction layer", function () {

            });
            xit("should able to add model and notify the same", function () {

            });
            xit("should not create new model when creating with invalid name ", function () {

            });
        });

        describe("Model", function () {
            beforeEach(function () {});
            xit("should able to add user and notify the change", function () {

            });
            xit("should not allow invalid name to be passed", function () {

            });
            xit("should able to delete and notify the same", function () {

            });
            xit("should delete if it can't save on to persistence layer", function () {

            });

        });

        describe("Views:friends", function () {
            beforeEach(function () {});
            xit("should update the view upon render", function () {

            });
            xit("should listen for user click event on add user", function () {

            });
            xit("should listen for add and remove event of Friends collection and update the UI", function () {

            });
            xit("should listen for add and remove event of friends collection and update the UI", function () {

            });
        });

        describe("Views:friends", function () {
            beforeEach(function () {});
            xit("should update the view upon render", function () {

            });
            xit("should listen for user click event on close button", function () {

            });

            xit("should listen for destroy event of model", function () {

            });

            xit("should listen for change in name of its model", function () {

            });
        });
    });
}(window.jasmine,
    window.describe,
    window.beforeEach,
    window.it,
    window.expect,
    window.spyOn,
    window.Backbone,
    window.TransactionRouter,
    window.FriendCollection,
    window.templates,
    window.xit,
    window.TransactionCollection,
    window.TransactionModel,
    window.DataLayer,
    window.ViewTransactions));