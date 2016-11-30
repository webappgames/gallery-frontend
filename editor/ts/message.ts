'use strict';

var MESSAGE_DURATION = 1;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

        /**
         *
         * @param {string} text
         * @returns {Message} message
         */

    }], [{
        key: 'error',
        value: function error(text) {
            var message = new Message(text, 'ERROR');
            //if (text) message.close();
            return message;
        }

        /**
         * @param {string} text
         * @returns {Message} message
         */

    }, {
        key: 'success',
        value: function success(text) {
            var message = new Message(text, 'SUCCESS');
            //if (text) message.close();
            return message;
        }

        /**
         * @param {string} text
         * @returns {Message} message
         */

    }, {
        key: 'info',
        value: function info(text) {
            var message = new Message(text, 'INFO');
            //if (text) message.close();
            return message;
        }

        //todo warning

    }]);

    return _class;
}();