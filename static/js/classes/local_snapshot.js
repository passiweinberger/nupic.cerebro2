var LocalSnapshot = AbstractSnapshot.extend(function(base) {
    return {
        init: function(regionDimensions, activeCells, predictiveCells, proximalSynapses) {
            base.init.call(this, regionDimensions);

            this.activeCells = activeCells;
            this.predictiveCells = predictiveCells;
            this.proximalSynapses = proximalSynapses;
        },

        /* Public */
        
        getActiveCells: function(callback) {
            callback(null, _.clone(this.activeCells));
        },

        getPredictiveCells: function(callback) {
            callback(null, _.clone(this.predictiveCells));
        },

        getProximalSynapses: function(callback) {
            callback(null, _.clone(this.proximalSynapses));
        }
    };
});
