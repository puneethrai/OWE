/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    accessList : "12",
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //load the transcation template
        DataLayer.initialize();
        templates.load({
            names: ['Transaction','Transactions'],
            modulePath: 'js/transactions',
            templatePath: 'templates',
            moduleName : 'transaction'
        }, function () {
            window.TR = new TransactionRouter();
            app.startHistory("1");
        });
        //load the friend template
        templates.load({
            names: ['Friend','Friends'],
            modulePath: 'js/friends',
            templatePath: 'templates',
            moduleName : 'friend'
        }, function () {
            window.FR = new FriendRouter();
            app.startHistory("2");
        });
    },
    startHistory: function(id){
        app.accessList = app.accessList.replace(id,"");
        if(app.accessList === ""){
            if(!Backbone.History.started){
                Backbone.history.start();
            }
            Backbone.history.navigate("transaction",{
                trigger: true,
                replace:true
            });
        }
    },
    scrollDown: function(scrollToValue, scrollwindow){
        if ($.fn.animate) {
            // Or you can animate the scrolling:Performance might get affected
            $(scrollwindow||"body").animate({
                scrollTop: scrollToValue
            });
        } else {
            $(scrollwindow||"body").scrollTop(scrollToValue);
        }
    }
};

app.initialize();