PLAYER API
==========

* [Intro](#intro)
* [Sandbox](#sandbox)
* [Embedding](#embedding)
  * [Embedding Player](#embedding-player)
  * [Player Options](#player-options)
  * [Playing API](#playing-api)
  * [Loading Scenes](#loading-scenes)  
* [Builder](#builder)
  * [Aliases](#aliases)
  * [Instantiation](#instantiation)
  * [Structures](#structures) 
  * [Shapes](#shapes)
  * [Fill &amp; Stroke](#fill--stroke)
  * [Static Modification](#static-modification)
  * [Bands](#bands)
  * [Constants](#constants)
  * [Tweens](#tweens)
  * [Tween Easings](#tween-easings)
  * [Time Easing](#time-easing)  
  * [Repeat Modes](#repeat-modes)
  * [Modifiers &amp; Painters](#modifiers--painters)
  * [Events](#events)
  * [Time Jumps](#time-jumps)  
  * [Elements Interactions](#elements-interactions)
  * [Helpers](#helpers)
* [Scene](#scene)
  * [Manual Building](#manual-building)  
  * [Element Structure](#element-structure)
  * [The Flow](#the-flow)
  * [`Element` reference](#element-reference)
  * [`Path` reference](#path-reference)
  * [`Text` reference](#text-reference)
  * [Events, Deeply](#events--deeply)
* [Importers](#importers)
  * [Animatron](#animatron)
  
Intro
-----

Here's the documentation on using Animatron Player to load external scenes and play them at your site. _And_ it's also about building your scenes manually, but in a very easy way (we're sure you haven't seen the easier one). _And_ here is also the reference on all of the player internals. The three in one. Let's start.

Sandbox
-------

To get the feel on how player works, you may want to play with it at [Sandbox](animatron.com/player/sandbox/sandbox.html) section. There are several examples you may observe in action there. If you want to create some animation on your own, please follow the [Builder](#builder) section, it is the general and the single class that gives you the real power over the moving scenes. 

You'll find a lot of checkboxes and radio buttons there, feel free to check and uncheck them. In fact, _Debug_ checkbox turns player in the mode where it shows additional info on current animation for developer (such as FPS, elements' names and their registration points), _Interactive/Non-Interactive_ button (it is not a checkbox, because an additional option may appear in future) enables/disables capturing mouse/keyboard events by canvas.

Emdedding
---------

### Embedding Player ###

You have an unbelievable option to include a player in your own page and to load there any animation you want. You may even [build your own scene](#builder) and show it at your site. This chapter is all you need to make this happen.

#### 1. Using IFRAME ####

The first option is just to embed the player with some external scene to your site. You may publish one from Animatron tool (when it will be launched) and get the embed code, it will look like this:

        <iframe src="http://.../embed?4f97dd3de4b0fd8159a8df75"></iframe>

(Customizing player style with embed code is planned)

#### 2. From Source ####

If you'd like to _customize_ things a bit more, or to have more control over the flow, or if you want to _import_ some custom scene in custom format (i.e. JSON), or if you plan to _build_ a scene on your own, you may want the second option: to include a player from the source.

##### 2a. #####

To do so, either clone [the repository](https://github.com/Animatron/player) or just download the  [`player.js`](https://raw.github.com/Animatron/player/master/player.js) and [`matrix.js`](https://raw.github.com/Animatron/player/master/vendor/matrix.js) <sub>(the last one is a super-tiny [proxy for transformation matrix](http://simonsarris.com/blog/471-a-transformation-class-for-canvas-to-keep-track-of-the-transformation-matrix), thanks to [Simon Sarris](http://simonsarris.com/))</sub> files in raw format. Now, include them in your HTML file:

    <!DOCTYPE html>
    <html>
            
      <head>
        <title>My Great Page</title>
     ➭  <script src="./matrix.js" type="text/javascript"></script>
     ➭  <script src="./player.js" type="text/javascript"></script>
     ➭  <!-- importer or scene files go here, if one required -->
     ➭  <script type="text/javascript">
     ➭     function startPlaying() {
     ➭       . . . // here goes loading/playing code
     ➭     } 
     ➭  </script>
       </head>
      
     ➭ <body onload="startPlaying();">
         <canvas id="my-canvas"></canvas>   
       </body>
      
    </html>
  
If you are importing scene in some custom format, do not forget to include the importer (see [below](#loading-scenes) on importing scenes).
  
Then, you have a `Player` object.

##### 2b. #####

Now you may easily create a player with either of two ways below, just provide us with correct id of the canvas to attach to, and ensure that it is accessible through DOM (use `body.onload`, for example, like in previous code sample): 

    var player = createPlayer('my-canvas')
    // or: var player = new anm.Player('my-canvas');

##### 2c. #####

And you may easily rule the flow by loading your own scene or importing one:

    var my_scene = ...
    player.load(my_scene).play();

(See [below](#loading-scenes) for more information on loading scenes, and see [Builder](#builder) and/or [Scene](#scene) sections for more information on scene internals)

You may create as many players as you want, just be sure to have enough of canvases for them.

### Player Options

You may pass options object to player, if you want to configure it accurately. 

#### mode ####

`mode` is a way player will interact with user and how it will look like to him. You may set it this way:

    // var C = anm.C;
    createPlayer('my_canvas', { 'mode': C.M_VIDEO });
    
Mode can be:

 * `C.M_VIDEO` — (default) fits for animations that do not interact with user, like movies; controls are shown, info block is shown, mouse/keybord events on shapes are not handled;
 * `C.M_PREVIEW` — fits for animations/movies with showing no controls/info; both controls and info block are disabled and _no_ mouse/keyboard events handled at all;
 * `C.M_DYNAMIC` — fits for games and interactive animations; both controls and info block are disabled and all mouse/keyboard events are handled on the objects expecting them;
 
There are a bit more variants for `mode` and you may mix them with single pipe (`|`), like here:

    createPlayer('my_canvas', { 'mode': C.M_CONTROLS_ENABLED | C.M_INFO_DISABLED | C.M_HANDLE_EVENTS });   
 
But they are intended for rare use and we hope you'll be fine with three predefined ones.

You may also do this with `var player = createPlayer(...); player.mode = C.M_...;`, it has the same effect.

**NB**: `C.M_VIDEO`, `C.M_PREVIEW` and `C.M_DYNAMIC` are the precalculated mixes of these "precise" options.

#### debug ####

If you want to see the FPS rate, shapes origin points, names of the shapes, the traces of their translate operations, set `debug` to `true`. You may also do this with `var player = createPlayer(...); player.debug = true;`, it has the same effect.

#### zoom ####

To zoom an animation besides the canvas size (normally all animations fit the canvas), you may use `zoom` option. You may also do this with `var player = createPlayer(...); player.zoom = ...;`, it has the same effect.

#### meta ####

`meta` block provides the information about the animation author, title and copyright. However, if you load the Scene with [Importer](#importers), it will be overriden from there (it also is useful if you associate one separate scene with one separate player).

#### cnvs ####

`cnvs` (shorten from 'canvas') is the tuning of the canvas size, player background color and the default duration of the scene (it also is useful if you associate one separate scene with one separate player).

#### Example ####

The complete options object, filled with default values, looks like this (any option is optional, pardon the tautology: you may even pass an empty object, if you want):

    { "debug": false, // in debug mode, FPS, shapes names and moving paths are shown
      "mode": C.M_VIDEO, // player mode, may be C.M_PREVIEW or C.M_DYNAMIC
      "zoom": 1.0, // zoom ratio for animation
      "meta": { "title": "Default", // meta data is injected in info block
                "author": "Anonymous",
                "copyright": "© NaN",
                "version": -1.0,
                "description": 
                        "Default project description",
                [ "modified": 12272727271871 ] }, // in milliseconds, not used currently
      "cnvs": { ["fps": 30,] // time coefficient, not used currently
                "width": 400, // animation width, player will be resized if required
                "height": 250, // animation height, player will be resized if required   
                "bgfill": { color: "#fff" }, // canvas background color
                "duration": 10 } } // duration may be auto-calculated, but if provided,
                                  // this value will be taken

### Playing API

> ♦ `createPlayer(canvasId: String[, options: Object])`

> ♦ `load(scene: Any[, importer: Importer])`

> ♦ `play([time: Float][, speed: Float])`

> ♦ `pause()`

> ♦ `stop()`

> ♦ `onerror(callback: Function(evt: Event))`

### Loading Scenes ###

Player works with Scenes and plays any Scene easily, if this Scene is of those:

* Any scene in any JS-compatible format (String, JavaScript Array or Object, a Big Number), if you have an [`Importer`](#importers) for it; 
* An URL to JSON, the one we may load with AJAX; the returned JSON may be in any format, just ensure that you have a corresponding [`Importer`](#importers) for it;
* [`Builder`](#builder) instance, see its reference below;
* [`Scene`](#scene) instance, see its reference below;
* An array of `Clip`s or `Elements`, they are also described in [Scene section](#scene);

Loading and playing a scene requires a scene object (you may load it from external file or create in place) and an instance of [Importer](#importers), if this scene is in unknown format. 

#### a. from any object (with Importer) ####

Just include the [Importer](#importers) in the head section of your HTML file. If you store your scene in a file, then also include the scene file:

`my_scene.js`:

    var my_scene = { 
        . . . 
    };

`foo.html`:

    . . .
    <!-- player files -->
    <script src="./my_importer.js" type="text/javascript"></script>
    <script src="./my_scene.js" type="text/javascript"></script>
    . . .

Loading code:

    createPlayer('my_canvas').load(my_scene, new MyImporter())
                             .play();

**Note**: You may re-use one importer to load several scenes.

#### b. by URL ####

You don't need to include the scene, since it will be loaded with AJAX, just ensure that URL returns true JSON format, that this location is accessible for your client and do not forget to include importer:

    <!-- player files -->
    <script src="./my_importer.js" type="text/javascript"></script>

Loading code:

    createPlayer('my_canvas')
            .load('http://acme.com/my_scene.json', new MyImporter())
            .play();

#### c. building with Builder ####

[`Builder`](#builder) is an easy way to build animations (scenes) in JQuery-like style. So you may pass the created scene to the player and have fun. Do not forget to include `Builder`, since it is not the required player file. You may get it in raw format the same way as player files: [`builder.js`](https://raw.github.com/Animatron/player/master/builder.js).

    <!-- player files -->
    <script src="./builder.js" type="text/javascript"></script>

Loading code:

    var scene = new Builder('blue rect').rect([100, 100], [40, 40])
                                        .fill('#00f')
                                        .stroke('#f00', 2)
                                        .rotate([0, 5], [0, Math.PI / 2]);
    createPlayer('my_canvas').load(scene).play();

**Note**: You may want to create an alias for builder, so it will look even more in JQuery-style:

    var b = Builder._$; // instead of "b", you may even name it "_" or "$",
                        // if it will not clash with JQuery or some other library
                        // on the page
    var scene = b().add(
                       b().rect(. . .)
                  ).add(
                       b().circle(. . .)
                  ).add(
                       b('custom clip').. . .
                  );

More information is in [Builder](#builder) section.

#### d. creating Scene instance ####

You may build a [`Scene`](#scene) instance manually, with no usage of `Builder`, if you want (but `Builder` is really-really tiny, why? :) ). So you don't need to include anything additional to player files (except the case when you build your scene in external file, so you'll need to include this very file):

    var C = anm.C;
    var scene = new anm.Scene();
    var elem = new anm.Element();
    elem.xdata.path = new anm.Path('M36 35 L35 70 L90 70 L50 20 Z',
                      { width: 2, color: '#300' },
                      { color: '#f00' });
    elem.addTween({
        type: C.T_ROTATE,
        band: [0, 3],
        data: [Math.PI / 6, 0]
    });
    elem.addTween({
        type: C.T_TRANSLATE,
        band: [0, 3],
        data: anm.Path.parse('M-100 -100 L100 100 Z')
    });
    elem.addTween({
        type: C.T_ALPHA,
        band: [1.5, 3],
        data: [1, 0]
    });
    scene.add(elem);

    createPlayer('my_canvas').load(scene).play();

#### e. from array of Clips ####

`Clip` is the nickname for `Element` in our player, so there is no difference between them, just construct some elements and add them as array (if fact, it is not the preferred method, it is just provided for the real conformists):

    var first = new anm.Element();
    first.addPainter(function(ctx) {
      ctx.save();
      ctx.strokeStyle = '#f00';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(50, 50);
      ctx.stroke(); 
      ctx.closePath();
      ctx.restore();
    });
    var second = new anm.Clip();
    second.addPainter(function(ctx) {
      ctx.save();
      ctx.strokeStyle = '#0f0';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(50, 30);
      ctx.lineTo(100, 100);
      ctx.stroke(); 
      ctx.closePath();
      ctx.restore();
    });

    createPlayer('my_canvas').load([first, second]).play();

Builder
-------

`Builder` is the best method for accelerated scene building. It is based on JQuery-like concept (the _State Monad_, if it says something to you), so the instance of `Builder` is the one single object you'll need to do anything you want. If you are not JQuery lover, name it "just useful chaining".

Below is the reference for all of the `Builder` possibilities.

Let's give an example: this is how the typical complicated scene looks when constructed with `Builder`:

    var b = Builder._$; // quick alias                              
    b('scene').band([0, 20])
              .add(b('red-rect').fill('#f00')
                                .rect([30, 30], [20, 40])
                                .rotate([0, 10], [0, Math.PI / 2]))
              .add(b('bendie').image('./bender.png')
                              .band([10, 15])
                              .alpha([0, 1], [0, 1])                             
                              .trans([1, 5], [[0, 0], [20, 20]])
                              .bounce());                              
                            
You may load any animation created with `Builder` directly to player, so this code, for example, will nicely work:

    createPlayer('my-canvas').load(b().rect([0, 20], [40, 40])).play(); 
    
By the way, order of operations over the `Builder` instance has <sub>almost</sub> absolutely no matter for the result, it is only the matter of easy-reading your own code. To be honest, there are several minor exceptions, and if they will be important, we'll mention them individually in the corresponding section. Until that, feel free to mess things while it fits you and your friends. 

#### Sandbox
    
[Sandbox](http://animatron.com/player/sandbox/sandbox.html) also works with the examples constructed with `Builder` (among with manually created [Scene](#scene) instances), it just uses the value returned from user code as the scene to load into player. So if you want to see any example from this document in action, just copy-paste it to Sandbox page and add the last line returning any `b` instance to the player, like `return scene;` or `return child;` or `return b('wrapper').add(child).add(child);`.

### Aliases

It is too long to type `new Builder(. . .)` all the time when you need a new instance of `Builder`, so it is recommended to make an alias for it. Any you want, even "`_`" (underscore), just ensure that it not clashes with some existing variable. So, if you are using JQuery on your page, please don't use "`$`" alias, or wrap your code with anonymous function. We think the best one is "`b`".

    var b = Builder._$; // $_ points to the function that calls 
                        // "new Builder(arguments)" 

Among with `b` (or your variant), you may need some alias to access player constants (in fact, they are only used for easings, so it is really optional, if you don't use any of these). The single object that contains player constants is `anm.C`, so you may append some `C` variable to your code, if you want to access it faster:

    var C = anm.C;
    
The last optional variant is to make alias for a `Builder` class itself (not a constructor), because you may find useful to use its static methods (they allow to quickly create paths from points and gradients and make other complicated things easier). Here's the way:

    var B = Builder;
    
Now you may write something like this:

    b().rect([20, 20], [10, 10])
       .fill(B.grad(['#f00', '#00f']))
       .alpha([0, 7], [1, 0], C.E_CINOUT); // Cubic In-Out Easing

### Instantiation

> ♦ `Builder % ([String | Element | Builder])`

`Builder` constructor takes either of:

* Nothing — creates an empty element and keeps it inside to work with it during next calls;
* `String` — creates an element with given name and keeps it inside to work with it during next calls;
* `Element` — keeps the given element inside to work with it during next calls;
* `Builder` — creates a clone of the given `Builder`, so next changes for the last
              one does not apply to created one and vise versa;

Every `Builder` instance have five public properties: `v`, `n`, `x` and `f`, `s`. Factually, you will need only the `v` one: it points to the `Element` instance `Builder` works with. `f` and `s` are current fill and stroke, `n` is the name of element, and `x` is element's `xdata` (see `xdata` explanation in [Element](#element) reference section, but you'll for sure don't need it if you use `Builder` to build scenes):

    var b = Builder._$; // we will omit it in next snippets

    // Nothing
    var b_noname = b();
    console.log(b_noname.v instanceof anm.Element); // true
    console.log(b_noname.n === ''); // true

    // String
    var b_named = b('shape');
    console.log(b_named.v instanceof anm.Element); // true
    console.log(b_named.n === 'shape'); // true

    // Element
    var elem = new anm.Element();
    elem.name = 'foo';
    var b_elem = b(elem);
    elem.name = 'bar';
    console.log(b_elem.v instanceof anm.Element); // true
    console.log(b_elem.n === 'foo'); // true

    // Builder
    var b_src = b('src');
    var b_dst = b(b_src);
    console.log(b_src.n === b_dst.n); // true
    console.log(b_src.v === b_dst.v); // false (they're different instances) 
    
<!-- TODO: image of the process described in paragraph below -->    
    
When you have an instance of `Builder`, it is just the prepared state of some [shape](#shapes): path, image, or text. It becomes dynamic when you add [tweens](#tweens) and/or [modifiers](#modifiers) to it. But it is still just prepared dynamic condition — to make it play, you need to pass (load) it into player. This is when system appends all required functionality to it, allows it to act. The same is true for [Element](#element-reference). Of course, you don't need to add every Builder/Element, it happens automatically for the complete scene tree when you load it into player. See [Scene](#scene) section for more information on this, if you want. 

### Structures

Thanks to `Builder` mechanics, you may build scenes with nesting level of any depth. Just put one element inside another, once again with other one, and keep adding and adding, and wow — you accidentally have the tree of elements right in your hands:

> ♦ `builder.add % (what: Element | Builder) => Builder`

Any `Element` or `Builder` instances are allowed to add; by the way, you may treat the top (root) element as the scene:

    var scene = b('scene').band([0, 3]);
    var cols_count = 26;
    var rows_count = 16;
    var column;
    for (var i = 0; i < cols_count; i++) {
        scene.add(column = b('column-' + i));
        // you may keep adding sub-child elements even when
        // you've already appended a child to your scene, 
        // it is only important to do it before 
        // calling player.load for this scene 
        for (var j = 0; j < rows_count; j++) {
            column.add(b('elm-' + j)
                       .rect([i*15, j*15], [10, 10])
                       .rotate([0, 3], [0, Math.PI * 2]));
        }
        var offset = (cols_count / (i+1))*6;
        column.band([0, 1.5])
              .trans([0, 1.5], [[0, 0], 
                                [offset, offset]])
              .bounce();
    }
    scene.move([10, 10]);
    
So, to resume: any element may be a parent one, it may have any number of children (it only may affect performance, but we keep working to enhance these limits), you may (but not required to) draw something with a parent element, and then with its children, and they will be drawn one over another. All of the values (like points, angles, time bands) of some element are relative to the parent element, if it exist. If it not, they are relative to global things. If you change the parent, values stay the same, but now they are relative to a new parent. 

Just add something like `.circle([0, 0], 50)` to the `column` element in example above, and you'll see how it works. (It will shift the location of columns to be in center of circle, so you may want to change `scene.move([10, 10])` to `scene.move([60, 60])`, like the radius of circle + padding of 10, and the animation will be back in bounds).

### Shapes

If you will dive into internals of player API ([Scene](#scene) section), you will notice that any element may represent:

* Nothing — so nothing will be drawn with it (however, you may affect children elements without even drawing something);
* Path — any path, including rectangles, circles, polygons or any of your custom-shaped-curves;
* Image — just give us just an accessible URL, soon we will even support splitting the image and showing it's parts in different acts of the scene;
* Text — any text, this one is separate from "Path" concept, because it has a lot of own manners;

In fact, you may use several of those in one element, they will be drawn correctly, but why you'd need it? So please, treat every single element as only one of these. 

So, how'd you create them? Let's start from two basic shapes, rectangle and circle. If you test the examples, they will be drawn with default fill and stroke, so you'll see them for sure.

#### rect ####

> ♦ `builder.rect % (pt: Array[2,Integer], rect: Array[2,Integer]) => Builder`

You may easily create a rectangle by specifying its location and its width/height this way:

    b().rect([ 50, 50 ], // its center will pe placed at (50,50) of parent
             [ 100, 50 ]); // it will have 100-unit width and 50-unit height
             
#### circle ####
             
> ♦ `builder.circle % (pt: Array[2,Integer], radius: Float) => Builder`

To create circle, specify its location and radius, and that's all:

    b().circle([ 40, 35 ], // its center will pe placed at (40,35) of parent
               8); // it will have 8-unit radius

**NB:** Circle is not a Path, unlike rectangle, if you want the truth — it is created with [Painter](#painters) and draws a corresponding arc, but from a user point of view, we think, it best fits this disguise.

#### path ####

> ♦ `builder.path % (path: String | Path, [pt: Array[2,Integer]]) => Builder`

Now, if you want some custom shape, you may have it with the similarly easy way
(may be just a bit complex, though :) ). There's two ways to do it: 

1. If you know & like SVG, you'll like to pass the string here.

        b().path('M0 0 L50 50 C105 260 260 260 380 40 Z');
        
     The string format currently differs from 'standard' SVG path description, 
     it only supports `M`|`L`|`C` commands, only in upper-case, and we don't
     think it will be required to extend it, may be only adding `Q`-quad segment.

2. If not, we have an even simpler way for you: you just create the array of points, using `B.path` helper (remember static methods from [Aliases](#aliases) chapter?)

        b().path(B.path([ [ 0, 0 ], [ 50, 50 ],
                          [ 80, 80 ], [ 120, 100 ] ]))
                          
    This path will 'turn' at each of four points and end at (120, 100). If you add a last point of (0, 0) (equal to start point), it will be the closed path.
    
    This way even accepts curve segments. If you specify six coordinates instead of two, it will treat that element as bezier-curve points (see [`bezierCurveTo`](http://www.html5canvastutorials.com/tutorials/html5-canvas-bezier-curves/) to know what means each of points). It works like this:
    
         b().path(B.path([ [ 0, 0 ], [ 50, 50 ],
                         [ 105, 260, 260, 260, 380, 40 ],
                         [ 0, 0 ] ]));
                    
    The second one works even faster, because it don't parses a string.
    
The optional `pt` argument specifies the future position of the path in parent space and defaults to `[0, 0]`. 
                    
You may want to draw a shape by yourself, if it is someway more complex than a path or it is hard to describe it with a path (ellipse, for example). Then you may use [Painters](#painters) and use a canvas-context commands direclty.

**NB:** One important thing to inform you: every path passed to this function will be normalized. It means that its points will be recalculated to be relative to its center, so if you'll make a shift of 50 by x for each point before passing it to `path()`, you will surely lose the effect: change registration point with [`reg()`](#static-modification) method after the path creation for this purpose. The illustration:

    // all these calls will lead to the paths with absolutely equal points
    b().path(B.path([ [ 50, 50 ], [ 100, 100 ] ]));
    b().path(B.path([ [ 0, 0 ], [ 50, 50 ] ]));
    b().path(B.path([ [ -25, -25 ], [ 25, 25 ] ])); // this one will
                                                    // not even change
    // use this method to change the registration point
    b().path(B.path([ [ -25, -25 ], [ 25, 25 ] ]))
       .reg([ -75, -75 ]) // relative to [ 0, 0 ]
    

#### image ####

> ♦ `> builder.image % (pt: Array[2,Integer], src: String) => Builder`

To load an image into player, just provide its URL and the point where you want it to be located at first. Please ensure that this image is accessible for the player client, this restriction is the same restriction as for `drawImage` of HTML5 canvas. And supported formats are the same. And, also, please ensure you have the copyrights for the image, it will be your problem if you violate them. 

    b().image([ 30, 18 ], // its center will pe placed at (30,18)
              'http://'); // it will have 8-unit radius

**NB.** We also have plans to support sprites soon, stay tuned.

#### text ####

> ♦ `> builder.text % (pt: Array[2,Integer], lines: String | Array[String] | Text, [size: Float], [face: String | Array[String]]) => Builder`

To place a text somewhere, specify its location and the characters line. Optionally, you may pass the font and size. Lines may be specified with array instead of string, then they will be drawn one below the other, like in text.

    b().text([ 60, 40 ], 'My text');
    b().text([ 100, 100 ], My text', 12);
    b().text([ 100, 100 ], My text', 10, 'sans-serif').nostroke();
    b().text([ 120, 10 ], ['This One', 'Above', 'The Other'])
       .stroke('red').nofill();

### Fill &amp; Stroke

Any path or text are represented with default fill (gray) and stroke (black, 1-unit width), until you haven't specified another. For sure, you would like to override these depressive colors and, of course, there is a way to do it.

> ♦ `> builder.fill % (color: String | Gradient) => Builder`
> ♦ `> builder.stroke % (color: String | Gradient, [width: Float, cap: C.PC_*, join: C.PC_*]) => Builder`

The color format is either CSS-like (`#ff0060`, `#a69` `blue`) or `RGB/HSL[A]`-string (`rgb(20, 20, 90)`, `rgba(20, 20, 90, .5)`, `hsla(70, 30, 120, .7)`), similar to canvas specifications for colors. If you calculate the color in place, you may find useful `B.rgb()` and `B.hsv()` methods, they take numeric values and concatenate them into properly-formatted color-string. 

    b().fill('#f00');
    b().fill('black');
    b().fill('rgba(20, 40, 19, 0.3)');
    b().fill(B.rgb(20, 20, 70));
    b().fill(B.rgb(25, 40, 70, .5));
    b().fill(B.frgb(0, 0, .5));
    b().stroke(B.frgb(.5, .8, .9, .5));
    b().stroke('#c60000');
    b().stroke(B.hsv(270, .3, .9), 7);
    b().stroke(B.fhsv(.9, 0, .6, 1), 7);

Color values for `rgb()` parameters are laying between `[0..255]`, alpha is a fraction of 1, `[0..1]`. For `hsv()`, hue is `[0, 360]`, because it is an angle, and all other values, including alpha, are `[0..1]`. There are also `frgb()` and `fhsv()` functions, where all values are `[0..1]`.

And, you may use gradients here! It is not so easy to create canvas-compatible gradient manually, so there is also a helper for it:

    // linear gradient
    b().fill(B.lgrad([ [ -35, -35 ], [ 35, 35 ] ], // direction of the gradient
                     [ [ 0, 'black' ], // any number of color stops
                       [ 1, 'blue'  ] ]));
    // radial gradient
    b().fill(B.rgrad([ [ 0, 0 ], [ 15, 5 ] ], // direction of the gradient
                     [ 0, 35 ], // inner and outer bounding circles radius
                     [ [ 0, 'black' ], // any number of color stops
                       [ .5, 'yellow' ],
                       [ 1, 'blue' ] ]);
      
Note that gradient direction points are specified relatively to origin point of the shape.

Besides the width (which is 1 by default), `stroke` also takes two optional parameters named `cap` and `join`. They describe the way successive strokes are connected in the paths: possible values for these will be described in [Constants](#constants) section. 

If you don't like the default stroke or fill, you'd probably want to turn one off. There are `nofill()` and `nostroke()` methods that may help with this:

> ♦ `builder.nofill % () => Builder`

> ♦ `builder.nostoke % () => Builder`

### Static Modification

As in difference with [Tweens](#tweens), sometimes you need to "correct" the state of some shape to be applied through all the scene. It makes sense when you are not able to set wanted value with the shape creation function. There's only three such methods, they correct the shape inner state: other things may be easily done with [Modifiers](#modifiers--painters).

> ♦ `builder.reg % (pt: Array[2,Integer]) => Builder`

This method changes the registration point position of the shape, this point affects tweens, so the rotation will be performed around this point, translation will be shifted with this point and so on. This point needs to be specified relative to the center of the shape. Use ['debug' mode](#player-options) of the player to see the registrations points of the shapes.

    b().cilcle([ 20, 20 ], 60).reg([ -10, -10 ]);

> ♦ `builder.move % (pt: Array[2,Integer]) => Builder`

Moving changes the position of the element in its parent coordinate system. It is a bit different thing to the point of the shape, because setting point also recalculates the path to be centered at this point and move does not. Also it is useful if you want to move a group of elements when they were already created.

    b().rect([ 10, 10 ], [ 60, 60 ]).move([ 40, 40 ]);

> ♦ `builder.zoom % (val: Array[2,Float]) => Builder`

Zooming will recalculate the path points to be positioned with the specified zoom (so it won't work for circle). There's no 'undo', you'll need to recalculate to inverted zoom to return everything back.

    b().rect([ 10, 10 ], [ 60, 60 ]).zoom([ .5, 2 ]);

### Bands

When you costruct a complex animation scene, you need to set time regions where the particular element stays visible. These regions are often called 'bands'. By default, for every shape the band is `[0, 10]`. It means that this shape is visible from 0 seconds to 10 seconds of the parent element's band, or the global time, if there's no parent specified. 

> ♦ `builder.band % (band: Array[2,Float]) => Builder`

This way you may wrap three elements and show them one by one:

    // seconds in comments are global-time seconds; 
    b('root')
      .band([2, 16])
      .circle([0, 0], 16) // this circle will be visible
                            // from 2 sec to 16 sec
      .move([40, 40])
      .add(b('child') // no band specified, so its band
                      // is [0, 10] -> 2 sec to 12 sec
            .add(b('2-4').band([0, 2]) // 2 sec to 4 sec
                         .circle([60, 20], 20))
            .add(b('3-6').band([1, 4]) // 3 sec to 6 sec
                         .circle([60, 40], 20))
            .add(b('6-9').band([4, 7]) // 6 sec to 9 sec
                         .circle([80, 60], 20))
            .add(b('8-12').band([6, 10]) // 8 sec to 12 sec
                         .circle([100, 100], 20)));             
                        
Time values may be fractional, so the band `[1.5, 3.7]` is totally correct.

Among with that, setting a band affects the [Repeat Mode](#repeat-modes) of the shape animation within the parent's time space.  

### Constants

<!-- TODO: move to the top ? -->

Some of the functions described below (such as tweens, easings, repeat modes and events managers in [Builder](#builder) and a lot of methods of [Element](#element)) use some string value determining the type of action to perform as a parameter. It is recommended to use constants for these cases, because string values may change with time, but constants will not. All constants are defined in `anm.C` object, so it will also be useful for you to you use `C` [alias](#aliases) for `anm.C`, then any constant name will look for you like `C.<constant-type>_<constant-name>`. The places where constants may be used are also marked with the same pattern. The below is the list of the possible constants grouped by type.

1. Player state `C.*` /read-only, `player.state`/
    * `C.NOTHING` — nothing loaded into player
    * `C.STOPPED` — playing stopped
    * `C.PLAYING` — playing
    * `C.PAUSED` — playing paused
2. [Player mode](#mode) `C.M_*` /`player.mode`/
    * Grouped
        * `C.M_PREVIEW` - Preview Mode, controls and interaction disabled
        * `C.M_DYNAMIC` - Dynamic Mode, controls disabled and user interaction enabled
        * `C.M_VIDEO` - Video Mode, controls enabled, but interaction disabled   
    * Separate
        * `C.M_HANDLE_EVENTS` | `C.M_DO_NOT_HANDLE_EVENTS` — Handling events (interaction) enabled/disabled  
        * `C.M_CONTROLS_ENABLED` | `C.M_CONTROLS_DISABLED` — Controls enabled/disabled
        * `C.M_INFO_ENABLED` | `C.M_INFO_DISABLED` — Info block enabled/disabled
3. [Events](#events) `C.S_*`, `C.X_*`, `C.XT_*`
    * Player
        * `C.S_PLAY` — Playing started
        * `C.S_PAUSE` — Playing paused
        * `C.S_STOP` — Playing stopped
        * `C.S_LOAD` — Scene loaded
        * `C.S_ERROR` — Error happened
    * Element
        * Mouse `C.X_M*`, `C.XT_MOUSE`
            * `C.X_MCLICK` — Mouse Click event
            * `C.X_MDCLICK` — Mouse Double-Click event
            * `C.X_MMOVE` — Mouse Move event
            * `C.X_MUP` — Mouse Up event
            * `C.X_MDOWN` — Mouse Down event
        * Keyboard `C.X_K*`, `C.XT_KEYBOARD`
            * `C.X_KPRESS` — Key Press event
            * `C.X_KUP` — Key Up event
            * `C.X_KDOWN` — Key Down event
        * `C.X_DRAW` — Draw event
4. [Repeat mode](#repeat-modes) `C.R_*`
    * `C.R_ONCE` — play once
    * `C.R_REPEAT` — repeat playing
    * `C.R_BOUNCE` — play forward-backward and repeat
5. [Tweens](#tweens) `C.T_*`
    * `C.T_TRANSLATE` — Translate Tween
    * `C.T_SCALE` — Scale Tween
    * `C.T_ROTATE` — Rotate Tween
    * `C.T_ROT_TO_PATH` — Rotate-To-Path Tween
    * `C.T_ALPHA` — Alpha Tween
6. [Easings](#tween-easings) `C.E_*`
    * Curve-based Easings
        * `C.E_DEF` — Default easing
        * `C.E_IN` | `C.E_OUT` | `C.E_INOUT` — Standard In, Out and In/Out easings
        * `C.E_SIN` | `C.E_SOUT` | `C.E_SINOUT` — Sine In, Out and In/Out easings
        * `C.E_QIN` | `C.E_QOUT` | `C.E_QINOUT` — Quad In, Out and In/Out easings
        * `C.E_CIN` | `C.E_COUT` | `C.E_CINOUT` — Cubic In, Out and In/Out easings
        * `C.E_QTIN` | `C.E_QTOUT` | `C.E_QTINOUT` — Quart In, Out and In/Out easings
        * `C.E_QIIN` | `C.E_QIOUT` | `C.E_QIINOUT` — Quint In, Out and In/Out easings
        * `C.E_EIN` | `C.E_EOUT` | `C.E_EINOUT` — Exponent In, Out and In/Out easings        
        * `C.E_CRIN` | `C.E_CROUT` | `C.E_CRINOUT` — Circular In, Out and In/Out easings
        * `C.E_BIN` | `C.E_BOUT` | `C.E_BINOUT` — Back In, Out and In/Out easings
    * Easings that require data
        * `C.E_PATH` — Path-based easing
        * `C.E_CSEG` — Curve Segment-based easing
        * `C.E_FUNC` — Function-based easing                
7. [Paths](#path) `C.P_*`
    * Segment type
        * `C.P_MOVE` - Move-Segment
        * `C.P_LINETO` - LineTo-Segment
        * `C.P_CURVETO` - CurveTo-Segment
8. [Stroke](#fill--stroke) `C.PC_*`
    * Cap/Join type
        * `C.PC_ROUND`
        * `C.PC_BUTT`
        * `C.PC_MITER`

### Tweens

Tween is some modification of the shape that continously changes shape state from one to another during some concrete time period. If you want to move a shape from one point to another, rotate from one angle to another, scale it from one size to another, change its opacity, ..., in some time frame, this is the thing you need.

There's a generic method of adding any type of the tween, but for better code-readability it is recommended to use the concrete methods instead of gereric one. Though, we need to give you a spec of it anyway, because it will make you know what things are general for tweens:

> ♦ `builder.tween % (type: C.T_*, band: Array[2,Float], [data: Any], [easing: C.E_* | Object]) => Builder`

It takes type of the tween, its time-band (relatively to the band of its owner), optional data that will be passed to tween function on every call, and optional easing of the tween (the function that changes the speed tween performs depending of current time), which is a type constant or a custom object created with `B.easing()` (see [Easings](#tween-easings) section below to know more about easings). See type constants for tweens and easings in [Constants](#constants) section. Examples:

    b().rect([10, 10], [90,30 ])
       .tween(C.T_TRANSLATE, [0, 3], 
              B.path([ [0, 0], [20, 20], [10, 30],
                       [70, 70], [12, 12], [100, 50] ]));
    b().rect([40, 40], [12, 70])
       .tween(C.T_ROTATE, [0, 1.5], 
              [ Math.PI, Math.PI/2 ], C.E_CINOUT)
       .tween(C.T_ROTATE, [1.5, 3], 
              [ Math.PI/2, Math.PI ], C.E_QINOUT);
              
Now, the methods for concrete tweens:

> ♦ `builder.trans % (band: Array[2,Float], points: Array[2,Array[2, Float]], [easing: C.E_* | Object]) => Builder`

Translates the shape from point to point (handle is at registration point) during the given time frame:

    b().trans([7, 30], [[12, 40], [50, 30]]); // from (12, 40) to (50, 30)

> ♦ `builder.transP % (band: Array[2,Float], path: String | Path, [easing: C.E_* | Object]) => Builder`

Translate the shape along the points of given path. This one is useful when you want something to follow some other thing or move along some complex line or curve. The speed may be controlled with easing. 

    b().transP([5, 13], 'M40 40 C40 40 20 120 200 30 L80 80 '+ 
                        'C70 70 24 35 40 100 L40 40 Z');
    b().transP([0, 20], B.path([[ 40, 40 ], 
                        [ 40, 40, 20, 120, 200, 30 ],
                        [ 80, 80 ], 
                        [ 70, 70, 24, 35, 40, 100 ],
                        [ 40, 40 ]));
    b().transP([1, 9], 'M30 30 L0 0 Z', C.E_QIOUT);

> ♦ `builder.rotate % (band: Array[2,Float], angles: Array[2,Float], [easing: C.E_* | Object]) => Builder`

Rotates the shape around its registration point, starting from first angle to another angle (in radians):

    b().rotate([5, 20], [ 0, Math.PI * 2 ]);
    b().rotate([1, 10], [ Math.PI / 2, Math.PI * 2 ], C.E_IN); 

> ♦ `builder.rotateP % (band: Array[2,Float], [easing: C.E_* | Object]) => Builder`

Rotates the shape to be aligned to the current moving path, so it will be pointed perpendicularly to the active section. That's why this tween makes sense (and works) only when used with `translate()` (which in fact constructs a linear path from given points) and `translateP()`. If you have two translate tweens applied one after another, you may specify a wrapping band for `rotateP`.

     b().translate([2, 4], [[20, 15], [30, 40]]).rotateP([2, 4]);
     b().translateP([0, 6], 'M20 20 L40 40 Z')
        .translate([4, 9], [[12, 40], [25, 16]]).rotateP([0, 9], C.E_IN);

> ♦ `builder.scale % (band: Array[2,Float], values: Array[2,Array[2, Float]], [easing: C.E_* | Object]) => Builder`

Scales the shape by x and y separately. The values required to be specified in this format: `[ [ startScaleX, startScaleY ], [ endScaleX, endScaleY ] ]`, all of them are relative to the starting size.

    b().scale([3, 6], [[.5, .3], [1.7, 2.1]]);

> ♦ `builder.xscale % (band: Array[2,Float], values: Array[2, Float], [easing: C.E_* | Object]) => Builder`

Scales the shape both width and height simultaneously. So it is literally means 'make shape larger' or 'make shape smaller'.

    b().xscale([3, 9], [.5, 2]);

> ♦ `builder.alpha % (band: Array[2,Float], values: Array[2,Float], [easing: C.E_* | Object]) => Builder`

Changes the opacity value of the shape through time. The acceptable values are fractions of 1.

    b().alpha([8, 16], [.5, 1]);
    b().alpha([1.2, 3], [0, 1], C.E_COUT);    

The order in which different types of tweens are applied is fixed internally (`[ C.T_TRANSLATE, C.T_SCALE, C.T_ROTATE, C.T_ROT_TO_PATH, C.T_ALPHA ]`), so you may add them in any succession. However, order of the tweens of the *same type* do matters if their time frames overlap.

### Tween Easings

Easing of the tween is the function that takes actual time of the tween animation and substitues it with another, returned to the tween. The function of time. In result you may get the effect of accelerating or slowing down or even bouncing animations. Every tween method has an optional possibility to use some provided easing function or any custom one:

    b().trans(..., C.E_CINOUT);
    b().xscale(..., function(t) { return 1-t; });
    b().alpha(..., B.easing(function(t, obj) {
                     return obj.width * t;
                   }, obj));

If there's no easing specified for a tween, you may say that it has easing function of `function(t) { return t; }`. Both `t` parameter value and required returned value are values from `[0..1]` range, relative to the duration of the tween.

There are a lot of predefined easing (27, currently), see [Constants](#constants) for a list of their types. All predefined easings are curve-segment-based, it means that the easing function takes a correspoing point from some internal curve segment of a path and returns it's position relatively to segment length. You may see all of them (and some more) in action [at this site](http://easings.net/).

    b().rotate([2, 17], [0, Math.PI*2], C.E_QTIN);

You have, however, the option to set any function you want (again, just ensure that it returns value from 0 to 1):

    b().rotate([2, 17], [0, Math.PI*2], function(t) { return 1-t; });
    
If you want the easing based on segment, use `B.easingC()` method and pass 6 curve segment points there:

    b().rotate([2, 17], [0, Math.PI*2], B.easingC([20, 20, 19, 30, 45, 120]));
    
If you want the easing based on segment, use `B.easingP()` method and pass there a path with either string or `B.path()`:

    b().rotate([2, 17], [0, Math.PI*2], B.easingP('M20 20 C20 20 19 30 45 120 Z'));
    b().rotate([2, 17], [0, Math.PI*2], B.easingP(B.path([20, 20], [20, 20, 19, 30, 45, 120], [20, 20]));   
    
### Time Easing

Except easing for concrete tweens, you may want to set a function to substitute time for all tweens of the shape in the range of shape's band. There are two methods for it, first one gets time in the bounds of the band, the second one gets time in the bounds of `[0..1]`, relative to the band.

> ♦ `builder.time % (f: Function(t: Float)) => Builder`

    b().band([3, 16]).time(function(t) {
        console.log(t); // will get values from 3 to 16
        return 19-t; // turn time backwards
    });

> ♦ `builder.tease % (ease: Function(t: Float)) => Builder`

    b().band([3, 16]).tease(function(t) {
        console.log(t); // will get values from 0 to 1
        return 1-t; // turn time backwards
    });

### Repeat Modes

<!-- TODO: test repeat methods at global level and in different levels of inside -->

Sometimes you want certain animation of a shape or shape group to repeat until the end. Use the repeat modes to achieve this! If you set a repeat mode to a shape, it keeps repeating/applying its tweens until the finish of the parent band. The band of the element to repeat must be less than the band of the parent to make it work as it should. So, if parent band is `[2, 102]` and a child has band `[0, 5]` with `loop()` mode, then the tweens of the last will be repeated exactly 25 times. Please always remember that default band for all elements is `[0, 10]`, so when you are using repeat modes you'll often need to specify band not only for the shape to repeat, but also for its parents, if they exist.

There are three repeat modes currently supported:

* `C.R_ONCE` — play once (`once()`)
* `C.R_REPEAT` — repeat playing (`loop()`) 
* `C.R_BOUNCE` — play forward, then backward, and repeat (`bounce()`)

You may set one with a constant or using a concrete method (provided in brackets). You may also reset `loop()` and `bounce()` modes with `once()` call in the end:

    b().mode(C.R_REPEAT);
    b().loop();
    b().rect([20, 40], [10, 70]).rotate([0, 2], [0, Math.PI]).bounce();

> ♦ `builder.mode % (mode: C.R_*) => Builder`

> ♦ `builder.once % () => Builder`

> ♦ `builder.loop % () => Builder`

> ♦ `builder.bounce % () => Builder`

### Modifiers &amp; Painters

Every [Element](#element) stores two split parts of data inside: static and dynamic. Static part is a read/only data that will not be changed through animation process. Dynamic part is about the actions to perform with (or parameters to apply to) these drawn things on every frame, so it is allowed to be changed. Static data (called `xdata`) contains links to the current path or text or image, its registration point, band and repeat mode. Dynamic part (called `state`) contains shape coordinates, scale for each side, rotation angle, opacity and current time position. 

Conforming to canvas mechanics, on every frame, to draw every single element, we need two steps. Fisrt step is to modify the canvas coordinate space to match element position, rotation angle and scale; it is the data we take from `state`. Second step is to draw the element in current coordinate space; is uses data from `xdata`.

See [The Flow](#the-flow) section for more detailed description. 

#### Modifiers

__Modifier__ is the function that gets current local time and changes shape's `state` conforming to it. It may even substitute this time. And any shape may have any number of such functions, they will be applied to this shape one by one on every frame before drawing. Tweens are also modifiers. In fact, they are prepared when you load your scene into player. One modifier checks if element band fits current time. If any of modifiers fail, the element will not be drawn.

> ♦ `builder.modify % (modifier: Function(time: Float, data: Any), [data: Any]) => Builder`

To add modifier function to a shape, use `modify()` method. This function gets local time (if band is `[2, 17]`, then this value will be in `[0..15]` range); its `this` pointer points to the shape's `state`, so you may freely *modify* it; this function *must* return either `true` or `false`, if one of such functions returns `false`, the element will not even be drawn.

<!-- TODO: `rx` and `ry` are replaced on every frame, so user may not change the registration point during the animation. Is it ok? -->

<!-- TODO: may be it is more convenient to return false (nothing) for modifier to pass and true if it needs to be stopped? because most of modifiers now return true -->

    b().modify(function(t) {
        this.x = 10 * t;
        this.sy = t / 15;
        return true;
    });
    
    // adding prepared modifier to several shapes
    // and passing some data to it
    var preparedModifier = function(t, value) {
        this.angle = Math.PI / (t * value);
        return true;
    };
    b().modify(preparedModifier, .1);
    b().modify(preparedModifier, .5);
    b().modify(preparedModifier, .7);
    b().modify(preparedModifier, 1);
    
    // you may add several modifiers to one shape
    var my_shape = b();
    my_shape.modify(preparedModifier, .6);
    my_shape.modify(function(t) {
        this.alpha = t / my_shape.v.duration();
    });
    
    // returning false if this element must not be visible
    b().modify(function(t) {
        return (t > 4);
    });

#### Painters

__Painter__ is the function that gets current context and applies shape's `xdata` to draw something. And any shape may have any number of such functions, they will be applied one by one on every frame to draw it. Debug function that draw registration points and moving paths are also painters. In fact, they are prepared when you load your scene into player.

> ♦ `builder.paint % (painter: Function(ctx: Context, data: Any), [data: Any]) => Builder`

To add painter function to a shape, use `paint()` method. This function gets canvas context; its `this` pointer points to the shape's `xdata`, so you may use it to draw something, but please *do not* modify anything at first level of `xdata`.

<!-- TODO: or `xdata` is allowed to modify? -->

    b().paint(function(ctx) {
        ctx.fillStyle = '#f00';
        ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(60, 60);
        ctx.lineTo(160, 50);
        ctx.closePath();
        ctx.fill();
    });
    
    // adding prepared painter to several shapes
    // and passing some data to it
    var preparedPainter = function(ctx, text) {
        this.text.lines = text;
        this.text.apply(ctx);
    }
    b().paint(preparedPainter, "Y");
    b().paint(preparedPainter, "M");
    b().paint(preparedPainter, "C");
    b().paint(preparedPainter, "A");
    
    // you may add several painters to one shape
    var my_shape = b();
    my_shape.paint(preparedPainter, "G");
    my_shape.paint(function(ctx) {
        ctx.arc(....);
    });

### Events

Every shape may receive the events user perform with the canvas. Shape receives all occuring events if it was visible for user in the moment when the event took place, its position has no matter.

<!-- TODO: need to test the case when shape is not visible but there was a click and it receives it -->

> ♦ `builder.on % (type: C.X_*, handler: Function(evt: Event, t: Float)) => Builder`

**NB**: Event handling way may change in near future, it is not a stable part of API for the moment. Look for the changes of this document when you use new version of player.

Currently, only keyup / keydown / keypress (`C.X_KUP`, `C.X_KDOWN`, `C.X_KPRESS`) and mclick / mdown / mup / mmove (`C.X_MCLICK`, `C.X_MDOWN`, `C.X_MUP`, `C.X_MMOVE`) events are supported.

Event handlers have the same access to state as modifiers do (in fact, they are modifiers that perform last, when all others modifiers were performed):

    var my_elm = b();
    my_elm.on(C.M_CLICK, function(evt) {
        if (my_elm.v.contains(evt.pos)) {
            this.x = evt.pos[0];
            this.y = evt.pos[1];  
        }
        return true;
    });
    
You may see the use of `contains()` in the example: it tests if shape has the point given, and it is a special method made to match current time of animation, use it only in events handlers.
    
<!-- TODO: it's hard to use my_elm-like var every time, but `this` always points to state... -->
    
Currently, every mouse event contains only a mouse position (`evt.pos`) and every key event contains only a pressed key info (`evt.key`).

### Time Jumps

Sometimes you need to change time/frame while playing or on some event, mostly when you have some complex animation, like human body or so. Sometimes it is enough to jump in time, sometimes there's a lot of stuff in a scene, or even its frames calculated dynamically, so its easier to assign a name to frame.

There are more than one way to do it.

To perform a jump in some concrete moment of time, you may either use a `time()` function described [above](#time-easing):

    b().band([5, 15]).time(function(t) {
        if (t > 10) return (t - 8); // the same as jump to local 2
        else return t; 
    });
    
    b().band([5, 15]).tease(function(t) {
        if (t > 0.5) return (t - 0.3); // the same as jump to local 2
        else return t; 
    });
    
Or you may jump with [modifier](#modifiers):

    b().band([5, 15]).modify(function(t) {
        if (t > 5) this.p = 2; // this.p sets local time to jump 
                               // to and proceed from
    });
    
    b().band([5, 15]).modify(function(t) {
        if (t > 5) this.t = .2; // this.t sets relative time to jump 
                                // to and proceed from 
    });
    
You may do the similar jump while handling an [event](#events):

    b().band(...).on(C.X_MCLICK, function(evt) {
        if (evt.pos[0] > 50) this.t = 2; // or this.p = .2 
    });
    
Also you may set a name to some frame using `key()` function and jump to it with modifier or event handler by assigning the name to `this.key`:

> ♦ `builder.key % (name: String, value: Float) => Builder`

    b().band([5, 45])
       .add(b('red').rect(...).band([0, 10])
                              .alpha([0, 2], [0, 1])
                              .rotate([2, 5], ...)
                              .trans([5, 10]))
       .add(b('blue').rect(...).band([10, 20])
                               .alpha([0, 1], [0, 1])
                               .rotate([1, 6], ...)
                               .trans([6, 10], ...))
       .key('red-appeared', 2) // value is local time
       .key('red-rotated', 5) 
       .key('red-moved', 10)
       .key('blue-appeared', 11)
       .key('blue-rotated', 16)
       .key('blue-moved', 20)
       .on(C.X_MCLICK, function(evt) {
           if (evt.pos[0] > 50) this.key = 'blue-rotated';
       })
       .modify(function(t) {
           if (t > 20) this.key = 'red-appeared';
       });

### Elements Interactions

### Helpers

Scene
-----

### Manual Building  

### Element Structure 

### The Flow

### Element reference

### Path reference

### Text reference

### Events, Deeply

Importers
---------
 
### Animatron