// TODO: errors, thrown in playing process (from modifiers), should be supressed (?), but passed to onerror handler
// TODO: errors, thrown in player creating process, should be shown in the console.
// TODO: errors should be thrown only once

describe("errors", function() {

    var player;

    var FPS = 15;

    beforeEach(function() {
        this.addMatchers(_matchers);

        spyOn(document, 'getElementById').andReturn(_mocks.canvas);
        _fake(_Fake.CVS_POS);

        _FrameGen.enable(FPS);

        player = createPlayer('test-id');
    });

    afterEach(function() { _FrameGen.disable(); });

    describe("throwing errors and their types", function() {

        it("throws an error if modifier or painter code is incorrect (internal errors)", function() {
            player.state.muteErrors = false;

            var elm = new anm.Element();
            elm.addModifier(function(t, duration) {
                if (t > .5) {
                    some_undefined_var.foo = 'bar';
                }
            });

            var scene = new anm.Scene();
            scene.duration = 1;
            scene.add(elm);

            (function(spec) {
                doAsync(player, scene, {
                    do: 'play', until: anm.C.STOPPED, timeout: 1.2,
                    then: function() { spec.fail('Should not reach this block due to error'); },
                    onerror: function(err) { expect(err).toEqual(jasmine.any(Error));
                                             expect(player.state.happens).toBe(anm.C.STOPPED);
                                             _FrameGen.disable(); }
                });
            })(this);
        });

        it("throws an error manually fired from modifier or painter (manually fired errors)", function() {
            player.state.muteErrors = false;

            var elm = new anm.Element();
            elm.addModifier(function(t) {
                if (t > .5) {
                    throw new Error('foo');
                }
            });

            var scene = new anm.Scene();
            scene.duration = 1;
            scene.add(elm);

            (function(spec) {
                doAsync(player, scene, {
                    do: 'play', until: anm.C.STOPPED, timeout: 1.2,
                    then: function() { spec.fail('Should not reach this block due to error'); },
                    onerror: function(err) { expect(err).toEqual(jasmine.any(Error));
                                             expect(player.state.happens).toBe(anm.C.STOPPED);
                                             _FrameGen.disable(); }
                });
            })(this);
        });

        it("throws one when player was incorrectly initialized (player-related errors)", function() {
            player.state.muteErrors = false;

            try {
                player.play();
                this.fail('Should throw an error');
            } catch(e) { expect(e).toEqual(jasmine.any(anm.PlayerError));
                         expect(player.state.happens).toBe(anm.C.NOTHING); }

            try {
                player.load();
                this.fail('Should throw an error');
            } catch(e) { expect(e).toEqual(jasmine.any(anm.PlayerError));
                         expect(player.state.happens).toBe(anm.C.NOTHING); }

            try {
                player.load(new anm.Scene());
                player.drawAt(anm.Player.NO_TIME);
                this.fail('Should throw an error');
            } catch(e) { expect(e).toEqual(jasmine.any(anm.PlayerError));
                         expect(player.state.happens).toBe(anm.C.STOPPED); }
        });

        it("throws errors related to animations (animation errors)", function() {
            player.state.muteErrors = false;

            try {
                var elm = new anm.Element();
                elm.removeModifier(function(t) {});
                this.fail('Should throw an error');
            } catch(e) {
                expect(e).toEqual(jasmine.any(anm.AnimationError));
            }

            var elm = new anm.Element();
            elm.addModifier(function(t, duration) {
                if (t > .5) {
                    elm.remove();
                }
            });

            var scene = new anm.Scene();
            scene.duration = 1;
            scene.add(elm);

            (function(spec) {
                doAsync(player, scene, {
                    do: 'play', until: anm.C.STOPPED, timeout: 1.2,
                    then: function() { spec.fail('Should not reach this block due to error'); },
                    onerror: function(err) { expect(err).toEqual(jasmine.any(anm.AnimationError));
                                             expect(player.state.happens).toBe(anm.C.STOPPED);
                                             _FrameGen.disable(); }
                });
            })(this);

        });

        it("throws a system error fired during the animation (system errors)", function() {
            player.state.muteErrors = false;

            var elm = new anm.Element();
            // since all system errors are hard-to-force, we throw one manually
            // directly from animation (this is not like we thrown some for manual errors test,
            // this is in purpose of emulation)
            elm.addModifier(function(t) {
                if (t > .2) {
                    throw new SystemError('foo');
                }
            });

            var scene = new anm.Scene();
            scene.duration = 1;

            (function(spec) {
                doAsync(player, scene, {
                    do: 'play', until: anm.C.STOPPED, timeout: 1.2,
                    then: function() { spec.fail('Should not reach this block due to error'); },
                    onerror: function(err) { expect(err).toEqual(jasmine.any(anm.SystemError));
                                             expect(player.state.happens).toBe(anm.C.STOPPED);
                                             _FrameGen.disable(); }
                });
            })(this);
        });

    });

    describe("handling errors", function() {

        describe("onerror handler", function() {

            describe("getting errors", function() {

                it("gets internal errors", function() {
                    this.fail("NI");
                });

                it("gets manually-fired errors", function() {
                    this.fail("NI");
                });

                it("gets player-related errors", function() {
                    this.fail("NI");
                });

                it("gets animation-related errors", function() {
                    this.fail("NI");
                });

                it("gets system errors", function() {
                    this.fail("NI");
                });

            });

            describe("suppressing errors", function() {

                it("suppresses internal errors", function() {
                    this.fail("NI");
                });

                it("suppresses manually-fired errors", function() {
                    this.fail("NI");
                });

                it("supresses player-related errors by default", function() {
                    this.fail("NI");
                });

                it("supresses animation-related errors by default", function() {
                    this.fail("NI");
                });

                it("supresses even system errors by default", function() {
                    this.fail("NI");
                });

            });

            describe("forcing errors to raise (with returning true)", function() {

                it("works for internal errors", function() {
                    this.fail("NI");
                });

                it("works for manually-fired errors", function() {
                    this.fail("NI");
                });

                it("works for player-related errors", function() {
                    this.fail("NI");
                });

                it("works for animation-related errors", function() {
                    this.fail("NI");
                });

                it("works for system errors", function() {
                    this.fail("NI");
                });

            });

        });

        describe("mute errors option", function() {

            describe("when enabled (by default)", function() {

                it("mutes internal errors", function() {
                    this.fail("NI");
                });

                it("mutes manually-fired errors", function() {
                    this.fail("NI");
                });

                it("mutes player-related errors", function() {
                    this.fail("NI");
                });

                it("mutes animation-related errors", function() {
                    this.fail("NI");
                });

                it("mutes system errors", function() {
                    this.fail("NI");
                });

                describe("passes errors to onerror handler anyway", function() {

                    it("works for internal errors", function() {
                        this.fail("NI");
                    });

                    it("works for manually-fired errors", function() {
                        this.fail("NI");
                    });

                    it("works for player-related errors", function() {
                        this.fail("NI");
                    });

                    it("works for animation-related errors", function() {
                        this.fail("NI");
                    });

                    it("works for system errors", function() {
                        this.fail("NI");
                    });

                });

            });

            describe("when disabled", function() {

                it("do not mutes internal errors", function() {
                    this.fail("NI");
                });

                it("do not mutes manually-fired errors", function() {
                    this.fail("NI");
                });

                it("do not mutes player-related errors", function() {
                    this.fail("NI");
                });

                it("do not mutes animation-related errors", function() {
                    this.fail("NI");
                });

                it("do not mutes system errors", function() {
                    this.fail("NI");
                });

                describe("passes errors to onerror handler anyway", function() {

                    it("works for internal errors", function() {
                        this.fail("NI");
                    });

                    it("works for manually-fired errors", function() {
                        this.fail("NI");
                    });

                    it("works for player-related errors", function() {
                        this.fail("NI");
                    });

                    it("works for animation-related errors", function() {
                        this.fail("NI");
                    });

                    it("works for system errors", function() {
                        this.fail("NI");
                    });

                });

            });

        });

    });

});

// TODO: show errors over the player or alert them, if not muted?