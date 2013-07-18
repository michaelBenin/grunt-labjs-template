# grunt-labjs-template [![Build Status](https://secure.travis-ci.org/michaelbenin/grunt-labjs-template.png?branch=master)](http://travis-ci.org/gruntjs/grunt-labjs-template)

> Create a LABjs template from list of javascript files



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-labjs-template --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-labjs-template');
```




## grunt-js-template task
_Run this task with the `grunt labjs_template` command._


## Example config

```javascript

grunt.initConfig({

  labjs_template: {
              dev: {
                  src: 'src/templates/script_tags/scripts_template.html',
                  dest: 'src/templates/_scripts.html',
                  conf: '<%= concat.main.files[1].src %>',
                  dir: '{{ STATIC_URL }}'
              }
          }

});

grunt.registerTask('default', ['loadJavascript']);

```

## Example template - from kyle simpson: https://gist.github.com/getify/603980

```
<script>
(function (global, oDOC, handler) {
    var head = oDOC.head || oDOC.getElementsByTagName('head');

    function LABjsLoaded() {

        var $L = $LAB.setOptions({AlwaysPreserveOrder:true});

        if(!oDOC.addEventListener){

            if(!global.XMLHttpRequest){
                $L.script('//ajax.googleapis.com/ajax/libs/chrome-frame/1/CFInstall.min.js');
            }

            $L.script('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js').wait(function(){
                if(!global.jQuery){
                    $L.script('<% print(grunt.script_dir); %>js/jquery-1.10.2.js');
                }
            });

        } else {

            $L.script('//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js').wait(function () {
                if (!global.jQuery) {
                    if (!global.jQuery) {
                        $L.script('<% print(grunt.script_dir); %>jquery-2.0.3.js');
                    }
                }
            });
        }

        $L
        <% print(grunt.scripts_config); %>
    }


    // loading code borrowed directly from LABjs itself
    setTimeout(function () {
        if ('item' in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(arguments.callee, 25);
                return;
            }
            head = head[0]; // reassign from live node list ref to pure node ref -- avoids nasty IE bug where changes to DOM invalidate live node lists
        }
        var scriptElem = oDOC.createElement('script'),
            scriptdone = false;
        scriptElem.onload = scriptElem.onreadystatechange = function () {
            if ((scriptElem.readyState && scriptElem.readyState !== 'complete' && scriptElem.readyState !== 'loaded') || scriptdone) {
                return false;
            }
            scriptElem.onload = scriptElem.onreadystatechange = null;
            scriptdone = true;
            LABjsLoaded();
        };
        scriptElem.src = '<% print(grunt.script_dir); %>js/labjs-2.0.3.js';
        head.insertBefore(scriptElem, head.firstChild);
    }, 0);

    // required: shim for FF <= 3.5 not having document.readyState
    if (oDOC.readyState == null && oDOC.addEventListener) {
        oDOC.readyState = 'loading';
        oDOC.addEventListener('DOMContentLoaded', handler = function () {
            oDOC.removeEventListener('DOMContentLoaded', handler, false);
            oDOC.readyState = 'complete';
        }, false);
    }
})(window, document);
</script>

```