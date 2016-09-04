jQuery.fn.outerHTML = function (s) {
    var html = '';
    for (var i = 0, l = this.length; i < l; i++) {
        if (typeof this[i].outerHTML === 'string') {
            html += this[i].outerHTML;
        }
    }
    return (html);
};
//# sourceMappingURL=outer-html.js.map