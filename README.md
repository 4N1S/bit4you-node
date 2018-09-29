# Bit4you SDK Nodejs 

## Synopsis

This projects helps you to make HTTP requests to the bit4you API.


## Installation

```sh
npm install bit4you-node
```

```javasctipt
const bit4you = require('bit4you-node');
```

```javasctipt

const api_key="your_api_key";
const api_secret="your_api_secret";
const client = new bit4you(api_key,api_secret);
```

## Bit4YOU

bit4you is an European crypto assets exchange platform, facilitating the first step into the crypto world.



## API Index
The API is available  https://docs.bit4you.io/


## Methods

* [list](#list)
* [summaries](#summaries)
* [ticks](#ticks)
* [userinfo](#userinfo)
* [scope](#scope)
* [portfolio](#portfolio)
* [wallets](#wallets)



### list

**Response**

```javasctipt
[ { iso: 'BTC',
    name: 'Bitcoin',
    precision: 2,
    value: 6618,
    change: -0.07,
    spread: 2,
    category: 'Crypto' },
  { iso: 'ETH',
    name: 'Ethereum',
    precision: 2,
    value: 232,
    change: 5.19,
    spread: 2,
    category: 'Crypto' }
]
```

**Examples**
Request:
    /list

    param: 


```javasctipt
 client.list(function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);




 });

```


### summaries

**Response**

```javasctipt
[
  { market: 'ZEC',
    marketCap: 657703448,
    high: 137.76984895,
    low: 131,
    volume: 65950.33128146,
    last: 133.4,
    prevDay: 138.16997249,
    bid: 130.7,
    ask: 134.74,
    open: 136.28627666 },
  { market: 'XRP',
    marketCap: 22709816914,
    high: 0.595,
    low: 0.52602262,
    volume: 2763724.1049076,
    last: 0.57232478,
    prevDay: 0.53133602,
    bid: 0.558,
    ask: 0.5874,
    open: 0.54381445 } 
  ]

```

**Examples**
Request:
    /summaries 

    param: 


```javasctipt
  client.summaries(function (error, data) {
    if(error) console.log("E!",error)
    console.log(data);

  });
```

### ticks

**Response**

```javasctipt
[
  { time: 1530828000,
    open: 6482.91,
    close: 6525.53,
    low: 6481,
    high: 6550.32210932,
    volume: 179456 },
  { time: 1530831600,
    open: 6521.32,
    close: 6525.67,
    low: 6507.82,
    high: 6556.84,
    volume: 190468 },
  { time: 1530835200,
    open: 6525.67,
    close: 6530.49895046,
    low: 6512.18,
    high: 6557.99020718,
    volume: 214023 },
]
```

**Examples**
Request:
    /ticks 

    param: 
    currency: BTC ETH BCH available ,
    interval: ihterval

```javasctipt
client.ticks("BTC","60",function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);

});


```

### userinfo

**Response**

```javasctipt
{
  "sub":52,
  "iss":"https://auth.bit4you.io/",
  "aud":"XXXXXX",
  "iat":1538242205,
  "auth_time":1538242205,
  "verified":true,
  "name":"Anis Haboubi",
  "family_name":"Haboubi",
  "given_name":"Anis",
  "middle_name":"",
  "gender":"male",
  "zoneinfo":"Europe/Paris",
  "locale":"en-EN",
  "currency":"EUR",
  "updated_at":"2018-09-15T13:05:02.000Z",
  "id_expiration":null,
  "nationality":null
}

```

**Examples**
Request:
    /userinfo 

    param: 

```javasctipt
client.userinfo(function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);

});
```


### scope

**Response**

```javasctipt
{
"scopes":
  ["openid","profile","portfolio:read","wallets:read","service:XXXXXXXXXX"]
}
```

**Examples**
Request:
    /scope 

    param: 

```javasctipt
client.scope(function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);

});

```
### portfolio

**Response**

```javasctipt
{"items":
  [
    {
    "id":25,
    "market":"ETH",
    "invested":218.8763,
    "quantity":0.997093,
    "baseCurrency":"USDT",
    "open_time":1537177220
    }
  ],"wallet":6.7237}
```

**Examples**
Request:
    /portfolio 

    param: 
    type : create-order,cancel-order,close,history,list,wallet,open-orders


```javasctipt
const type="list"
client.portfolio(type,function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);

});

```
### wallets

**Response**

```javasctipt
[
{"iso":"USDT","name":"Tether USDT","balance":6.7237},{"iso":"BTC","name":"Bitcoin","balance":0},{"iso":"BCH","name":"Bitcoin Cash","balance":0},{"iso":"XRP","name":"Ripple","balance":0},{"iso":"LTC","name":"Litecoin","balance":0},{"iso":"ZEC","name":"Zcash","balance":0},{"iso":"DASH","name":"Dash","balance":0},{"iso":"ETH","name":"Ethereum","digits":18,"balance":0.997093},{"iso":"ETC","name":"Ethereum Classic","digits":18,"balance":0},{"iso":"TRX","name":"Tron","digits":6,"balance":0},{"iso":"OMG","name":"OmiseGO","digits":18,"balance":0}
]
```

**Examples**
Request:
    /wallets 

    param: 

```javasctipt
client.wallets(function (error, data) {
  if(error) console.log("E!",error)
  console.log(data);

});

```


## Contributors

Anis Haboubi

## License

See [LICENSE.txt](LICENSE.txt) for more info.