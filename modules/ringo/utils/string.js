/*
 * Helma License Notice
 *
 * The contents of this file are subject to the Helma License
 * Version 2.0 (the "License"). You may not use this file except in
 * compliance with the License. A copy of the License is available at
 * http://adele.helma.org/download/helma/license.txt
 *
 * Copyright 1998-2006 Helma Software. All Rights Reserved.
 *
 * $RCSfile: String.js,v $
 * $Author: zumbrunn $
 * $Revision: 8714 $
 * $Date: 2007-12-13 13:21:48 +0100 (Don, 13 Dez 2007) $
 */

var ANUMPATTERN = /[^a-zA-Z0-9]/;
var APATTERN = /[^a-zA-Z]/;
var NUMPATTERN = /[^0-9]/;
var FILEPATTERN = /[^a-zA-Z0-9-_\. ]/;
var HEXPATTERN = /[^a-fA-F0-9]/;
// Email and URL RegExps contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
// licensed unter MIT license - http://www.opensource.org/licenses/mit-license.php
var EMAILPATTERN = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
var URLPATTERN = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
var ISOFORMAT = "yyyy-MM-dd'T'HH:mm:ssZ";

/**
 * @fileoverview Adds useful methods to the JavaScript String type.
 */

export('isDateFormat',
       'toDate',
       'isUrl',
       'isFileName',
       'toFileName',
       'isHexColor',
       'toHexColor',
       'isAlphanumeric',
       'toAlphanumeric',
       'isAlpha',
       'isNumeric',
       'toCamelCase',
       'capitalize',
       'titleize',
       'entitize',
       'group',
       'unwrap',
       'digest',
       'repeat',
       'startsWith',
       'endsWith',
       'pad',
       'contains',
       'getCommonPrefix',
       'isEmail',
       'count',
       'enbase64',
       'debase64',
       'stripTags',
       'escapeHtml',
       'Sorter',
       'compose',
       'random',
       'join');

/**
 * checks if a date format pattern is correct
 * @param {String} string the string
 * @returns Boolean true if the pattern is correct
 */
function isDateFormat(string) {
    try {
        new java.text.SimpleDateFormat(string);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * parse a timestamp into a date object. This is used when users
 * want to set createtime explicitly when creating/editing stories.
 * @param {String} string the string
 * @param {String} format date format to be applied
 * @param {Object} timezone Java TimeZone Object (optional)
 * @returns {Object} the resulting date
 */
function toDate(string, format, timezone) {
    var simpleDateFormat = new java.text.SimpleDateFormat(format);
    if (timezone && timezone != simpleDateFormat.getTimeZone()) {
        simpleDateFormat.setTimeZone(timezone);
    }
    return new Date(simpleDateFormat.parse(string).getTime());
}

/**
 * function checks if the string passed contains any characters that
 * are forbidden in URLs and tries to create a java.net.URL from it
 * FIXME: probably deprecated -> ringo.Url
 * @param {String} string the string
 * @returns Boolean
 */
function isUrl(string) {
    return URLPATTERN.test(string);
}

/**
 * function checks if the string passed contains any characters
 * that are forbidden in image- or filenames
 * @param {String} string the string
 * @returns Boolean
 */
function isFileName(string) {
    return !FILEPATTERN.test(string);
}

/**
 * function cleans the string passed as argument from any characters
 * that are forbidden or shouldn't be used in filenames
 * @param {String} string the string
 * @returns Boolean
 */
function toFileName(string) {
    return string.replace(new RegExp(FILEPATTERN.source, "g"), '');
}

/**
 * function checks a string for a valid color value in hexadecimal format.
 * it may also contain # as first character
 * @param {String} string the string
 * @returns Boolean false, if string length (without #) > 6 or < 6 or
 *              contains any character which is not a valid hex value
 */
function isHexColor(string) {
    if (string.indexOf("#") == 0)
        string = string.substring(1);
    return string.length == 6 &&  !HEXPATTERN.test(string);
}

/**
 * converts a string into a hexadecimal color
 * representation (e.g. "ffcc33"). also knows how to
 * convert a color string like "rgb (255, 204, 51)".
 * @param {String} string the string
 * @returns String the resulting hex color (w/o "#")
 */
function toHexColor(string) {
    if (startsWith(string, "rgb")) {
        var buffer = [];
        var col = string.replace(/[^0-9,]/g, '');
        var parts = col.split(",");
        for (var i in parts) {
            var num = parseInt(parts[i], 10);
            var hex = num.toString(16);
            buffer.push(pad(hex, "0", 2, -1));
        }
        return buffer.join("");
    }
    var color = string.replace(new RegExp(HEXPATTERN.source), '');
    return pad(color.toLowerCase(), "0", 6, -1);
}

/**
 * function returns true if the string contains
 * only a-z and 0-9 (case insensitive!)
 * @returns Boolean true in case string is alpha, false otherwise
 */
function isAlphanumeric(string) {
    return string.length &&  !ANUMPATTERN.test(string);
}

/**
 * function cleans a string by throwing away all
 * non-alphanumeric characters
 * @returns cleaned string
 */
function toAlphanumeric(string) {
    return string.replace(new RegExp(ANUMPATTERN.source, "g"), '');
}

/**
 * function returns true if the string contains
 * only characters a-z
 * @returns Boolean true in case string is alpha, false otherwise
 */
function isAlpha(string) {
    return string.length && !APATTERN.test(string);
}

/**
 * function returns true if the string contains
 * only 0-9
 * @returns Boolean true in case string is numeric, false otherwise
 */
function isNumeric(string) {
    return string.length &&  !NUMPATTERN.test(string);
}

/**
 * Transforms string to camel-case.
 * @param {String} string a string
 * @returns {String} the resulting string
 * @since 0.5
 */
function toCamelCase(string) {
    return string.replace(/([A-Z]+)/g, function(m, l) {
        // "ABC" -> "Abc"
        return l[0].toUpperCase() + l.substring(1).toLowerCase();
    }).replace(/[\-_\s](.)/g, function(m, l) {
        // foo-bar -> fooBar
        return l.toUpperCase();
    });
}

/**
 * transforms the first n characters of a string to uppercase
 * @param {String} the string to capitalize
 * @param {Number} amount of characters to transform
 * @returns {String} the resulting string
 */
function capitalize(string, limit) {
    if (limit == null)
        limit = 1;
    var head = string.substring(0, limit);
    var tail = string.substring(limit, this.length);
    return head.toUpperCase() + tail.toLowerCase();
}

/**
 * transforms the first n characters of each
 * word in a string to uppercase
 * @param {String} string the string
 * @returns {String} the resulting string
 */
function titleize(string) {
    var parts = string.split(" ");
    var buffer = [];
    for (var i in parts) {
        buffer.push(capitalize(parts[i]));
    }
    return buffer.join(" ");
}

/**
 * translates all characters of a string into HTML entitie
 * @param {String} string the string
 * @returns {String} translated result
 */
function entitize(string) {
    var buffer = [];
    for (var i = 0; i < string.length; i++) {
        buffer.push("&#", string.charCodeAt(i).toString(), ";");
    }
    return buffer.join("");
}

/**
 * function inserts a string every number of characters
 * @param Int number of characters after which insertion should take place
 * @param String string to be inserted
 * @param Boolean definitely insert at each interval position
 * @returns String resulting string
 */
function group(string, interval, str, ignoreWhiteSpace) {
    if (!interval || interval < 1)
        interval = 20;
    if (!str || string.length < interval)
        return string;
    var buffer = [];
    for (var i = 0; i < string.length; i += interval) {
        var strPart = string.substring(i, i + interval);
        buffer.push(strPart);
        if (ignoreWhiteSpace == true ||
                (strPart.length == interval && !/\s/g.test(strPart))) {
            buffer.push(str);
        }
    }
    return buffer.join("");
}

/**
 * replace all linebreaks and optionally all w/br tags
 * @param Boolean flag indicating if html tags should be replaced
 * @param String replacement for the linebreaks / html tags
 * @returns String the unwrapped string
 */
function unwrap(string, removeTags, replacement) {
    if (replacement == null)
        replacement = '';
    string = string.replace(/[\n|\r]/g, replacement);
    return removeTags ? string.replace(/<[w]?br *\/?>/g, replacement) : string;
}

/**
 * function calculates a message digest of a string. If no
 * argument is passed, the MD5 algorithm is used.
 * @param {String} string the string to digest
 * @param {String} algorithm the name of the algorithm to use
 * @returns {String} message digest of the string
 */
function digest(string, algorithm) {
    var {ByteString} = require('binary');
    var md = java.security.MessageDigest.getInstance(algorithm || 'MD5');
    var b = ByteString.wrap(md.digest(string.toByteString()));
    var buf = [];

    for (var i = 0; i < b.length; i++) {
        var j = b[i];
        if (j < 16) {
            buf[buf.length] = '0';
        }
        buf[buf.length] = j.toString(16);
}
    return buf.join('');
}

/**
 * function repeats a string passed as argument
 * @param {String} string the string
 * @param {Number} num amount of repetitions
 * @returns {String} resulting string
 */
function repeat(string, num) {
    var list = [];
    for (var i = 0; i < num; i++)
        list[i] = string;
    return list.join('');
}

/**
 * Returns true if string starts with the given substring
 * @param {String} string the string to search in
 * @param {String} substring pattern to search for
 * @returns {Boolean} true in case it matches the beginning
 *            of the string, false otherwise
 */
function startsWith(string, substring) {
    return string.indexOf(substring) == 0;
}

/**
 * Returns true if string ends with the given substring
 * @param {String} string the string to search in
 * @param {String} substring pattern to search for
 * @returns Boolean true in case it matches the end of
 *            the string, false otherwise
 */
function endsWith(string, substring) {
    var diff = string.length - substring.length;
    return diff > -1 && string.lastIndexOf(substring) == diff;
}

/**
 * fills a string with another string up to a desired length
 * @param {String} string the string
 * @param {String} fill the filling string
 * @param {Number} length the desired length of the resulting string
 * @param {Number} mode the direction which the string will be padded in:
 * a negative number means left, 0 means both, a positive number means right
 * @returns String the resulting string
 */
function pad(string, fill, length, mode) {
    if (fill == null || length == null) {
        return string;
    }
    var diff = length - string.length;
    if (diff == 0) {
        return string;
    }
    var left, right = 0;
    if (mode == null || mode > 0) {
        right = diff;
    } else if (mode < 0) {
        left = diff;
    } else if (mode == 0) {
        right = Math.round(diff / 2);
        left = diff - right;
    }
    var list = [];
    for (var i = 0; i < left; i++) {
        list[i] = fill;
    }
    list.push(string);
    for (i = 0; i < right; i++) {
        list.push(fill);
    }
    return list.join('');
}

/**
 * Returns true if string contains substring.
 * @param {String} string the string to search in
 * @param {String} substring the string to search for
 * @param {Number} fromIndex optional index to start searching
 * @returns true if str is contained in this string
 * @type Boolean
 */
function contains(string, substring, fromIndex) {
    fromIndex = fromIndex || 0;
    return string.indexOf(substring, fromIndex) > -1;
}

/**
 * Get the longest common segment that two strings
 * have in common, starting at the beginning of the string
 * @param str1 a string
 * @param str2 another string
 * @returns the longest common segment
 */
function getCommonPrefix(str1, str2) {
    if (str1 == null || str2 == null) {
        return null;
    } else if (str1.length > str2.length && str1.indexOf(str2) == 0) {
        return str2;
    } else if (str2.length > str1.length && str2.indexOf(str1) == 0) {
        return str1;
    }
    var length = Math.min(str1.length, str2.length);
    for (var i = 0; i < length; i++) {
        if (str1[i] != str2[i]) {
            return str1.slice(0, i);
        }
    }
    return str1.slice(0, length);
}

/**
 * returns true if the string looks like an e-mail
 */
function isEmail(string) {
    return EMAILPATTERN.test(string);
}

/**
 * returns the amount of occurences of one string in another
 */
function count(string, pattern) {
        var count = 0;
        var offset = 0;
        while ((offset = string.indexOf(pattern, offset)) > -1) {
            count += 1;
            offset += 1;
        }
        return count;
    }

/**
 * returns the string encoded using the base64 algorithm
 */
function enbase64(string) {
    return require('ringo/base64').encode(string);
}

/**
 * returns the decoded string using the base64 algorithm
 */
function debase64(string) {
    return require('ringo/base64').decode(string);
}

/**
 * Remove all potential HTML/XML tags from this string
 * @param {String} string the string
 * @return {String} the processed string
 */
function stripTags(string) {
    return string.replace(/<\/?[^>]+>/gi, '');
}

/**
 * Escape the string to make it safe for use within an HTML document.
 * @param {String} string the string to escape
 * @return {String} the escaped string
 */
function escapeHtml(string) {
    return string.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;');
}

/**
 * factory to create functions for sorting objects in an array
 * @param {String} field name of the field each object is compared with
 * @param {Number} order (ascending or descending)
 * @returns {Function} ready for use in Array.prototype.sort
 */
function Sorter(field, order) {
    if (!order)
        order = 1;
    return function(a, b) {
        var str1 = String(a[field] || '').toLowerCase();
        var str2 = String(b[field] || '').toLowerCase();
        if (str1 > str2)
            return order;
        if (str1 < str2)
            return order * -1;
        return 0;
    };
}

/**
 * create a string from a bunch of substrings
 * @param {String} one or more strings as arguments
 * @returns {String} the resulting string
 */
function compose() {
    return Array.join(arguments, '');
}

/**
 * creates a random string (numbers and chars)
 * @param len length of key
 * @param mode determines which letters to use. null or 0 = all letters;
 *      1 = skip 0, 1, l and o which can easily be mixed with numbers;
 *      2 = use numbers only
 * @returns random string
 */
function random(len, mode) {
    if (mode == 2) {
        var x = Math.random() * Math.pow(10, len);
        return Math.floor(x);
    }
    var keystr = '';
    for (var i = 0; i < len; i++) {
        x = Math.floor((Math.random() * 36));
        if (mode == 1) {
            // skip 0,1
            x = (x<2) ? x + 2 : x;
            // don't use the letters l (charCode 21+87) and o (24+87)
            x = (x==21) ? 22 : x;
            x = (x==24) ? 25 : x;
        }
        if (x<10) {
            keystr += String(x);
        }    else    {
            keystr += String.fromCharCode(x+87);
        }
    }
    return keystr;
}

/**
 * append one string onto another and add some "glue"
 * if none of the strings is empty or null.
 * @param String the first string
 * @param String the string to be appended onto the first one
 * @param String the "glue" to be inserted between both strings
 * @returns String the resulting string
 */
function join(str1, str2, glue) {
        if (glue == null)
            glue = '';
        if (str1 && str2)
            return str1 + glue + str2;
        else if (str2)
            return str2;
        return str1;
    }
