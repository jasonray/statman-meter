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
        assert.equal(meter.getAverage(), 3);
    });

    it.skip('if record contains decimal numbers, provide this number in average', function () {
        var meter;
        meter = new Meter();
        meter.record(2.2);
        meter.record(4.4);
        TestHelper.assertCloseEnough(meter.getAverage(), 3.3);
    });

    it.skip('given record using stopwatch, average should still return averages', function (done) {
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
            TestHelper.assertCloseEnough(meter.getCount(), 2);
            TestHelper.assertCloseEnough(meter.getAverage(), 300);
            done();
        }, 500);
    });

    should.Assertion.add('closeToEqual',
        function (expected) {
            var actual = this.obj;
            actual.toFixed(2).should.equal(expected.toFixed(2));
        });



});