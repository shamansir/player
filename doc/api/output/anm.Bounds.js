Ext.data.JsonP.anm_Bounds({"tagname":"class","name":"anm.Bounds","autodetected":{},"files":[{"filename":"bounds.js","href":"bounds.html#anm-Bounds"}],"members":[{"name":"constructor","tagname":"method","owner":"anm.Bounds","id":"method-constructor","meta":{}},{"name":"add","tagname":"method","owner":"anm.Bounds","id":"method-add","meta":{}},{"name":"addPoint","tagname":"method","owner":"anm.Bounds","id":"method-addPoint","meta":{}},{"name":"clone","tagname":"method","owner":"anm.Bounds","id":"method-clone","meta":{}},{"name":"exist","tagname":"method","owner":"anm.Bounds","id":"method-exist","meta":{}},{"name":"inside","tagname":"method","owner":"anm.Bounds","id":"method-inside","meta":{}},{"name":"load","tagname":"method","owner":"anm.Bounds","id":"method-load","meta":{}},{"name":"loadDiag","tagname":"method","owner":"anm.Bounds","id":"method-loadDiag","meta":{"private":true}},{"name":"maxX","tagname":"method","owner":"anm.Bounds","id":"method-maxX","meta":{}},{"name":"maxY","tagname":"method","owner":"anm.Bounds","id":"method-maxY","meta":{}},{"name":"minX","tagname":"method","owner":"anm.Bounds","id":"method-minX","meta":{}},{"name":"minY","tagname":"method","owner":"anm.Bounds","id":"method-minY","meta":{}},{"name":"toPoints","tagname":"method","owner":"anm.Bounds","id":"method-toPoints","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-anm.Bounds","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/bounds.html#anm-Bounds' target='_blank'>bounds.js</a></div></pre><div class='doc-contents'><p>The holder class for any bounds.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/anm.Bounds-method-constructor' class='name expandable'>anm.Bounds</a>( <span class='pre'>x, y, width, height</span> ) : <a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a><span class=\"signature\"></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>x</span> : Number<div class='sub-desc'>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'>\n</div></li><li><span class='pre'>width</span> : Number<div class='sub-desc'>\n</div></li><li><span class='pre'>height</span> : Number<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-add' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-add' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-add' class='name expandable'>add</a>( <span class='pre'>other</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add another bounds, so these bounds will be the union of two ...</div><div class='long'><p>Add another bounds, so these bounds will be the union of two</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>other</span> : <a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a><div class='sub-desc'><p>bounds to add</p>\n</div></li></ul></div></div></div><div id='method-addPoint' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-addPoint' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-addPoint' class='name expandable'>addPoint</a>( <span class='pre'>point</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Add another point, so these bounds will include it ...</div><div class='long'><p>Add another point, so these bounds will include it</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>point</span> : Object<div class='sub-desc'><p>point to add</p>\n<ul><li><span class='pre'>x</span> : Number<div class='sub-desc'><p>X coord of a point</p>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'><p>Y coord of a point</p>\n</div></li></ul></div></li></ul></div></div></div><div id='method-clone' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-clone' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-clone' class='name expandable'>clone</a>( <span class='pre'></span> ) : <a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a><span class=\"signature\"></span></div><div class='description'><div class='short'>Clone these bounds ...</div><div class='long'><p>Clone these bounds</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a></span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-exist' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-exist' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-exist' class='name expandable'>exist</a>( <span class='pre'></span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Are these bounds set ...</div><div class='long'><p>Are these bounds set</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-inside' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-inside' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-inside' class='name expandable'>inside</a>( <span class='pre'>pt</span> ) : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>Is given point inside ...</div><div class='long'><p>Is given point inside</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>pt</span> : Object<div class='sub-desc'>\n<ul><li><span class='pre'>x</span> : Number<div class='sub-desc'>\n</div></li><li><span class='pre'>y</span> : Number<div class='sub-desc'>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-load' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-load' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-load' class='name expandable'>load</a>( <span class='pre'>other</span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>Replace current instance values with values from another instance. ...</div><div class='long'><p>Replace current instance values with values from another instance.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>other</span> : <a href=\"#!/api/anm.Bounds\" rel=\"anm.Bounds\" class=\"docClass\">anm.Bounds</a><div class='sub-desc'><p>bounds to load values from</p>\n</div></li></ul></div></div></div><div id='method-loadDiag' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-loadDiag' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-loadDiag' class='name expandable'>loadDiag</a>( <span class='pre'>x1, y1, x2, y2</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'> ...</div><div class='long'>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>x1</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>y1</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>x2</span> : Object<div class='sub-desc'></div></li><li><span class='pre'>y2</span> : Object<div class='sub-desc'></div></li></ul></div></div></div><div id='method-maxX' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-maxX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-maxX' class='name expandable'>maxX</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>get maximum X value ...</div><div class='long'><p>get maximum X value</p>\n</div></div></div><div id='method-maxY' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-maxY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-maxY' class='name expandable'>maxY</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>get maximum Y value ...</div><div class='long'><p>get maximum Y value</p>\n</div></div></div><div id='method-minX' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-minX' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-minX' class='name expandable'>minX</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>get minimum X value ...</div><div class='long'><p>get minimum X value</p>\n</div></div></div><div id='method-minY' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-minY' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-minY' class='name expandable'>minY</a>( <span class='pre'></span> )<span class=\"signature\"></span></div><div class='description'><div class='short'>get minimum Y value ...</div><div class='long'><p>get minimum Y value</p>\n</div></div></div><div id='method-toPoints' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='anm.Bounds'>anm.Bounds</span><br/><a href='source/bounds.html#anm-Bounds-method-toPoints' target='_blank' class='view-source'>view source</a></div><a href='#!/api/anm.Bounds-method-toPoints' class='name expandable'>toPoints</a>( <span class='pre'></span> ) : [Number]<span class=\"signature\"></span></div><div class='description'><div class='short'>Convert bounds to four corner points ...</div><div class='long'><p>Convert bounds to four corner points</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>[Number]</span><div class='sub-desc'>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});