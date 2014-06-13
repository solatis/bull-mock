var Queue = function () {

}

Queue.prototype.process = function (handler) {
    if (this.handler) throw Error("Cannot define a handler more than once per Queue instance");

    this.handler = handler;
}

Queue.prototype.add = function (data) {
    job = this.createJob(data);

    if (!this.handler) throw Error("Mocking version requires handler to be set before first add()");

    this.handler(job, function () {});
}

Queue.prototype.createJob = function (data) {
    return {
        'data': data
    };
}

module.exports = Queue;
