Cerebro2.NetworkCoordinateEncoderRegion = Cerebro2.NetworkEncoderRegion.extend(function(base) {
    return {
        /* Public */

        getNeighbors: function(callback) {
            this.getList("neighbors", callback);
        },

        getTopWCoordinates: function(callback) {
            this.getList("top_w_coordinates", callback);
        },
    };
});

Fiber.mixin(Cerebro2.NetworkCoordinateEncoderRegion, Cerebro2.NetworkMixin);
