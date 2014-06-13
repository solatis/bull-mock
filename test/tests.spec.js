var chai = require('chai');
chai.use(require('chai-interface'));

var Bull = require('..');

describe('When setting a handler multiple times', function () {

    it('Should throw an error', function () {

        var queue = new Bull('myQueue');

        queue.process(function (job) {});
        chai.expect(queue.process.bind(queue)).to.throw(/Cannot define a handler more than once per Queue instance/);
    });

});

describe('When adding an item without a handler', function () {

    it('Should throw an error', function () {
        var queue = new Bull('myQueue');
        chai.expect(queue.add.bind(queue)).to.throw(/Mocking version requires handler to be set before first add/);
    });
});



describe('When adding an item with a handler', function () {

    it('Should be processed', function (testDone) {
        var queue = new Bull('myQueue');

        queue.process(function (job, jobDone) {
            chai.expect(job.data).to.equal('test');
            jobDone();
            testDone();
        });

        queue.add('test');
    });
});
