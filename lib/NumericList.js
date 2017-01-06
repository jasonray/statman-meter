var _ = require('underscore');

function NumbericList() {
    this._values = [];

    this._totals = {
        sum: 0,
        max: null,
        min: null
    };
}

// can push either:
// number
// or
// object with a "value" field

NumbericList.prototype.push = function (item) {
    var self = this;

    var entry;
    if (_.isNumber(item)) {
        entry = {value: item};
    } else if ((_.isObject(item) && (_.isNumber(item.value) ))) {
        entry = item;
    } else {
        throw new Error('Cannot add non-numberic values to meter');
    }

    self._values.push(entry);
    updateTotal(entry.value);

    function updateTotal(value) {
        self._totals.sum += value;

        self._totals.max = self._safeRead(self._totals.max, value, Math.max(self._totals.max, value));
        self._totals.min = self._safeRead(self._totals.min, value, Math.min(self._totals.min, value));
    }
};

NumbericList.prototype._safeRead = function (runningTotal, valueIfNoRunningTotal, valueIfRunningTotal) {
    if (runningTotal) {
        return valueIfRunningTotal;
    } else {
        return valueIfNoRunningTotal;
    }
}

NumbericList.prototype.size = function () {
    return this._values.length;
};

NumbericList.prototype.sum = function () {
    var self = this;
    return self._totals.sum;
};

NumbericList.prototype.max = function () {
    var self = this;
    if (self._totals.max)
        return self._totals.max;
    else
        return 0;
};

NumbericList.prototype.min = function () {
    var self = this;
    if (self._totals.min)
        return self._totals.min;
    else
        return 0;
};

NumbericList.prototype.average = function () {
    var self = this;

    var sum = self.sum();
    var count = self.size();
    var average;
    if (count == 0) {
        average = 0;
    } else {
        average = sum / count;
    }

    return average;
};

module.exports = NumbericList;