function runGenerator(generatorFunction) {
    var images = objects.filter(function (object) {
        return (object.type === 'image');
    });
    r(images);
    //generatorFunction();
}
//# sourceMappingURL=plugins.js.map