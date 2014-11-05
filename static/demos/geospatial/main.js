/* Main */

(function() {

    var loadDelay = intParam('loadDelay') || 0,
        modelURL = strParam('modelURL') || defaultModelURL(),
        encoderName = strParam('encoderName') || "coordinate";

    var container = $('#container');

    var model = new Cerebro2.NetworkReadonlyModel(modelURL),
        history = new Cerebro2.History(),
        historyConsumers = [];

    try {
        var visualization = new Cerebro2.FakeGeospatialCoordinateEncoderVisualization(container, history, encoderName);
        visualization.loadDelay = loadDelay;
        visualization.render();
        historyConsumers.push(visualization);
    }
    catch (e) {
        container.text(e);
    }

    runModel();

    /* Functions */

    function runModel() {
        model.getNextSnapshot(function(error, snapshot) {
            var delay = 1000;

            if (snapshot) {
                history.addSnapshot(snapshot);
                historyConsumers.forEach(
                    function (consumer) { consumer.historyUpdated(); }
                );

                delay = 0;
            }

            setTimeout(function() {
                runModel();
            }, delay);
        });
    }

    /* Utilities */

    function intParam(key) {
        return Number(strParam(key));
    }

    function strParam(key) {
        return $.url().fparam(key);
    }

    function defaultModelURL() {
        return "http://" + window.location.hostname + ":8080/_model";
    }

}());
