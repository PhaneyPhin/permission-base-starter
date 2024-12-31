import {
    apply,
    FileEntry,
    mergeWith,
    move,
    Rule,
    SchematicContext,
    template,
    Tree,
    forEach,
    url,
  } from '@angular-devkit/schematics';
  import { strings } from '@angular-devkit/core';
  
  export function myModuleGenerator(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
      // If user typed "admin/user", split at the slash:
      let path = '';
      let name = options.name;
      if (options.name.includes('/')) {
        const segments = options.name.split('/');
        name = segments.pop();          // "user"
        path = segments.join('/');      // "admin"
      }
  
      const templateSource = apply(url('./files'), [
        template({
          ...options,
          ...strings,
          name,             // now "user"
        }),
        forEach((fileEntry: any) => {
            if (fileEntry.path.endsWith('.template')) {
              const newPath = fileEntry.path.replace('.template', '');
              return {
                path: newPath,
                content: fileEntry.content,
              };
            }
            return fileEntry;
        }),
        move(`./src/${strings.dasherize(path)}/${strings.dasherize(name)}`),
      ]);
  
      return mergeWith(templateSource)(tree, _context);
    };
  }
  