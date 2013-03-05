/*
 * Copyright (c) 2011-2013 by Animatron.
 * All rights are reserved.
 *
 * Animatron player is licensed under the MIT License, see LICENSE.
 */

describe("versions in player", function() {

    it("player should have version", function() {
        expect(createPlayer('stub').version).toBeDefined();
        expect(createPlayer('stub').version).toBeGreaterThan(0);
    });

});