importModule('core.string');

/*global getResource importModule parseSkin */

/**
 * Parse a skin from a resource and render it using the given context.
 * @param skinOrResource
 * @param context
 */
function renderSkin(skinOrPath, context) {
    var skin = (skinOrPath instanceof Skin) ?
           skinOrPath : createSkin(getResource(skinOrPath));
    skin.render(context);
}

/**
 * Parse a skin from a resource.
 * @param resource
 */
function createSkin(resource) {
    var mainSkin = [];
    var subSkins = {};
    var currentSkin = mainSkin;
    var parentSkin = null;
    parseSkin(resource, function(part) {
        if (part.name === 'extends') {
            var skinPath = part.getParameter(0);
            var skinResource = resource.getRepository().getResource(skinPath);
            parentSkin = createSkin(skinResource);
        } else if (part.name === 'subskin')  {
            var skinName = part.getParameter('name', 0);
            currentSkin = [];
            subSkins[skinName] = currentSkin;
        } else {
            currentSkin[currentSkin.length] = part;
        }
    });
    // normalization: cut trailing whitespace so it's
    // easier to tell if main skin shoule be inherited
    var lastPart = mainSkin[mainSkin.length - 1];
    if (typeof(lastPart) === 'string' && lastPart.trim() === '') {
        mainSkin.pop();
    }
    return new Skin(mainSkin, subSkins, parentSkin);
}

/**
 * The Skin object. This takes an array of skin parts (literal strings and MacroTags)
 * and a dictionary of subskins.
 * @param mainSkin an array of skin parts: string literals and macro tags
 * @param subSkins a dictionary of named skin components
 */
function Skin(mainSkin, subSkins, parentSkin) {

    var self = this;

    this.render = function(context) {
        if (mainSkin.length === 0 && parentSkin) {
            renderInternal(parentSkin.getSkinParts(), context);
        } else {
            renderInternal(mainSkin, context);
        }
    };

    this.renderSubskin = function(skinName, context) {
        if (!subSkins[skinName] && parentSkin) {
            renderInternal(parentSkin.getSkinParts(skinName), context);
        } else {
            renderInternal(subSkins[skinName], context);
        }
    };

    this.getSubskin = function(skinName) {
        if (subSkins[skinName]) {
            return new Skin(subSkins[skinName], subSkins, parentSkin);
        } else {
            return null;
        }
    };

    this.getSkinParts = function(skinName) {
        var parts = skinName ? subSkins[skinName] : mainSkin;
        if (!parts || (!skinName && parts.length === 0)) {
            return parentSkin ? parentSkin.getSkinParts(skinName) : null;
        }
        return parts;
    };

    var renderInternal = function(parts, context) {
        for (var i in parts) {
            var part = parts[i];
            if (part instanceof MacroTag) {
                if (part.name) {
                    evaluateMacro(part, context);
                }
            } else {
                res.write(part);
            }
        }
    };

    var evaluateMacro = function(macro, context, paramIndex) {
        paramIndex = paramIndex || 0;
        if (macro.name in builtins) {
            builtins[macro.name](macro, context, paramIndex);
        } else {
            var value = evaluateExpression(macro, context);
            if (value !== null && value !== '' && value !== undefined) {
                res.write(macro.getParameter('prefix') || '');
                res.write(value);
                res.write(macro.getParameter('suffix') || '');
            } else {
                res.write(macro.getParameter('default') || '');
            }
        }
    };

    var evaluateExpression = function(macro, context) {
        var path = macro.name.split('.');
        var elem = context;
        for (var i in path) {
            elem = elem[path[i]];
            if (!elem) {
                break;
            }
        }
        if (elem instanceof Function) {
            return elem(macro, self, context);
        } else {
            return elem;
        }
    };

    // builtin macro handlers
    var builtins = {
        render: function(macro, context, paramIndex) {
            var skinName = macro.getParameter(paramIndex);
            self.renderSubskin(skinName, context);
        },
        // experimental if tag
        "if": function(macro, context, paramIndex) {
            var condition = macro.getParameter(paramIndex);
            if (evaluateExpression(condition, context)) {
                evaluateMacro(macro, context, paramIndex + 1);
            }
        }
    };

    this.toString = function() {
        return "[Skin Object]";
    };

}