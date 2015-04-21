var C = require('../constants.js');
var is = require('../utils.js').is;

var Modifier = require('./modifier.js');
var Brush = require('../graphics/brush.js');
var Path = require('../graphics/path.js');

var errors = require('../errors.js');

/**
 * @class anm.Tween
 * @extends anm.Modifier
 *
 * Tween, under the hood, is a pre-defined {@link anm.Modifier Modifier}.
 * It changes element state (position. rotation, ...) over the time, but in
 * this case you may choose from a prepared recipe without writing a function on
 * your own.
 *
 * For example, scale Tween is a Modifier with this code:
 *
 * ```
 * var data = [ [ 0.5, 0.5 ], [ 1.0, 2.0 ] ];
 * function(t) {
 *     this.sx = data[0][0] * (1.0 - t) + data[1][0] * t;
 *     this.sy = data[0][1] * (1.0 - t) + data[1][1] * t;
 * };
 * ```
 *
 * To add a tween to some element, you just need to know its type and provide
 * both start-value and end-value, so it will automatically interpolate one to
 * another. Some tweens do not require these values or require only one value.
 *
 * Also see {@link anm.Element#translate translate(from, to)}, {@link anm.Element#scale scale(from, to)},
 * {@link anm.Element#rotate rotate(from, to)}, {@link anm.Element#scale scale(from, to)}, {@link anm.Element#skew skew(from, to)},
 * {@link anm.Element#alpha alpha(from, to)}, {@link anm.Element#color color()}
 *
 * Examples:
 *
 * * `// elm.rotate(0, Math.PI): Not yet implemented, should take the whole element band`
 * * `elm.tween(new Tween('rotate', [0, Math.PI]))`
 * * `elm.tween(new Tween('rotate').from(0).to(Math.PI / 2))`
 * * `elm.tween(Tween.rotate().values(0, Math.PI / 2))`*
 * * `elm.tween(Tween.rotate().from(0).to(Math.PI / 2))`
 * * `elm.tween(Tween.rotate().from(0).to(Math.PI / 2).band(0, 2)`
 * * `elm.tween(Tween.rotate().from(0).to(Math.PI / 2).start(0).stop(2)`
 * * `elm.tween(Tween.rotate().from(0).to(Math.PI / 2).band(0, 2).easing(function(t) { return 1 - t; }))`
 * * `elm.tween(Tween.rotate().from(0).to(Math.PI / 2).band(0, 2).easing('in'))`
 * * `elm.tween(Tween.translate().from(0, 0).to(100, 100))`
 * * `elm.tween(Tween.translate().data('M0 0 100 100'))`
 * * `elm.tween(Tween.rotatetopath())`
 */
Tween.DEFAULT_FROM = function(_from, prev) { return is.defined(prev) ? [ _from,   prev[1] ] : [ _from, null ]; };
Tween.DEFAULT_TO   = function(to,    prev) { return is.defined(to)   ? [ prev[0], to ]      : [  null,   to ]; };
function Tween(tween_type, data) {
    if (!tween_type) throw errors.element('Tween type is required to be specified or function passed');
    // mod_f — modifier function which is called on every frame and time passed there
    // from_f — is an optional function which returns proper this.$data for a tween using new given start value and previous this.$data value
    // to_f — is an optional function which returns proper this.$data for a tween using new given end value and previous this.$data value
    // last two default to create an array like [ from, to ] in this.$data
    var mod_f, from_f, to_f;
    if (is.fun(tween_type)) {
        mod_f = tween_type;
    } else {
        var tween_def = _Tweens[tween_type];
        mod_f = tween_def.modifier;
        mod_f.tween = tween_type;
        from_f = tween_def.from;
        to_f = tween_def.to;
    }
    mod_f.is_tween = true;
    var mod = Modifier(mod_f, C.MOD_TWEEN);
    mod.$data = data;
    from_f = from_f || function(_from, prev) { return is.defined(prev) ? [ _from, prev[1] ] : [ _from, null ]; };
    to_f = to_f || function(to, prev) { return is.defined(prev) ? [ prev[0], to ] : [ null, to ]; };
    mod.values = function(_from, to) {
                   if (!is.defined(_from) && this.$data) return this.$data;
                   this.$data = to_f(to, from_f(_from, null));
                   return this;
               };
    mod.from = function(val) {
                   if (!is.defined(val) && this.$data) return this.$data[0];
                   this.$data = from_f(val, this.$data);
                   return this;
               };
    mod.to   = function(val) {
                   if (!is.defined(val) && this.$data) return this.$data[1];
                   this.$data = to_f(val, this.$data);
                   return this;
               };
    /* // used from modifier
     * mod.data = function(data) {
        this.$data = data; return this;
    } */
    return mod;
}

Tween._$ = function(tween_type) { return new Tween(tween_type); }

// tween order
Tween.TWEENS_PRIORITY = {};
Tween.TWEENS_COUNT = 0;

var _Tweens = {};

Tween.addTween = function(tween_type, definition) {
    _Tweens[tween_type] = is.fun(definition) ? { modifier: definition } : definition;
    Tween[tween_type] = function() { return new Tween(tween_type); };
    Tween.TWEENS_PRIORITY[tween_type] = Tween.TWEENS_COUNT++;
};

function nop() {};

Tween.addTween(C.T_TRANSLATE, {
    modifier: function(t) {
        var path = this.$data,
            p = path.pointAt(t);
        if (!p) return;
        this.x = p[0];
        this.y = p[1];
        // we should null the moving path, if it was empty
        this.$mpath = (path.length() > 0) ? path : null;
    },
    from: function(_from, path) {
        return path ? path.line(_from[0], _from[1]) : new Path().move(_from[0], _from[1]) },
    to: function(to, path) {
        return path ? path.line(to[0], to[1]) : new Path().move(to[0], to[1]) }
});

Tween.addTween(C.T_SCALE, function(t) {
    var _from = this.$data[0],
        to = this.$data[1];
    this.sx = _from[0] * (1.0 - t) + to[0] * t;
    this.sy = _from[1] * (1.0 - t) + to[1] * t;
});

Tween.addTween(C.T_ROTATE, function(t) {
    var _from = this.$data[0],
        to = this.$data[1];
    this.angle = _from * (1.0 - t) + to * t;
});

Tween.addTween(C.T_ROT_TO_PATH, {
    modifier: function(t) {
        var path = this.$mpath;
        if (path) this.angle = path.tangentAt(t);
    },
    from: nop, to: nop
});

Tween.addTween(C.T_ALPHA, function(t) {
    var _from = this.$data[0],
        to = this.$data[1];
    return function(_from, to) {
        this.alpha = _from * (1.0 - t) + to * t;
    };
});

Tween.addTween(C.T_SHEAR, function(t) {
    var _from = this.$data[0],
        to = this.$data[1];
    this.hx = _from[0] * (1.0 - t) + to[0] * t;
    this.hy = _from[1] * (1.0 - t) + to[1] * t;
});

Tween.addTween(C.T_FILL, function(data) {
    var interp_func = Brush.interpolateBrushes(data[0], data[1]);
    return function(t, dt, duration) {
        this.$fill = interp_func(t);
    };
});

Tween.addTween(C.T_STROKE, function(data) {
    var interp_func = Brush.interpolateBrushes(data[0], data[1]);
    return function (t, dt, duration) {
        this.$stroke = interp_func(t);
    };
});

Tween.addTween(C.T_SHADOW, function(data) {
    var interp_func = Brush.interpolateBrushes(data[0], data[1]);
    return function (t, dt, duration) {
        this.$shadow = interp_func(t);
    };
});

Tween.addTween(C.T_VOLUME, function(data) {
    return function(t) {
        if (!this.$audio.ready) return;
        var volume = data[0] * (1.0 - t) + data[1] * t;
        this.$audio.setVolume(volume);
    };
});


module.exports = Tween;
