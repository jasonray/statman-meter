/*jslint node: true */
"use strict";

var Meter = require('../lib/Meter');
var mocha = require('mocha');
var assert = require('assert');
var StopWatch = require('statman-stopwatch');
var _ = require('underscore');
// var TestHelper = require('./testhelper');
var should = require('should');

describe('meter', function () {
    this.timeout(5000);

    it('init should return an instance of meter', function () {
        var meter;
        meter = new Meter();
        should.exist(meter);
    });

    describe('count', function () {
        it('record once and get count should return 1', function () {
            var meter;
            meter = new Meter();
            meter.record();
            meter.getCount().should.equal(1);
        });

        it('record twice and get count should return 2', function () {
            var meter;
            meter = new Meter();
            meter.record();
            meter.record();
            meter.getCount().should.equal(2);
        });
    });

    it('if record contains a number, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(5);
        meter.getAverage().should.equal(5);
    });

    it('if record contains integer numbers, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(2);
        meter.record(4);
        meter.getAverage().should.equal(3);
    });

    it('if record contains decimal numbers, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(2.2);
        meter.record(4.4);
        meter.getAverage().should.closeToEqual(3.3);
    });

    it('record() on invalid values will increment count and count as 0 in average', function () {
        var meter;
        meter = new Meter();
        meter.record('a');
        meter.record(null);
        meter.record({k: 'v'});
        meter.getCount().should.equal(3);
        meter.getAverage().should.equal(0);
    });

    it('given record using stopwatch, average should still return averages', function (done) {
        var meter = new Meter();
        var sw1 = new StopWatch();
        sw1.start();
        setTimeout(function () {
            sw1.stop();
            meter.record(sw1);
        }, 200);

        var sw2 = new StopWatch();
        sw2.start();
        setTimeout(function () {
            sw2.stop();
            meter.record(sw2);
        }, 400);

        setTimeout(function () {
            meter.getCount().should.equal(2);
            meter.getAverage().should.within(300, 320); //allow for some timing to be off, setTimeout not exact science
            done();
        }, 500);
    });

    it('meter.start() provides and event, which can be used to auto record meter', function (done) {
        var meter = new Meter();

        var meterEvent = meter.startEvent();
        setTimeout(function () {
            meterEvent.stop();

            meter.getCount().should.equal(1);
            meter.getAverage().should.within(200, 220); //allow for some timing to be off, setTimeout not exact science
            done();
        }, 200);

    });

    should.Assertion.add('closeToEqual',
        function (expected) {
            var actual = this.obj;
            actual.toFixed(2).should.equal(expected.toFixed(2));
        });

    describe('toString()', function () {
        it('toString() with name', function () {
            var meter;
            meter = new Meter('calls to subsystem');
            meter.record(2.2);
            meter.record(4.4);
            meter.toString().should.equal('[calls to subsystem: count:2; average:3.30]');
        });
        it('toString() without name', function () {
            var meter;
            meter = new Meter();
            meter.record(2.2);
            meter.record(4.4);
            meter.toString().should.equal('[count:2; average:3.30]');
        });
        it('toString() on empty', function () {
            var meter;
            meter = new Meter();
            meter.toString().should.equal('[count:0; average:0.00]');
        });
    });


});