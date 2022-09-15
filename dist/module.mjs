import { useLogger, defineNuxtModule, resolvePath } from '@nuxt/kit';
import { writeFile } from 'node:fs/promises';

const name = "nuxt-storm";
const version = "1.1.1";

const logger = useLogger("nuxt-storm");
const module = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "storm"
  },
  defaults: {
    nested: false,
    alias: "@"
  },
  async setup(moduleOptions, nuxt) {
    if (process.env.NODE_ENV === "production") {
      return;
    }
    let count = 0;
    let components;
    nuxt.hook("components:extend", async (dirs) => {
      components = [...dirs].map((file) => {
        count++;
        let filePath;
        if (moduleOptions.alias) {
          let alias;
          if (typeof moduleOptions.alias !== "string")
            alias = "@";
          else
            alias = moduleOptions.alias;
          filePath = `${alias}/${file.filePath.slice(file.filePath.indexOf("components"))}`;
        } else {
          filePath = file.filePath;
        }
        return { name: file.pascalName, file: filePath };
      });
      if (moduleOptions.nested) {
        logger.info(`Nested components option detected`);
      }
      await writeComponentsFile(components);
      logger.info(`${count} components compiled for nuxt-storm`);
    });
  }
});
const writeComponentsFile = async (components) => {
  let template = `import Vue from 'vue'
    
    ${components.map(({ name: name2, file }) => {
    return `import ${name2} from '${file}'`;
  }).join("\n")}
    
    `;
  template += components.map(({ name: name2 }) => {
    let template2 = `Vue.component('${name2}', ${name2})`;
    template2 += `
Vue.component('Lazy${name2}', ${name2})`;
    return template2;
  }).join("\n");
  await writeFile(await resolvePath(".components.gen.js"), template);
};

export { module as default };
