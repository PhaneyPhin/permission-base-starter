"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myModuleGenerator = myModuleGenerator;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
function myModuleGenerator(options) {
    return (tree, _context) => {
        // If user typed "admin/user", split at the slash:
        let path = '';
        let name = options.name;
        if (options.name.includes('/')) {
            const segments = options.name.split('/');
            name = segments.pop(); // "user"
            path = segments.join('/'); // "admin"
        }
        const templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.template)({
                ...options,
                ...core_1.strings,
                name, // now "user"
            }),
            (0, schematics_1.forEach)((fileEntry) => {
                if (fileEntry.path.endsWith('.template')) {
                    const newPath = fileEntry.path.replace('.template', '');
                    return {
                        path: newPath,
                        content: fileEntry.content,
                    };
                }
                return fileEntry;
            }),
            (0, schematics_1.move)(`./src/${core_1.strings.dasherize(path)}/${core_1.strings.dasherize(name)}`),
        ]);
        return (0, schematics_1.mergeWith)(templateSource)(tree, _context);
    };
}
