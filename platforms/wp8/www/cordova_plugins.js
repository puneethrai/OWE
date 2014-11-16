cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.msopentech.websql/www/WebSQL.js",
        "id": "com.msopentech.websql.WebSQL",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/com.msopentech.websql/www/wp8/Database.js",
        "id": "com.msopentech.websql.Database"
    },
    {
        "file": "plugins/com.msopentech.websql/www/wp8/SqlTransaction.js",
        "id": "com.msopentech.websql.SqlTransaction"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.msopentech.websql": "0.0.7"
}
// BOTTOM OF METADATA
});