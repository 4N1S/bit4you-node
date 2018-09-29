const bit4you = require('../index.js');
// Public API
const api_key="your_api_key";
const api_secret="your_api_secret";
const client = new bit4you(api_key,api_secret);



client.list(function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});
client.summaries(function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});

client.ticks("BTC","60",function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});

client.userinfo(function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});

client.scope(function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});

client.portfolio("list",function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});
client.portfolio("wallet",function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});
client.portfolio("history",function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});
client.portfolio("open-orders",function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});

client.wallets(function (error, data) {
	if(error) console.log("E!",error)
	console.log(data);

});
