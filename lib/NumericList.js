var _ = require('underscore');

function NumbericList() {
    this._values = [];
}

// can push either:
// number
// or
// object with a "value" field

NumbericList.prototype.push = function (item) {
    var entry;
    if (_.isNumber(item)) {
        entry = {value: item};
    } else {
        entry = item;
    }
    this._values.push(entry);
};

NumbericList.prototype.size = function () {
    return this._values.length;
};

NumbericList.prototype.sum = function () {
    var self = this;

    var sum = _.reduce(self._values, function (cumlative, entry) {
        return cumlative + entry.value;
    }, 0);

    return sum;
};

NumbericList.prototype.max = function () {
    var self = this;

    var max = _.reduce(self._values, function (cumlative, entry) {
        console.log('cumlative %d, entry %d', cumlative, entry.value);
        if (cumlative) {
            return Math.max(cumlative, entry.value);
        } else {
            return entry.value;
        }
    }, null);

    if (max)
        return max;
    else
        return 0;
};

NumbericList.prototype.average = function () {
    var self = this;

    var sum = self.sum();

    var count = self._values.length;
    var average;
    if (count == 0) {
        average = 0;
    } else {
        average = sum / count;
    }

    return average;
};

module.exports = NumbericList;