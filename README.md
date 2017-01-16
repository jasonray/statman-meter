# statman-meter [![Build Status](https://travis-ci.org/jasonray/statman-meter.svg?branch=master)](https://travis-ci.org/jasonray/statman-meter) [![on npm](http://img.shields.io/npm/v/statman-meter.svg?style=flat)](https://www.npmjs.org/package/statman-meter)
statman-meter is one of the metrics from the statman library. Loosely based upon codehale metric package, a meter provides count and average information over a period of time.

This can be used to instrument call that may be expensive:
- incoming web service calls
- outbound calls to a subsystem
- expensive algorithms

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

#Use it!
## Option 1: init, record values, read 
```
var meter = new Meter('webservice-calls');
meter.record(2000); //record that a call occurred for 2000 milliseconds
meter.record(4000); //record that a call occurred for 4000 milliseconds
meter.count()       //reports that there have been 2 calls 
meter.getAverage(); //reports that the average call is taking 3000 milliseconds
```

## Option 2: init, record stopwatch, read 
```
var meter = new Meter('webservice-calls');
var stopwatch = new Stopwatch();
stopwatch.start();
..
stopwatch.stop();
meter.record(stopwatch); //record that a call occurred and gets value from stopwatch.read()
meter.count()       //reports number of calls
meter.getAverage(); //reports the average timing of the calls
```

For more info on stopwatch, see (`statman-stopwatch`)[https://github.com/jasonray/statman-stopwatch]

## Option 3: init, start event, stop event
```
var meter = new Meter('webservice-calls');
var event = meter.startEvent();
..
var event = stop();
meter.count()       //reports number of calls
meter.getAverage(); //reports the average timing of the calls
```

# Build it!
- Make sure that you have `node` and `npm` installed
- Clone source code to you local machine
- Setup dependencies: `npm install`
- run tests: `npm test`


