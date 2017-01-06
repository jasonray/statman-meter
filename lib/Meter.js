var _ = require('underscore');
var NumericList = require('./NumericList');
var Stopwatch = require('statman-stopwatch');

function Meter(name) {
    this._name = name;
    this._events = new NumericList();
}

Meter.prototype.name = function () {
    var self = this;
    return self._name;
};

Meter.prototype.record = function (item) {
    var eventTime;
    if (_.isNumber(item)) {
        eventTime = item;
    } else if (item instanceof Stopwatch) {
        eventTime = item.read();
    } else {
        eventTime = 0;
    }

    this._events.push(eventTime);
};

Meter.prototype.getCount = function () {
    return this._events.size();
};

Meter.prototype.getAverage = function () {
    return this._events.average();
};

Meter.prototype.startEvent = function () {
    var meter = this;

    meterEventStopwatch = new Stopwatch(true);
    meterEvent = {};
    meterEvent.stop = function () {
        meterEventStopwatch.stop();
        meter.record(meterEventStopwatch);
    }

    return meterEvent;
};

Meter.prototype.toString = function () {
    var self = this;

    if (self.name()) {
        var templateWithName = "[{name}: count:{value}; average:{average}]";
        return format(templateWithName, {name: self.name(), count: self.getCount(), average: self.getAverage()});
    } else {
        var templateWithoutName = "[count:{value}; average:{average}]";
        return format(templateWithoutName, {name: self.name(), count: self.getCount(), average: self.getAverage()});
    }
};


module.exports = Meter;