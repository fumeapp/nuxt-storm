import { resolve } from 'path';
import { useLogger, defineNuxtModule, addTemplate, resolvePath } from '@nuxt/kit';

// -- Unbuild CommonJS Shims --
import __cjs_url__ from 'url';
import __cjs_path__ from 'path';
import __cjs_mod__ from 'module';
const __filename = __cjs_url__.fileURLToPath(import.meta.url);
const __dirname = __cjs_path__.dirname(__filename);
const require = __cjs_mod__.createRequire(import.meta.url);


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
      logger.info(`${count} components compiled for nuxt-storm in ${resolve(__dirname, "../templates", "components.js")}`);
      logger.log(components);
      logger.log(addTemplate({
        src: resolve(__dirname, "../templates", "components.js"),
        fileName: await resolvePath(".components.gen.js"),
        options: { components },
        write: true
      }));
    });
  }
});

export { module as default };
