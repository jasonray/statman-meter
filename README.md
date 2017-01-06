# statman-meter [![Build Status](https://travis-ci.org/jasonray/statman-meter.svg?branch=master)](https://travis-ci.org/jasonray/statman-meter) [![on npm](http://img.shields.io/npm/v/statman-meter.svg?style=flat)](https://www.npmjs.org/package/statman-meter)
statman-meter is one of the metrics from the statman library. Loosely based upon codehale metric package, a meter provides count and average information over a period of time

# Install it!
## Option 1: access directly
Install using npm:
```
npm install statman-meter
```

Reference in your app:
```
var Meter = require('statman-meter');
var meter = Meter('meter-name');
```

## Option 2: access from `statman`
Install using npm:
```
npm install statman
```

Reference in your app:
```
var statman = require('statman');
var meter = statman.Meter('meter-name');
```




