var _ = require('underscore');
var NumericList = require('./NumericList');
var Stopwatch = require('statman-stopwatch');

function Meter() {
    this._events = new NumericList();
}

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
    meterEvent.stop = function() {
        meterEventStopwatch.stop();
        meter.record(meterEventStopwatch);
    }

    return meterEvent;
};

module.exports = Meter;