/*global describe, beforeEach, it, expect, spyOn, Backbone, TransactionRouter, FriendCollection ,templates, xit*/
describe("Friend", function () {
    var TR, FC, loaded = false;

    beforeEach(function (done) {
        if (!loaded) {
            templates.load({
                names: ['Friend', 'Friends'],
                modulePath: 'js/friends',
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
        beforeEach(function () {});

        xit("should have one route", function () {
        });

        xit("should be listen to friend url change", function () {
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