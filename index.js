
const _ = require('underscore'),
	  https = require('https'),
	  crypto = require('crypto'),
	  url = require('url'),
	  urlencode = require('urlencode'),
 	  querystring = require('querystring');
	  ClientOAuth2 = require('client-oauth2');
	  request = require('request');

const bit4you = function(api_key,api_secret,verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.host = "www.bit4you.io";
	this.uri = "/api/";
	this.api_key=api_key;
	this.api_secret=api_secret;
	this.baseURL = "https://www.bit4you.io/";
	this.userAgent = "bit4you-node";
	this.headers= {
			'User-Agent': this.userAgent
		}
};

bit4you.prototype.list = function(callback) {
	this.pubRequest("market/list", {}, function(err, data) {
		return callback(err, data);
	});
}
bit4you.prototype.summaries = function(callback) {
	this.pubRequest("market/summaries", {}, function(err, data) {
		return callback(err, data);
	});
}

bit4you.prototype.ticks = function(market,interval,callback) {
		const data=querystring.stringify({
		market:market,
		interval:interval,
	});
	this.pubRequestPOST("market/ticks", data, function(err, data) {
		return callback(err, data);

	});
}

bit4you.prototype.userinfo = function(callback) {
	this.privatereq("userinfo", {},function(err, data) {
		return callback(err, data);

	});
}
bit4you.prototype.scope = function(callback) {
	this.privatereq("token", {},function(err, data) {
		return callback(err, data);

	});
}
bit4you.prototype.portfolio = function(type,callback) {
	this.privatereq("portfolio/"+type, {},function(err, data) {
		return callback(err, data);

	});
}

bit4you.prototype.wallets = function(callback) {
	this.privatereq("wallet/balances", {},function(err, data) {
		return callback(err, data);

	});
}


bit4you.prototype.pubRequest = function(method, params, callback) {

	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose,
	  headers:this.headers
	};
	cb = function(res) {
		if (res.statusCode < 200 || res.statusCode > 299) {
		   callback(res.statusCode);
		 }
		if(res.statusCode==200){

		let str = '';
		res.on('data',(chunk) => {
			str += chunk;
			if (options.verbose) console.log(str);
		});


		res.on('end',() => {
			var objFromJSON;

				try {
					objFromJSON = JSON.parse(str);
					return callback(null, objFromJSON);
				}
				catch (err) {
					return callback(err, null);
				}
		});
		}
	}
	const req = https.get(options, cb);

	req.on('error', (err) =>{
		callback(err.status, null);
	});

	req.end();

};

bit4you.prototype.pubRequestPOST = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'POST',
	  verbose: this.verbose,
	  headers:{
	  	'User-Agent':this.userAgent,
		'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(params)
	  }
	};

	cb = function(response) {
		if (response.statusCode < 200 || response.statusCode > 299) {
		   callback(response.statusCode);
		 }
		if(response.statusCode==200){

		let str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});


		response.on('end', function () {
			var objFromJSON;

				try {
					objFromJSON = JSON.parse(str);
					return callback(null, objFromJSON);
				}
				catch (err) {
					return callback(err, null);
				}
		});
		}
	}
	const req = https.request(options, cb);
	req.write(params);

	req.on('error', function(err) {
		callback(err.status, null);
	});

	req.end();

};


bit4you.prototype.privatereq = function(method,params,callback){
	auth = new ClientOAuth2({accessTokenUri: ' https://auth.bit4you.io/token',scopes: ['openid','profile','portfolio:read','wallets:read']});

	return token=auth.owner.getToken(this.api_key,this.api_secret).then(function (user) {
		var access_token=user.data.access_token;
		return access_token;
		console.log(access_token);

	})
	.then(function(access_token){
		console.log(access_token);
		var host='www.bit4you.io';
		var path="/api/"+ method;
		if(method=="token" || method=="userinfo"){
			host="auth.bit4you.io";
			path="/"+method;

		}
		const options = {
		  hostname: host,
		  port: 443,
		  path: path,
		  method: 'GET',
		  headers:{
		 	  	'Authorization': "Bearer "+access_token,
		 		'Content-Type': 'application/json'
		  }
		};

		cb = function(res) {
			if (res.statusCode < 200 || res.statusCode > 299) {
			   console.log(res.statusCode);
			 }
			if(res.statusCode==200){

			var str = '';
			res.on('data',(chunk) => {
				str += chunk;
				if (options.verbose) console.log(str);
			});


			res.on('end',() => {
				var objFromJSON;

					try {
						// console.log("str",str);
						return callback(null,str);

					}
					catch (err) {
						return callback(err,null);
					}
			});
			}
		}
		const req = https.get(options, cb);
		req.on('error', (err) =>{
			console.log(err.status, null);
		});

		req.end();

	}).catch((err) => {
			return err;
	});	

}


module.exports = bit4you;
