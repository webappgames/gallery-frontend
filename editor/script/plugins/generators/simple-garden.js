var Plugins;
(function (Plugins) {
    var Generators;
    (function (Generators) {
        function SimpleGarden(images) {
            var min_size = 10;
            var distance_between_images = 1;
            var width = 4 * distance_between_images;
            images.forEach(function (image) {
                //r(image);
                width += image.width;
                width += distance_between_images;
            });
            var y = 0;
            var new_objects = [];
            images.forEach(function (image) {
                image.storey = '1NP';
                image.position.x = 0;
                image.position.y = y;
                y += image.height;
                new_objects.push(image);
            });
            return (new_objects);
            //r(width);
        }
        Generators.SimpleGarden = SimpleGarden;
    })(Generators = Plugins.Generators || (Plugins.Generators = {}));
})(Plugins || (Plugins = {}));
//# sourceMappingURL=simple-garden.js.map