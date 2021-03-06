/*jslint node: true */
"use strict";

var NumericList = require('../lib/numeric-list');
var mocha = require('mocha');
var assert = require('assert');
var should = require('should');

describe('numeric list', function () {
    it('init', function () {
        var list = new NumericList();
        should.exist(list);
    });

    describe('push', function () {
        it('can add single positive number without error', function () {
            var list = new NumericList();
            list.push(1);
        });
        it('can add single negative number without error', function () {
            var list = new NumericList();
            list.push(-1);
        });
        it('can add zero without error', function () {
            var list = new NumericList();
            list.push(0);
        });
        it('can add decimal without error', function () {
            var list = new NumericList();
            list.push(1.1);
        });
        it('cannot add null', function () {
            var list = new NumericList();
            assert.throws(function () {
                list.push(null);
            }, Error, "Cannot add non-numberic values to meter");

        });
        it('cannot add string', function () {
            var list = new NumericList();
            assert.throws(function () {
                list.push('a');
            }, Error, "Cannot add non-numberic values to meter");

        });
    });

    describe('size', function () {
        it('given an empty list, size should return 0', function () {
            var list = new NumericList();
            list.size().should.equal(0);
        });

        it('given a list of one, size should return 1', function () {
            var list = new NumericList();
            list.push(0);
            list.size().should.equal(1);
        });

        it('given a list of five, size should return 5', function () {
            var list = new NumericList();
            list.push(0);
            list.push(0);
            list.push(0);
            list.push(0);
            list.push(0);
            list.size().should.equal(5);
        });
    });

    describe('sum', function () {
        it('given an empty list, sum should return 0', function () {
            var list = new NumericList();
            list.sum().should.equal(0);
        });

        it('given a list of one integer number, sum should return the number', function () {
            var list = new NumericList();
            list.push(5);
            list.sum().should.equal(5);
        });

        it('given a list of two integer numbers, sum should return the sum of the numbers', function () {
            var list = new NumericList();
            list.push(2);
            list.push(4);
            list.sum().should.equal(6);
        });

        it('given a list of five integer numbers, sum should return the sum of the numbers', function () {
            var list = new NumericList();
            list.push(1);
            list.push(2);
            list.push(3);
            list.push(4);
            list.push(5);
            list.sum().should.equal(15);
        });

        it('given a list of one decimal number, sum should return the number', function () {
            var list = new NumericList();
            list.push(5.5);
            list.sum().should.equal(5.5);
        });

        it('given a list of two decimal numbers, sum should return the sum of the numbers', function () {
            var list = new NumericList();
            list.push(2.2);
            list.push(4.4);
            list.sum().should.closeToEqual(6.6);
        });

        it('given a list of five decimal numbers, sum should return the sum of the numbers', function () {
            var list = new NumericList();
            list.push(1.1);
            list.push(2.2);
            list.push(3.3);
            list.push(4.4);
            list.push(5.5);
            list.sum().should.closeToEqual(16.5);
        });
    });

    describe('average', function () {
        it('given an empty list, average should return 0', function () {
            var list = new NumericList();
            list.average().should.be.closeToEqual(0);
        });

        it('given a list of one integer number, average should return the number', function () {
            var list = new NumericList();
            list.push(5);
            list.average().should.be.closeToEqual(5);
        });

        it('given a list of two integer numbers, sum should return the average of the numbers', function () {
            var list = new NumericList();
            list.push(4);
            list.push(6);
            list.average().should.be.closeToEqual(5);
        });

        it('given a list of five integer numbers, sum should return the average of the numbers', function () {
            var list = new NumericList();
            list.push(1);
            list.push(2);
            list.push(3);
            list.push(4);
            list.push(5);
            list.average().should.be.closeToEqual(3);
        });

        it('given a list of one decimal number, average should return the number', function () {
            var list = new NumericList();
            list.push(3.3);
            list.average().should.be.closeToEqual(3.3);
        });

        it('given a list of two decimal numbers, average should return the average of the numbers', function () {
            var list = new NumericList();
            list.push(2.2);
            list.push(4.4);
            list.average().should.be.closeToEqual(3.3);
        });

        it('given a list of five decimal numbers, average should return the average of the numbers', function () {
            var list = new NumericList();
            list.push(1.1);
            list.push(2.2);
            list.push(3.3);
            list.push(4.4);
            list.push(5.5);
            list.average().should.be.closeToEqual(3.3);
        });
    });

    describe('max', function () {
        it('given an empty list, max should return 0', function () {
            var list = new NumericList();
            list.max().should.be.equal(0);
        });
        it('given an single positive entry list, max should return that number', function () {
            var list = new NumericList();
            list.push(1);
            list.max().should.be.equal(1);
        });
        it('given an single negative entry list, max should return that number', function () {
            var list = new NumericList();
            list.push(-1);
            list.max().should.be.equal(-1);
        });
        it('given an all positive entry list with biggest at end, max should return the max', function () {
            var list = new NumericList();
            list.push(1);
            list.push(2);
            list.push(3);
            list.max().should.be.equal(3);
        });
        it('given an all positive entry list with biggest at beginning, max should return the max', function () {
            var list = new NumericList();
            list.push(31);
            list.push(22);
            list.push(13);
            list.max().should.be.equal(31);
        });
        it('given an all negative entry list, max should return the max', function () {
            var list = new NumericList();
            list.push(-31);
            list.push(-22);
            list.push(-13);
            list.max().should.be.equal(-13);
        });
        it('given an entry list with two same big numbers, max should return the max', function () {
            var list = new NumericList();
            list.push(2);
            list.push(1);
            list.push(2);
            list.max().should.be.equal(2);
        });
        it('w/decimal', function () {
            var list = new NumericList();
            list.push(1.1);
            list.push(1.9);
            list.push(2.1);
            list.max().should.be.equal(2.1);
        });
    });

    describe('min', function () {
        it('given an empty list, min should return 0', function () {
            var list = new NumericList();
            list.min().should.be.equal(0);
        });
        it('given an single positive entry list, min should return that number', function () {
            var list = new NumericList();
            list.push(1);
            list.min().should.be.equal(1);
        });
        it('given an single negative entry list, min should return that number', function () {
            var list = new NumericList();
            list.push(-1);
            list.min().should.be.equal(-1);
        });
        it('given an all positive entry list with smallest at end, min should return the min', function () {
            var list = new NumericList();
            list.push(3);
            list.push(2);
            list.push(1);
            list.min().should.be.equal(1);
        });
        it('given an all positive entry list with smallest at beginning, min should return the min', function () {
            var list = new NumericList();
            list.push(13);
            list.push(22);
            list.push(31);
            list.min().should.be.equal(13);
        });
        it('given an all negative entry list, min should return the min', function () {
            var list = new NumericList();
            list.push(-31);
            list.push(-22);
            list.push(-13);
            list.min().should.be.equal(-31);
        });
        it('given an entry list with two same small numbers, min should return the min', function () {
            var list = new NumericList();
            list.push(1);
            list.push(1);
            list.push(2);
            list.min().should.be.equal(1);
        });
        it('w/decimal', function () {
            var list = new NumericList();
            list.push(1.1);
            list.push(1.9);
            list.push(2.0);
            list.min().should.be.equal(1.1);
        });
    });


    it('pushing a list of 100,000 numbers and calculating sum/ave should run within milliseconds', function () {
        this.timeout(1000);

        var testsize = 100000;
        var list = new NumericList();

        for (var i = 1; i <= testsize; i++) {
            list.push(i);
        }

        function getExpected(n) {
            return {
                size: n,
                average: (1 + n) / 2,
                sum: n * (1 + n) / 2
            }
        }

        var expected = getExpected(testsize);

        list.size().should.be.closeToEqual(expected.size);
        list.sum().should.be.closeToEqual(expected.sum);
        list.average().should.be.closeToEqual(expected.average);
        list.min().should.be.equal(1);
        list.max().should.be.equal(100000);
    });

    should.Assertion.add('closeToEqual',
        function (expected) {
            var actual = this.obj;
            actual.toFixed(2).should.equal(expected.toFixed(2));
        });

});