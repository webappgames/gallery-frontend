var Plugins;
(function (Plugins) {
    var Generators;
    (function (Generators) {
        function SimpleGarden(images) {
            var min_size = 10;
            var distance_between_images = 1;
            var width = 4 * distance_between_images;
            images.forEach(function () {
                width += images.width;
                width += distance_between_images;
            });
        }
        Generators.SimpleGarden = SimpleGarden;
    })(Generators = Plugins.Generators || (Plugins.Generators = {}));
})(Plugins || (Plugins = {}));
//# sourceMappingURL=simple-garden.js.map