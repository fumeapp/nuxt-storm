import {defineNuxtModule, resolvePath, useLogger} from "@nuxt/kit";
import {name, version} from '../package.json'
import {writeFile} from "node:fs/promises";

interface Options {
    nested?: boolean
    alias?: string | boolean
}

const logger = useLogger('nuxt-storm')

export default defineNuxtModule<Options>({
    meta: {
        name,
        version,
        configKey: 'storm'
    },
    defaults: {
        nested: false,
        alias: '@'
    },
    async setup(moduleOptions, nuxt) {
        if (process.env.NODE_ENV === 'production') {
            return
        }
        let count = 0

        let components
        nuxt.hook('components:extend', async dirs => {
            components = [...dirs].map(file => {
                count++
                let filePath
                if (moduleOptions.alias) {
                    let alias
                    if (typeof moduleOptions.alias !== 'string') alias = '@'
                    else alias = moduleOptions.alias
                    filePath = `${alias}/${file.filePath.slice(file.filePath.indexOf('components'))}`
                } else {
                    filePath = file.filePath
                }
                return {name: file.pascalName, file: filePath}
            })

            if (moduleOptions.nested) {
                logger.info(`Nested components option detected`)
            }

            await writeComponentsFile(components)

            logger.info(`${count} components compiled for nuxt-storm`)
        });
    }
})

const writeComponentsFile = async components => {
    let template = `import Vue from 'vue'
    
    ${components.map(({name, file}) => {
        return `import ${name} from '${file}'`
    }).join('\n')}
    
    `;

    template += components.map(({name}) => {
        let template = `Vue.component('${name}', ${name})`
        template += `\nVue.component('Lazy${name}', ${name})`
        return template
    }).join('\n')

    await writeFile(await resolvePath('.components.gen.js'), template)
}
