/* Main */

Cerebro2.loadDelay = intParam('loadDelay') || 0;
Cerebro2.modelURL = strParam('modelURL') || defaultModelURL();

Cerebro2.container3D = $('#container-3D');
Cerebro2.container2D = $('#container-2D');

Cerebro2.model = new Cerebro2.NetworkReadonlyModel(Cerebro2.modelURL);
Cerebro2.history = new Cerebro2.History();
Cerebro2.visualization3D = new Cerebro2.ThreeDCellVisualization(Cerebro2.container3D, Cerebro2.history);
Cerebro2.visualization2D = new Cerebro2.TwoDCellVisualization(Cerebro2.container2D, Cerebro2.history);

Cerebro2.visualization3D.loadDelay = Cerebro2.loadDelay;
Cerebro2.visualization3D.render();

Cerebro2.visualization2D.loadDelay = Cerebro2.loadDelay;
Cerebro2.visualization2D.render();

Cerebro2.sync = new Cerebro2.GUISync(Cerebro2.visualization3D);
Cerebro2.sync.addChild(Cerebro2.visualization2D);

/* Functions */

Cerebro2.runModel = function () {
    Cerebro2.model.getNextSnapshot(function(error, snapshot) {
        var delay = 1000;

        if (snapshot) {
            Cerebro2.history.addSnapshot(snapshot);
            Cerebro2.visualization3D.historyUpdated();
            Cerebro2.visualization2D.historyUpdated();

            delay = 0;
        }

        setTimeout(function() {
            Cerebro2.runModel();
        }, delay);
    });
};

Cerebro2.runModel();

/* Utilities */

function intParam(key) {
    return Number(strParam(key));
}

function strParam(key) {
    return $.url().fparam(key);
}

function defaultModelURL() {
    return "http://" + window.location.hostname + ":9090/_model";
}
