/* Main */

(function() {

    var loadDelay = intParam('loadDelay') || 0,
        modelURL = strParam('modelURL') || defaultModelURL();

    var container3D = $('#container-3D'),
        container2D = $('#container-2D');

    var model = new Cerebro2.NetworkReadonlyModel(modelURL),
        history = new Cerebro2.History(),
        sync = new Cerebro2.GUISync(),
        historyConsumers = [];

    addVisualization(Cerebro2.ThreeDCellVisualization, container3D,
        function(threeDVis) { sync.listenToMaster(threeDVis); });

    addVisualization(Cerebro2.TwoDCellVisualization, container2D,
        function(twoDVis) { sync.addChild(twoDVis); });

    runModel();

    /* Functions */

    function addVisualization(VisualizationClass, container, successCallback) {
        try {
            var visualization = new VisualizationClass(container, history);
            visualization.loadDelay = loadDelay;
            visualization.render();
            historyConsumers.push(visualization);
            successCallback(visualization);
        }
        catch (e) {
            container.text(e);
        }
    }

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