var DataLayer = {

        _connection : null,
        _currentIndex: 0,
        _db: null,
        /*
         * ENUM for db properties
         */
        PROPERTIES : {
            dbName : 'friends',
            dbVersion : '',
            dbDescription : 'Friend OWES',
            dbSize : 200000
        },
        //Database Queries List
        QUERIES : {
            //Create
            createTableQueryTransaction : "CREATE TABLE IF NOT EXISTS OTRANSACTION( id INTEGER PRIMARY KEY AUTOINCREMENT, userid INTEGER, amount DOUBLE, type DEFAULT "+"'+'"+")",
            //Insert
            insertIntoTransaction : 'INSERT INTO OTRANSACTION(id,userid,amount,type) VALUES (NULL,"',
            //Drop
            dropTransactionTable : " DROP TABLE IF EXISTS OTRANSACTION",
            //get
            selectAllFromTransaction : 'SELECT * FROM OTRANSACTION ORDER BY amount',
            //Search
            searchContact : "SELECT * FROM OTRANSACTION WHERE name LIKE '--S--%' OR mobileNo LIKE '--S--%' OR workNo LIKE '--S--%' OR homeNo LIKE '--S--%' OR avataruri LIKE '--S--%' OR email LIKE '--S--%' OR homeAdd LIKE '--S--%' OR workAdd LIKE '--S--%'  ORDER BY jid",
            searchExistingID : "SELECT * FROM OTRANSACTION WHERE id = ?",
            //Delete
            deleteTransaction : "DELETE FROM OTRANSACTION WHERE id = ?"
        },
        initialize: function(searchFor){

            var self = this,
                defer = $.Deferred();
            if(!self._db){
                //Open the database with the properties listed in the ENUM
                self._db = window.openDatabase(this.PROPERTIES.dbName, this.PROPERTIES.dbVersion, this.PROPERTIES.dbDescription, this.PROPERTIES.dbSize);
                if (self._db) {
                    //self._executeSql(self.QUERIES.dropTransactionTable, null, function(){
                        self._executeSql(self.QUERIES.createTableQueryTransaction,null,function(){
                            defer.resolve();
                        }, function(){
                            defer.reject();
                        });
                    //});
                }
            }
            return defer.promise();
        },
        getAllTransaction : function(){

            var self = this,
                defer = $.Deferred();
            if (self._db) {
                self._executeSql(self.QUERIES.selectAllFromTransaction,null,function(tx, transactions){
                    var tempModels = [],
                        transactionsIndex = 0;
                    for(var transactionsIndex = 0 ; transactionsIndex< transactions.rows.length ; transactionsIndex++){
                            defer.notify(transactions.rows.item(transactionsIndex));
                            tempModels.push(transactions.rows.item(transactionsIndex));
                        }
                    defer.resolve(tempModels);
                }, function(){
                    defer.reject();
                });
            }
            return defer.promise();
        },
        addTransaction : function(transactionData){

            var self = this,
                defer = $.Deferred();
            if (self._db) {
                self._executeSql(self.QUERIES.insertIntoTransaction
                    + transactionData.userid
                    + '","'
                    + transactionData.amount
                    + '","'
                    + transactionData.type
                    +'")',null,function(tx, transactions){
                    if(transactions.rows.length > 0) {
                        defer.resolve(transactions.rows.item(0));
                    } else {
                        defer.resolve(transactions.insertId);
                    }
                }, function(){
                    defer.reject();
                });
            }
            return defer.promise();
        },
        removeTransaction: function(id) {

            var self = this,
                defer = $.Deferred();
            self._executeSql(self.QUERIES.deleteTransaction,[id],function(tx,transactions){
                defer.resolve();
            }, function(){
                defer.reject();
            });
            return defer.promise();
        },
        _executeSql: function (SQL, params, successCallback, errorCallback, options) {
            var self = this;
            var success = function(tx,result) {
                self._logger(SQL+ (params?params:"--No prams--")+ " - finished","DEBUG","_executeSql");
                if(successCallback) successCallback(tx,result);
            };
            var error = function(tx,error) {
                self._logger(SQL+ (params?params:"--No prams--")+ " - error: " + error.message,"DEBUG","_executeSql");
                if(errorCallback) return errorCallback(tx,error);
            };

            if (options && options.transaction) {
                options.transaction.executeSql(SQL, params, success, error);
            }
            else {
                this._db.transaction(function(tx) {
                    tx.executeSql(SQL, params, success, error);
                });
            }
        },

        /*
         * @function: _logger
         * @description: logging function for Telephony router module
         * @params: message {String}: Message to log 
         * @params: type {String}: Type of log
         * Optional params
         * @params: functionName {String}: Name of the function
         * @params: fileName {String}: File Name
         */
        _logger: function(message,logType,functionName,fileName){
            if(!functionName && arguments.callee && arguments.callee.caller){
                //unable to get caller name since it may not be named function call
                functionName = arguments.callee.caller.name || arguments.callee.caller.toString();
            }
            console.log(message);
            /*app.context.notify(app.Events.Log,_.extend({
                message      : message,
                fileName     : fileName||"contact-abstraction",
                functionName : functionName,
                type         : logType
            },app.context.getSettings()));*/
        },
    }