// Greasemonkey script to add a permalink to the tag library.
// HT http://joanpiedra.com/jquery/greasemonkey/.
//
// ==UserScript==
// @name          tspl
// @namespace     tspl
// @description   Greasemonkey script to add a permalink to the tag library.
// @include       http://jats.nlm.nih.gov/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==


if (window.top == window.self) {

    //setTimeout(function() {
    $('frame[name="main"]').load( function() {
        var mainframe = top.frames["main"].document;
        console.info("mainframe is " + mainframe);
        var pageheader = $('body.main div.pageheader', mainframe);
        var next = pageheader.next();
        var header = next.is('h1') ? next : next.children('h1').filter(':first');
        //var header = $(pageheader.next('h1, div h1');

        // Get the main frame's key:
        // (returns http://jats.nlm.nih.gov/archiving/tag-library/1.0/n-fm00.html)
        var mainUrl = mainframe.location.toString();
        var mainFilename = mainUrl.match("[-a-zA-Z0-9]+\.html")[0];
        var type, slug;
        var types = {
            "elem": elems,
            "attr": attrs,
            "pe": pes,
            "chap": chaps
        };
        for (type in types) {
            var xref = types[type];
            for (var name in xref) {
                //console.info("type " + type + ", name: " + name);
                if (xref[name] == mainFilename) {
                    slug = name;
                    break;
                }
            }
            if (typeof(slug) != "undefined") break;
        }
        console.info("type " + type + ", slug " + slug);

        var realLoc = window.location.toString();
        var loc = realLoc.replace(/\?.*/, "");
        var permahref = loc + "?" + type + "=" + slug;
        console.info("permahref = " + permahref);
        var permalink = $('<a href="' + permahref + '" target="_top">permalink</a>');
        permalink.css({ "float": "right" });
        header.before(permalink);
    //}, 2000);
    });
}


