var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var r = console.log.bind(console);
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Array = (function () {
            function Array(objects) {
                if (objects === void 0) { objects = []; }
                this.objects = [];
                var self = this;
                objects.forEach(function (object) {
                    self.push(object);
                });
            }
            Array.prototype.getAll = function () {
                return this.objects;
            };
            Array.prototype.forEach = function (callback) {
                return this.objects.forEach(callback);
            };
            Array.prototype.push = function (object) {
                this.objects.push(GALLERY.Objects.Object.init(object));
            };
            /*filter(callback: (item: any)=>boolean):GALLERY.Objects.Array {
    
                var filtered_objects = new GALLERY.Objects.Array();
    
                //r(filtered_objects.05-objects);
    
                filtered_objects.objects = this.objects.filter(callback);
    
                return (filtered_objects);
    
            }*/
            Array.prototype.getObjectById = function (id) {
                for (var i = 0, l = this.objects.length; i < l; i++) {
                    if (this.objects[i].id == id)
                        return (this.objects[i]);
                }
                throw new Error('Unknown id ' + id);
            };
            Array.prototype.removeObjectById = function (id) {
                for (var i in this.objects) {
                    if (this.objects[i].id == id) {
                        this.objects.splice(i, 1);
                        return true;
                    }
                }
                return false;
            };
            Array.prototype.removeBlockOnPosition = function (position, storey) {
                //r(position);
                for (var i in this.objects) {
                    if (this.objects[i].type == 'block') {
                        //r(05-objects[i]);
                        if (this.objects[i].position.x == position.x && this.objects[i].position.y == position.y && this.objects[i].storey == storey) {
                            this.objects.splice(i, 1);
                            return true;
                        }
                    }
                }
                return false;
            };
            return Array;
        }());
        Objects.Array = Array;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Object = (function () {
            function Object(object) {
                object.storey = object.storey || '1NP';
                for (var key in object) {
                    var this_key = key;
                    if (this_key == '_id')
                        this_key = 'id'; //todo maybe better solution
                    this[this_key] = object[key];
                }
            }
            Object.init = function (object) {
                if (object instanceof GALLERY.Objects.Object) {
                    return (object);
                }
                //----------------------------------
                if (object.type == 'block') {
                    //r(GALLERY);
                    object = new GALLERY.Objects.Block(object);
                }
                else if (object.type == 'light') {
                    object = new GALLERY.Objects.Light(object);
                }
                else if (object.type == 'label') {
                    object = new GALLERY.Objects.Label(object);
                }
                else if (object.type == 'image') {
                    object = new GALLERY.Objects.Image(object);
                }
                else if (object.type == 'tree') {
                    object = new GALLERY.Objects.Tree(object);
                }
                else if (object.type == 'stairs') {
                    object = new GALLERY.Objects.Stairs(object);
                }
                else if (object.type == 'key') {
                    object = new GALLERY.Objects.Key(object);
                }
                else if (object.type == 'teleport') {
                    object = new GALLERY.Objects.Teleport(object);
                }
                else {
                    console.log(object);
                    throw new Error('Cant put item into Gallery Objects Array because of unrecognized object type ' + object.type);
                }
                //----------------------------------
                return (object);
            };
            Object.prototype.clone = function () {
                return (Object.init(JSON.parse(JSON.stringify(this))));
            };
            /*create$Element(){
                return this._create$Element();
            }*/
            Object.prototype._create$Element = function () {
                var object = this;
                var element = '<div></div>';
                var $element = $(element);
                if (typeof object.position !== 'undefined') {
                    $element.css('position', 'absolute');
                    //if (object.type !== 'image') {
                    $element.css('top', object.position.y * zoom_selected + window_center.y);
                    $element.css('left', object.position.x * zoom_selected + window_center.x);
                }
                //$element.addClass('object');
                $element.addClass(object.type);
                $element.attr('id', object.id);
                $element.css('width', zoom_selected);
                $element.css('height', zoom_selected);
                return ($element);
            };
            return Object;
        }());
        Objects.Object = Object;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
//r('created block');
//r(GALLERY.Objects.Object);
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Block = (function (_super) {
            __extends(Block, _super);
            function Block() {
                _super.apply(this, arguments);
            }
            Block.prototype.create$Element = function () {
                var $element = this._create$Element();
                //r($element);
                var object = this;
                $element.attr('data-shape', object.shape);
                $element.attr('data-material', object.material);
                $element.css('top', '-=' + 0.5 * zoom_selected);
                $element.css('left', '-=' + 0.5 * zoom_selected);
                object.material = object.material || 'stone-plain';
                $element.css('background', 'url("/images/textures/' + object.material + '.jpg")');
                $element.css('background-size', 'cover');
                if (['window', 'door', 'gate'].indexOf(object.shape) != -1) {
                    $element.html('<img src="/images/icons/' + object.shape + '.svg">');
                    $element.css('background-color', 'rgba(0,0,0,0.5)');
                    $element.css('background-blend-mode', 'overlay');
                }
                else if (object.shape == 'room') {
                    $element.css('background-color', 'rgba(0,0,0,0.5)');
                    $element.css('background-blend-mode', 'overlay');
                }
                else if (object.shape == 'none') {
                    $element.css('background', 'none');
                    $element.html('<i class="fa fa-times" aria-hidden="true"></i>');
                    $element.css('background-color', 'transparent');
                }
                return $element;
            };
            return Block;
        }(Objects.Object));
        Objects.Block = Block;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Image = (function (_super) {
            __extends(Image, _super);
            function Image() {
                _super.apply(this, arguments);
            }
            Image.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $image_0 = $('<img>').addClass('image-0').hide();
                var $image_90 = $('<img>').addClass('image-90').hide();
                var $image_180 = $('<img>').addClass('image-180').hide();
                var $image_270 = $('<img>').addClass('image-270').hide();
                $image_0.css('height', object.height * zoom_selected);
                $image_180.css('height', object.height * zoom_selected);
                $image_90.css('width', object.height * zoom_selected);
                $image_270.css('width', object.height * zoom_selected);
                var src = object.src;
                var src_uri = URI(src)
                    .removeSearch("width");
                var src_normal = src_uri.addSearch({ width: 100 }).toString();
                $image_0.attr('src', src_normal);
                $image_90.attr('src', src_normal + '&rotation=90');
                $image_180.attr('src', src_normal + '&rotation=180');
                $image_270.attr('src', src_normal + '&rotation=270');
                //rotateImage($image_90[0],90);
                //rotateImage($image_180[0],180);
                //rotateImage($image_270[0],270);
                if (object.rotation === 0)
                    $image_0.show();
                else if (object.rotation === 90)
                    $image_90.show();
                else if (object.rotation === 180)
                    $image_180.show();
                else if (object.rotation === 270)
                    $image_270.show();
                else
                    $image_0.show();
                $element.append($image_0);
                $element.append($image_90);
                $element.append($image_180);
                $element.append($image_270);
                return $element;
            };
            return Image;
        }(Objects.Object));
        Objects.Image = Image;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label() {
                _super.apply(this, arguments);
            }
            Label.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                // style="transform: rotate('+object.rotation+'deg);"
                $element.html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');
                $element.css('transform', 'rotate(' + object.rotation + 'deg)');
                return $element;
            };
            return Label;
        }(Objects.Object));
        Objects.Label = Label;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Light = (function (_super) {
            __extends(Light, _super);
            function Light() {
                _super.apply(this, arguments);
            }
            Light.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i style="color:' + object.color + ';" class="fa fa-sun-o" aria-hidden="true"></i>');
                return $element;
            };
            return Light;
        }(Objects.Object));
        Objects.Light = Light;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Stairs = (function (_super) {
            __extends(Stairs, _super);
            function Stairs() {
                _super.apply(this, arguments);
            }
            Stairs.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $image = $('<img>').addClass('image');
                var width = object.width * zoom_selected;
                var height = object.height * zoom_selected;
                $image.css('width', width);
                $image.css('height', height);
                $image.attr('src', '/images/icons/stairs.jpg');
                $image.css('position', 'relative');
                $image.css('top', -height / 2);
                $image.css('left', -width / 2);
                $image.css('transform', 'rotate(' + object.rotation + 'deg)');
                $element.append($image);
                //$element.css('transform','rotate('+object.rotation+'deg)');
                return $element;
            };
            return Stairs;
        }(Objects.Object));
        Objects.Stairs = Stairs;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Tree = (function (_super) {
            __extends(Tree, _super);
            function Tree() {
                _super.apply(this, arguments);
            }
            Tree.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-pagelines" aria-hidden="true"></i>');
                return $element;
            };
            return Tree;
        }(Objects.Object));
        Objects.Tree = Tree;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Key = (function (_super) {
            __extends(Key, _super);
            function Key() {
                _super.apply(this, arguments);
            }
            Key.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                $element.html('<i class="fa fa-key" aria-hidden="true"></i>');
                return $element;
            };
            return Key;
        }(Objects.Object));
        Objects.Key = Key;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../reference.ts" />
var GALLERY;
(function (GALLERY) {
    var Objects;
    (function (Objects) {
        var Teleport = (function (_super) {
            __extends(Teleport, _super);
            function Teleport() {
                _super.apply(this, arguments);
            }
            Teleport.prototype.create$Element = function () {
                var $element = this._create$Element();
                var object = this;
                var $inner = $('<i class="fa fa-external-link" aria-hidden="true"></i>');
                $inner.css('width', object.radius * zoom_selected);
                $inner.css('height', object.radius * zoom_selected);
                $inner.css('border-radius', object.radius * zoom_selected);
                $inner.css('border', '2px solid #000');
                $element.append($inner);
                return $element;
            };
            return Teleport;
        }(Objects.Object));
        Objects.Teleport = Teleport;
    })(Objects = GALLERY.Objects || (GALLERY.Objects = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="reference.ts" />
function createObject$(object) {
    //r(object.create$Element());
    return object.create$Element();
}
/// <reference path="reference.ts" />
var controls_keys = {
    'UP': [38, 87],
    'DOWN': [40, 83],
    'LEFT': [37, 65],
    'RIGHT': [39, 68]
};
//------------------------------------------------------------
window.addEventListener('keydown', function (e) {
    if (e.keyCode == 90 && e.ctrlKey) {
        undo();
    }
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        //if(T.UI.Status.focusOnMap()){
        e.preventDefault();
    }
}, false);
//------------------------------------------------------------
var keys = [];
var moving = false;
var controls_down = {
    update: function () {
        for (var control in controls_keys) {
            this[control] = false;
            for (var i = 0, l = keys.length; i < l; i++) {
                if (controls_keys[control].indexOf(keys[i]) !== -1) {
                    this[control] = true;
                }
            }
        }
    }
};
window.addEventListener('keydown', function (e) {
    //if(T.UI.Status.focusOnMap()) {
    r('DOWN', e.keyCode);
    if (keys.indexOf(e.keyCode) === -1) {
        keys.push(e.keyCode);
        controls_down.update();
    }
    //}
});
window.addEventListener('keyup', function (e) {
    //if(T.UI.Status.focusOnMap()) {
    r('UP', e.keyCode);
    var i = keys.indexOf(e.keyCode);
    if (i != -1) {
        keys.splice(i, 1);
        controls_down.update();
    }
    //}
});
var $admin_storeys;
$(function () {
    $admin_storeys = $('#admin-world');
});
var last = null;
var keys_tick = function (timestamp) {
    if (!last)
        last = timestamp;
    var progress = (timestamp - last) / 1000;
    last = timestamp;
    //if(window_opened)return;
    var speed = progress * 300;
    if (controls_down.UP) {
        window_center.y += speed;
        $admin_storeys.css('top', '+=' + speed + 'px');
    }
    if (controls_down.DOWN) {
        window_center.y -= speed;
        $admin_storeys.css('top', '-=' + speed + 'px');
    }
    if (controls_down.LEFT) {
        window_center.x += speed;
        $admin_storeys.css('left', '+=' + speed + 'px');
    }
    if (controls_down.RIGHT) {
        window_center.x -= speed;
        $admin_storeys.css('left', '-=' + speed + 'px');
    }
    if (controls_down.UP || controls_down.DOWN || controls_down.LEFT || controls_down.RIGHT) {
        moving = true;
        drawing = false;
    }
    else {
        if (moving) {
            moving = false;
            $admin_storeys.css('top', '0px').css('left', '0px');
            createMap();
        }
    }
    requestAnimationFrame(keys_tick);
};
requestAnimationFrame(keys_tick);
/// <reference path="reference.ts" />
var gallery = false;
var password = false;
var config;
$.get('../../config.json').done(function (response) {
    config = response;
    r('loaded config');
    $.get(config.GALLERY_API_URL + 'galleries').done(function (response) {
        var $ul = $('#select-gallery').find('ul');
        $ul.html('');
        response.forEach(function (item) {
            $ul.append('<li>' + item + '</li>');
        });
        $ul.find('li').click(function () {
            $('#select-gallery').find('input[name="gallery"]').val($(this).html());
        });
        processFirstLogin();
    });
});
var objects;
function loginOrCreate(testing_gallery, testing_password) {
    $.get({
        url: config.GALLERY_API_URL + 'galleries/' + testing_gallery,
        headers: { 'x-auth': testing_password }
    }).done(function (response) {
        gallery = testing_gallery;
        password = testing_password;
        window.localStorage.setItem('gallery', gallery);
        window.localStorage.setItem('password', password);
        r(response);
        objects = new GALLERY.Objects.Array(response);
        $('#show-gallery').attr('href', '../viewer?gallery=' + gallery);
        createMap();
        $('#select-gallery').hide();
    }).fail(function (response) {
        if (response.status == 403) {
            alert('Špatné heslo!');
        }
        else if (response.status == 404) {
            if (confirm('Galerie s názvem ' + testing_gallery + ' neexistuje, chcete vytvořit novou prázdnou se zadaným heslem?')) {
                $.post({
                    url: config.GALLERY_API_URL + 'galleries/' + testing_gallery,
                    contentType: "application/json",
                    data: JSON.stringify([]),
                    headers: { 'x-auth': testing_password }
                }).done(function (response) {
                    console.log('done', response);
                    Message.success('Byla vytvořena nová galerie!');
                    gallery = testing_gallery;
                    password = testing_password;
                    window.localStorage.setItem('gallery', gallery);
                    window.localStorage.setItem('password', password);
                    objects = new GALLERY.Objects.Array();
                    $('#show-gallery').attr('href', '../viewer?gallery=' + gallery);
                    createMap();
                    $('#select-gallery').hide();
                }).fail(function () {
                });
            }
        }
    });
}
function logout() {
    if (confirm('Opravdu se chcete odhlásit?')) {
        gallery = undefined;
        password = undefined;
        window.localStorage.removeItem('gallery');
        window.localStorage.removeItem('password');
        $('#select-gallery').show();
    }
}
function processFirstLogin() {
    var testing_gallery = window.localStorage.getItem('gallery');
    var testing_password = window.localStorage.getItem('password');
    if (testing_gallery && testing_password) {
        loginOrCreate(testing_gallery, testing_password);
    }
    $('#select-gallery').submit(function (e) {
        e.preventDefault();
        var testing_gallery = $(this).find('input[name="gallery"]').val();
        var testing_password = $(this).find('input[name="password"]').val();
        loginOrCreate(testing_gallery, testing_password);
    });
    /*$.get(config.GALLERY_API_URL +'galleries/'+ gallery).done(function (response) {


        console.log('done', response);

        05-objects = response;
        createMap()


    }).fail(function () {


        $.post({
            url: config.GALLERY_API_URL +'galleries/'+ gallery,
            contentType: "application/json",
            data: JSON.stringify([])

        }).done(function (response) {


            console.log('done', response);

            Message.success('Byla vytvořena nová galerie!');

            05-objects = [];
            createMap()


        }).fail(function () {
        });


    });*/
    /*$('#select-gallery').find('input[name="gallery"]').val('test-local2');
    $('#select-gallery').find('input[name="password"]').val('xxx');
    $('#select-gallery').trigger('submit');
    /**/
}
;
'use strict';
var MESSAGE_DURATION = 1;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
        descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
} } return function (Constructor, protoProps, staticProps) { if (protoProps)
    defineProperties(Constructor.prototype, protoProps); if (staticProps)
    defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
} }
var Message = function () {
    function _class(text) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? 'INFO' : arguments[1];
        var additional = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
        _classCallCheck(this, _class);
        //todo [PH] play sound here
        //ion.sound.play("bell_ring");
        this.$element = $('<div class="message"></div>').addClass(type.toLowerCase()).text(text);
        if (additional) {
            this.$element.append(additional);
        }
        if (!text && !additional) {
            this.$element.hide();
        }
        var self = this;
        $('#message-zone').append(self.$element);
    }
    _createClass(_class, [{
            key: 'get$',
            value: function get$() {
                return this.$element;
            }
        }, {
            key: 'close',
            value: function close() {
                var s = arguments.length <= 0 || arguments[0] === undefined ? MESSAGE_DURATION : arguments[0];
                var self = this;
                return setTimeout(function () {
                    $(function () {
                        self.$element.remove();
                    });
                    //self.$element.fadeOut(MESSAGE_FADEOUT, function() {$( this ).remove();});
                }, s * 1000);
            }
        }, {
            key: 'text',
            value: function text(_text, type) {
                if (_text) {
                    this.$element.text(_text).show();
                }
                if (type) {
                    this.$element.removeClass('error');
                    this.$element.removeClass('success');
                    this.$element.removeClass('info');
                    this.$element.removeClass('warning');
                    this.$element.addClass(type.toLowerCase());
                }
                return this;
            }
        }], [{
            key: 'error',
            value: function error(text) {
                var message = new Message(text, 'ERROR');
                if (text)
                    message.close();
                return message;
            }
        }, {
            key: 'success',
            value: function success(text) {
                var message = new Message(text, 'SUCCESS');
                if (text)
                    message.close();
                return message;
            }
        }, {
            key: 'info',
            value: function info(text) {
                var message = new Message(text, 'INFO');
                if (text)
                    message.close();
                return message;
            }
        }]);
    return _class;
}();
/// <reference path="reference.ts" />
function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
$(function () {
    $('.new').click(function () {
        var size = {
            x: 16,
            y: 8
        };
        var shape;
        blocks = [];
        for (var y = -size.y; y <= size.y; y++) {
            for (var x = -size.x; x <= size.x; x++) {
                if (y == size.y && x == 0) {
                    shape = 'door';
                }
                else if (x == size.x || y == size.y || x == -size.x || y == -size.y) {
                    shape = 'wall';
                }
                else {
                    shape = 'room';
                }
                blocks.push({
                    id: createGuid(),
                    type: 'block',
                    position: { x: x, y: y },
                    shape: shape
                });
            }
        }
        objects = blocks;
        createMap();
        save();
    });
});
/// <reference path="reference.ts" />
jQuery.fn.outerHTML = function (s) {
    var html = '';
    for (var i = 0, l = this.length; i < l; i++) {
        if (typeof this[i].outerHTML === 'string') {
            html += this[i].outerHTML;
        }
    }
    return (html);
};
/// <reference path="reference.ts" />
function runGenerator(generatorFunction) {
    var images = objects.filter(function (object) {
        return (object.type === 'image');
    });
    //r(images);
    var new_objects = generatorFunction(images);
    objects = new_objects;
    save();
    createMap();
}
/// <reference path="reference.ts" />
function getPositionFromLeftTop(left, top) {
    var offset = $(this).offset();
    var x = (left - window_center.x) / zoom_selected;
    var y = (top - window_center.y) / zoom_selected;
    return ({ x: x, y: y });
}
/// <reference path="reference.ts" />
var last_objects;
function cleanStorey() {
    if (confirm('Opravdu chcete vymazat vše v aktuálním podlaží ' + storey_selected + '?')) {
        var new_objects = objects.getAll().filter(function (object) {
            if (object.storey == storey_selected) {
                return (false);
            }
            else {
                return (true);
            }
        });
        objects = new GALLERY.Objects.Array(new_objects);
        saveAndRedraw();
    }
}
function cleanWorld() {
    if (confirm('Opravdu chete vymazat vše a začít znovu?')) {
        objects = new GALLERY.Objects.Array();
        saveAndRedraw();
    }
}
function saveAndRedraw() {
    createMap();
    save();
}
function undo() {
    console.warn('Undo not yet working');
    //objects = last_objects;
    //createMap();
}
function save() {
    //last_objects = JSON.parse(JSON.stringify(objects.getAll()));
    $button = $('#save');
    $button.html('<i class="fa fa-refresh fa-spin fa-fw"></i>Ukládání'); //todo fa
    /*blocks = [];

     $('#admin-world').find('.block,.light').each(function () {

     var $this = $(this);
     var x = $this.attr('data-x');
     var y = $this.attr('data-y');
     var type = $this.attr('data-type');
     var material = $this.attr('data-material');



     blocks.push({
     position:{x:x,y:y},
     type: type,
     material: material
     });
     //createMap();

     });*/
    $.ajax({
        method: 'PUT',
        url: config.GALLERY_API_URL + 'galleries/' + gallery,
        contentType: "application/json",
        data: JSON.stringify(objects.getAll()),
        headers: { 'x-auth': password }
    }).done(function (response) {
        var date = new Date();
        var datetime = date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()); //+ ":" + date.getSeconds();
        $button.html('Uloženo ' + datetime); //todo datum
        //console.log('done',response);
    }).fail(function (response) {
        //console.log('fail',response);
    });
}
;
$(function () {
    $('#save').click(function () {
        save();
    });
});
/// <reference path="reference.ts" />
//var TOWNS_CDN_URL='http://towns-cdn.local/';
var TOWNS_CDN_URL = 'http://cdn.pavolhejny.com/';
var TOWNS_CDN_FILE_ACCEPTED_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/png'
];
var TOWNS_CDN_FILE_MAX_SIZE = 25 * Math.pow(1024, 2 /*MB*/);
var TOWNS_CDN_REQUEST_MAX_SIZE = TOWNS_CDN_FILE_MAX_SIZE * 10;
//----------------------------------------------------------------------
// file drop
document.addEventListener("dragover", function (e) {
    e.preventDefault();
}, false);
document.addEventListener("dragleave", function (e) {
    e.preventDefault();
}, false);
function setImageWidth(src, object, height) {
    var image = new Image();
    image.src = src;
    image.onload = function () {
        var width = (this.width * height) / this.height;
        object.width = width;
        r(object);
        save();
    };
}
document.addEventListener("drop", function (e) {
    e.preventDefault();
    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    //r(files);
    if (files.length == 0) {
        r('Shit dropped.');
        return;
    }
    r(files);
    // process all File 05-objects
    var formData = new FormData();
    var files_key = {};
    var request_size = 1024; //todo is it OK?
    var filenames = [];
    for (var i = 0; i < files.length; i++) {
        if (TOWNS_CDN_FILE_ACCEPTED_TYPES.indexOf(files[i].type) == -1) {
            Message.error('Můžete nahrávat pouze obrázky.');
            throw new Error('Not allowed filetype.');
        }
        if (files[i].size > TOWNS_CDN_FILE_MAX_SIZE) {
            //alert('Jeden nebo více souborů jsou moc velké.');
            Message.error('Celková velikost jednoho souboru může být maximálně' + ' ' + bytesToSize(TOWNS_CDN_FILE_MAX_SIZE));
            throw new Error('File too big');
        }
        request_size += files[i].size;
        var key = 'image' + i;
        formData.append(key, files[i]);
        files_key[key] = files[i];
        filenames.push(files[i].name);
    } //r(files_key);
    filenames = filenames.join(', ');
    if (request_size > TOWNS_CDN_REQUEST_MAX_SIZE) {
        //alert('Soubory jsou moc velké.');
        Message.error('Celková velikost všech souborů může být maximálně ' + ' ' + bytesToSize(TOWNS_CDN_REQUEST_MAX_SIZE));
        throw new Error('Request too big');
    }
    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', TOWNS_CDN_URL);
    var message = Message.info();
    xhr.upload.onprogress = function (event) {
        if (event.lengthComputable) {
            var complete = (event.loaded / event.total * 100 | 0);
            message.text('Nahráno ' + filenames + ' ' + complete + '%');
        }
    };
    xhr.onload = function () {
        if (xhr.status === 200) {
            try {
                console.log('all done: ' + xhr.status);
                r(e);
                var position = getPositionFromLeftTop(e.clientX, e.clientY);
                r(position);
                var response = (JSON.parse(xhr.response));
                var object;
                for (var key in files_key) {
                    objects.push(object = {
                        id: createGuid(),
                        type: 'image',
                        position: position,
                        storey: storey_selected,
                        name: files_key[key].name,
                        src: response[key],
                        height: 2,
                        rotation: 0,
                        name: '',
                        uri: ''
                    });
                    setImageWidth(response[key], object, 2);
                    position = { x: position.x, y: position.y + 2 };
                }
                createMap();
                message.text('Nahráno ' + filenames + ' 100%', 'success').close();
                save();
            }
            catch (e) {
                message.text('Chyba při nahrávání ', 'error').close();
                console.log('Error when processing data...');
                r(e);
            }
        }
        else {
            console.log('Something went terribly wrong...');
        }
    };
    xhr.send(formData);
    //-----------------
}, false);
//});
/// <reference path="reference.ts" />
var storey_selected;
var STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];
$(function () {
    STOREYS.forEach(function (storey) {
        $('.select-storeys').find('ul').append($('<li></li>').text(storey).attr('data-storey', storey));
    });
    $('.select-storeys').find('ul').find('li').click(function () {
        //r(this);
        $('.select-storeys').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');
        storey_selected = $(this).attr('data-storey');
        createMap();
    }).first().trigger('click');
});
//-------------------------------------------------------------
var zoom_selected;
var ZOOMS = [
    '5',
    '10',
    '20',
    '30',
    '50'
];
$(function () {
    ZOOMS.forEach(function (storey) {
        $('.select-zooms').find('ul').append($('<li></li>').text(storey).attr('data-zoom', storey));
    });
    $('.select-zooms').find('ul').find('li').click(function () {
        //r(this);
        $('.select-zooms').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');
        zoom_selected = $(this).attr('data-zoom') / 1;
        createMap();
    }).first().next().next().next().trigger('click'); //todo better
});
//-------------------------------------------------------------
var BLOCK_MATERIALS = [
    'color-white',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];
var BLOCK_SHAPES = ['none', 'room', 'wall', 'door', 'window', 'gate'];
$(function () {
    BLOCK_MATERIALS.forEach(function (material) {
        //r('creating block to pallete');
        $('.select-materials').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'wall',
            material: material
        })));
    });
    BLOCK_SHAPES.forEach(function (shape) {
        $('.select-shapes').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: shape,
            material: 'stone-plain'
        })));
    });
    $('.palette').find('.select-materials').find('.block').click(function () {
        $('.palette').find('.select-materials').find('.block').removeClass('selected');
        $(this).addClass('selected');
        material_selected = $(this).attr('data-material');
    }).first().trigger('click');
    $('.palette').find('.select-shapes').find('.block').click(function () {
        $('.palette').find('.select-shapes').find('.block').removeClass('selected');
        $(this).addClass('selected');
        shape_selected = $(this).attr('data-shape');
    }).first().trigger('click');
});
//===================================================================================================
$(function () {
    ['light', 'label', 'tree', 'stairs', 'key', 'teleport'].forEach(function (type) {
        var $dot_object = createObject$(GALLERY.Objects.Object.init({
            type: type
        }));
        $dot_object.draggable({
            //helper: 'clone',
            stop: function () {
                var offset = $(this).offset();
                var position = getPositionFromLeftTop(offset.left, offset.top);
                var object = {
                    id: createGuid(),
                    type: type,
                    position: position,
                    storey: storey_selected
                };
                if (type == 'light') {
                    object.color = '#ffffff';
                    object.intensity = 1;
                }
                else if (type == 'label') {
                    object.name = '';
                    object.uri = '';
                    object.rotation = 0;
                }
                if (type == 'stairs') {
                    object.width = 10;
                    object.height = 2;
                    object.rotation = 0;
                }
                else if (type == 'key') {
                    object.key_type = 'blue';
                }
                else if (type == 'teleport') {
                    object.radius = 1;
                    object.href = '/';
                    object.target = '';
                }
                objects.push(object);
                createMap();
                save();
                $(this)
                    .css('left', 0)
                    .css('top', 0);
                //r(x,y);
            }
        });
        $('.select-dot-objects').append($dot_object);
    });
});
var GALLERY;
(function (GALLERY) {
    var Plugins;
    (function (Plugins) {
        var Generators;
        (function (Generators) {
            function SimpleGarden(images) {
                var min_size = 10;
                var distance_between_images = 1;
                var width = 0; //4 * distance_between_images;
                images.forEach(function (image) {
                    //r(image);
                    width += image.width;
                    width += distance_between_images;
                });
                width = width / 4;
                width = Math.ceil(width);
                width += 2;
                var new_objects = [];
                var shape;
                for (var x = 0; x < width; x++) {
                    for (var y = 0; y < width; y++) {
                        if (x === 0 || y === 0 || x === width - 1 || y === width - 1) {
                            shape = 'wall';
                        }
                        else {
                            shape = 'room';
                        }
                        new_objects.push({
                            type: 'block',
                            position: { x: x - width / 2, y: y - width / 2 },
                            storey: '1NP',
                            shape: shape,
                            material: 'stone-plain'
                        });
                    }
                }
                var walls = new_objects.filter(function (object) {
                    return (object.type === 'block' && object.shape === 'wall');
                });
                var positions_rotations = [];
                walls.forEach(function (wall) {
                    var testing_positions_rotations = [
                        { x: wall.position.x - 1, y: wall.position.y, rotation: 0 },
                        { x: wall.position.x + 1, y: wall.position.y, rotation: 180 },
                        { x: wall.position.x, y: wall.position.y - 1, rotation: 270 },
                        { x: wall.position.x, y: wall.position.y + 1, rotation: 90 }
                    ];
                    testing_positions_rotations.forEach(function (position) {
                        if (!isWallOn(walls, position)) {
                            positions_rotations.push(position);
                        }
                    });
                });
                r(positions_rotations);
                if (positions_rotations.length < images.length) {
                    throw new Error('Not enough positions for images.');
                }
                images.forEach(function (image, i) {
                    image.position = {
                        x: positions_rotations[i].x,
                        y: positions_rotations[i].y
                    };
                    image.rotation = positions_rotations.rotation;
                    new_objects.push(image);
                });
                /*let section = 0;
                let section_x = 0;
                images.forEach(function (image) {
        
                    r(section,section_x);
        
                    image.storey = '1NP';
        
                    let position;
                    if(section===0){
                        position = {
                            x: width/2,
                            y: section_x-width/2
                        };
                        image.rotation = 90;
                    }else
                    if(section===1){
                        position = {
                            x: width/2-section_x,
                            y: width/-2
                        };
                        image.rotation = 180;
                    }else
                    if(section===2){
                        position = {
                            x: width/2/-2,
                            y: width-section_x
                        };
                        image.rotation = 270;
                    }else
                    if(section===3){
                        position = {
                            x: section_x-width/2,
                            y: width/2
                        };
                        image.rotation = 0;
                    }else{
                        throw new Error('images overflow');
                    }
        
                    section_x += image.width + distance_between_images;
                    if(section_x>width){
                        section_x = 0;
                        section++;
                    }
        
                    image.position = position;
                    new_objects.push(image);
        
        
                });*/
                return (new_objects);
                //r(width);
            }
            Generators.SimpleGarden = SimpleGarden;
        })(Generators = Plugins.Generators || (Plugins.Generators = {}));
    })(Plugins = GALLERY.Plugins || (GALLERY.Plugins = {}));
})(GALLERY || (GALLERY = {}));
/// <reference path="../../lib/jquery.d.ts" />
/// <reference path="00-common.ts" />
/// <reference path="05-objects/00-array.ts" />
/// <reference path="05-objects/05-object.ts" />
/// <reference path="05-objects/10-block.ts" />
/// <reference path="05-objects/10-image.ts" />
/// <reference path="05-objects/10-label.ts" />
/// <reference path="05-objects/10-light.ts" />
/// <reference path="05-objects/10-stairs.ts" />
/// <reference path="05-objects/10-tree.ts" />
/// <reference path="05-objects/10-key.ts" />
/// <reference path="05-objects/10-teleport.ts" />
/// <reference path="10-create-map.ts" />
/// <reference path="10-create-object.ts" />
/// <reference path="10-keys.ts" />
/// <reference path="10-load.ts" />
/// <reference path="10-message.ts" />
/// <reference path="10-new.ts" />
/// <reference path="10-outer-html.ts" />
/// <reference path="10-plugins.ts" />
/// <reference path="10-position.ts" />
/// <reference path="10-save.ts" />
/// <reference path="20-filedrop.ts" />
/// <reference path="20-palette.ts" />
/// <reference path="50-plugins/generators/simple-garden.ts" />
/// <reference path="reference.ts" />
var objects = [];
drawing = false;
moving = false;
var window_center = {
    x: $(window).width() / 2,
    y: $(window).height() / 2
};
function createMap() {
    var $admin_world_basement = $('#admin-world-basement');
    $admin_world_basement.html('');
    var storey_selected_basement = (parseInt(storey_selected) - 1) + 'NP';
    objects.forEach(function (object) {
        if (object.storey !== storey_selected_basement)
            return;
        $admin_world_basement.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });
    var $admin_world = $('#admin-world');
    $admin_world.html('');
    objects.forEach(function (object) {
        if (object.storey !== storey_selected)
            return;
        $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });
    $admin_world.disableSelection();
    var $blocks = $admin_world.find('.block');
    var $blocks_gates = $admin_world.find('.block[data-shape="gate"]');
    var $images = $admin_world.find('.image');
    var $stairs = $admin_world.find('.stairs');
    var $dot_objects = $admin_world.find('.light, .label, .tree, .key, .teleport');
    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(05-objects,position);
    });*/
    //----------------------------------------------------------------------------SELECTING
    var $dot = $('#dot');
    var $selected_properties = $('#selected-properties');
    var select_callback = function () {
        $this = $(this);
        var id = $this.attr('id');
        var object = objects.getObjectById(id);
        //r($this,id,object);
        $dot.css('position', 'absolute');
        $dot.css('top', object.position.y * zoom_selected + window_center.y - 5);
        $dot.css('left', object.position.x * zoom_selected + window_center.x - 5);
        var offset = $this.offset();
        var width = $this.outerWidth();
        var height = $this.outerHeight();
        $admin_world.find('div').addClass('not-selected-object').css('z-index', '');
        $this.removeClass('not-selected-object');
        $this.css('z-index', 10000);
        $selected_properties.html('');
        $selected_properties.append('<legend>Objekt</legend>');
        var input_element, $input_element;
        for (var key in object) {
            input_element = false;
            if (['name', 'uri', 'key_type', 'href', 'target'].indexOf(key) !== -1) {
                input_element = '<input type="text">';
            }
            else if (key == 'intensity') {
                input_element = '<input type="range" min="0.1" max="5" step="0.1">';
            }
            else if (key == 'radius') {
                input_element = '<input type="range" min="0.4" max="5" step="0.1">';
            }
            else if (key == 'color') {
                input_element = '<input type="color">';
            }
            else if (key == 'rotation' && object.type !== 'image') {
                input_element = '<input type="range" min="0" max="360" step="10">';
            }
            if (input_element) {
                $input_element = $(input_element);
                //r(object[key]);
                $input_element.attr('value', object[key]);
                $input_element.attr('data-id', id);
                $input_element.attr('data-key', key);
                input_element = $input_element.outerHTML();
                //r(input_element);
                $selected_properties.append('<div class="field">' +
                    '<label>' + key + '</label>' +
                    input_element +
                    '</div>');
            }
        }
        $selected_properties.find('input').change(function () {
            var $this = $(this);
            var val = $this.val();
            var id = $this.attr('data-id');
            var key = $this.attr('data-key');
            var object = objects.getObjectById(id);
            object[key] = val;
            createMap();
            save();
            //r(object);
        });
        $selected_properties.show();
        $delete_button = $('<button>Smazat</button>');
        $delete_button.click(function () {
            objects.removeObjectById(id);
            $selected_properties.hide();
            saveAndRedraw();
        });
        $selected_properties.append($delete_button);
        $delete_button = $('<button>Duplikovat</button>');
        $delete_button.click(function () {
            var object = objects.getObjectById(id);
            var new_object = object.clone();
            new_object.id = createGuid();
            new_object.position.x += 1;
            new_object.position.y += 1;
            objects.push(new_object);
            $selected_properties.hide();
            saveAndRedraw();
            r($('#' + new_object.id));
            $('#' + new_object.id).trigger('mousedown');
        });
        $selected_properties.append($delete_button);
        /*
        $rotate
            .css('display', 'block')
            .css('position', 'absolute')
            .css('top',-10)
            .css('right',0)
            .css('z-index',top_z_index++);

        r($rotate.css('top'),$rotate.css('left'));*/
        //r(top_z_index++);
    };
    var unselect_callback = function () {
        $('.not-selected-object').removeClass('not-selected-object');
        $selected_properties.hide();
    };
    $blocks_gates.mousedown(select_callback);
    $images.mousedown(select_callback);
    $stairs.mousedown(select_callback);
    $dot_objects.mousedown(select_callback);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------BLOCKS drawing
    var drawing_x, drawing_y, drawing_objects;
    $admin_world.unbind('mousedown').mousedown(function (event) {
        if ($(event.target).hasClass('block') || $(event.target).attr('id') == 'admin-world') {
        }
        else {
            return;
        }
        if ($selected_properties.css('display') == 'block') {
            unselect_callback();
            return;
        }
        r('start drawing');
        drawing = true;
        drawing_x = Math.round((event.clientX - window_center.x) / zoom_selected); //+0.5;
        drawing_y = Math.round((event.clientY - window_center.y) / zoom_selected); //+0.5;
        drawing_objects = [];
        r('material: ' + material_selected + ' | shape: ' + shape_selected);
    });
    var admin_world_mousemove;
    $admin_world.unbind('mousemove').mousemove(admin_world_mousemove = function (event) {
        if (!drawing)
            return;
        //r('drawing rect');
        //r( event.clientY -window_center.y );
        var stop_x = Math.round((event.clientX - window_center.x) / zoom_selected); //+0.5;
        var stop_y = Math.round((event.clientY - window_center.y) / zoom_selected); //+0.5;
        size_x = Math.abs(stop_x - drawing_x);
        size_y = Math.abs(stop_y - drawing_y);
        signum_x = (stop_x - drawing_x) > 0 ? 1 : -1;
        signum_y = (stop_y - drawing_y) > 0 ? 1 : -1;
        drawing_objects.forEach(function (object) {
            $('#' + object.id).remove();
        });
        drawing_objects = new GALLERY.Objects.Array();
        for (var y = 0; y <= size_y; y++) {
            for (var x = 0; x <= size_x; x++) {
                var object = {
                    id: createGuid(),
                    type: 'block',
                    position: {
                        x: drawing_x + x * signum_x,
                        y: drawing_y + y * signum_y
                    },
                    storey: storey_selected,
                    material: material_selected,
                    shape: shape_selected != 'wall' ? shape_selected : ((x == 0 || y == 0 || x == size_x || y == size_y) ? 'wall' : 'room')
                };
                if (shape_selected == 'gate') {
                    object.key_type = 'blue';
                }
                //05-objects.push(object);
                drawing_objects.push(object);
                $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object))); //todo use also in pallete
            }
        }
    });
    $admin_world.unbind('mouseup').mouseup(function (event) {
        if (!drawing)
            return;
        admin_world_mousemove(event);
        drawing = false;
        var removed_stat = 0;
        r(drawing_objects);
        drawing_objects.forEach(function (object) {
            //r('object',object);
            //r('object.position',object.position);
            removed_stat += objects.removeBlockOnPosition(object.position, object.storey) ? 1 : 0;
            if (object.shape !== 'none') {
                objects.push(object);
            }
        });
        r('removed ' + removed_stat + ' objects');
        createMap();
        save();
    });
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------LIGHTS, LABELS,TREES drag
    var drag_normal_options = {
        drag: function () {
        },
        stop: function () {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left, offset.top);
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            //select_callback.call(this);
            //createMap();
            save();
        }
    };
    $dot_objects.draggable(drag_normal_options);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------STAIRS drag
    var drag_stairs_options = {
        //grid: [30,30],
        //snap: ".block[data-shape='wall']",
        //snapMode: "outer",
        drag: function (e, ui) {
            ui.position.left = Math.floor((ui.position.left - window_center.x) / zoom_selected) * zoom_selected + window_center.x;
            ui.position.top = Math.floor((ui.position.top - window_center.y) / zoom_selected) * zoom_selected + window_center.y;
        },
        stop: function () {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left, offset.top);
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            //select_callback.call(this);
            //createMap();
            save();
        }
    };
    $stairs.draggable(drag_stairs_options);
    //----------------------------------------------------------------------------
    //----------------------------------------------------------------------------IMAGES
    var drag_snap_options = {
        //grid: [ zoom_selected/2, zoom_selected/2 ],
        snap: ".block[data-shape='wall']",
        //snap: ".block",
        snapMode: "outer",
        //snapTolerance: 10,
        drag: function () {
        },
        stop: function () {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left - 7, offset.top); //todo wtf 7
            position.x = Math.round(position.x * 2) / 2;
            position.y = Math.round(position.y * 2) / 2;
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            select_callback.call(this);
            save(); //todo refactor to function
        },
        drag: function (event, ui) {
            var draggable = $(this).data("ui-draggable");
            $.each(draggable.snapElements, function (index, element) {
                ui = $.extend({}, ui, {
                    snapElement: $(element.item),
                    snapping: element.snapping
                });
                if (element.snapping) {
                    if (!element.snappingKnown) {
                        element.snappingKnown = true;
                        draggable._trigger("snapped", event, ui);
                    }
                }
                else if (element.snappingKnown) {
                    element.snappingKnown = false;
                    draggable._trigger("snapped", event, ui);
                }
            });
        },
        snapped: function (event, ui) {
            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left - 7, offset.top); //todo wtf 7
            position.x = Math.round(position.x * 2) / 2;
            position.y = Math.round(position.y * 2) / 2;
            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;
            var rotation = wallRotation(objects, position);
            var rotation_rad = rotation / 180 * Math.PI;
            if (rotation === false) {
            }
            else {
                $(this).find('img').hide();
                $(this).find('.image-' + rotation).show();
                object.rotation = rotation;
            }
        }
    };
    $images.draggable(drag_snap_options);
    //----------------------------------------------------------------------------
}
