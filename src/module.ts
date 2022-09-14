import {resolve} from 'path'
import {addTemplate, defineNuxtModule, resolvePath, useLogger} from "@nuxt/kit";
import {name, version} from '../package.json'

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
            logger.info(`${count} components compiled for nuxt-storm in ${resolve(__dirname, '../templates', 'components.js')}`)

            logger.log(components)

            logger.log(addTemplate({
                src: resolve(__dirname, '../templates', 'components.js'),
                fileName: await resolvePath('.components.gen.js'),
                options: {components},
                write: true
            }))
        });
    }
})



















/*function stormModule(moduleOptions: Options) {
    if (process.env.NODE_ENV === 'production') {
        return
    }
    let count = 0

    let components
    this.nuxt.hook('components:extend', dirs => {
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
        logger.info(`${count} components compiled for nuxt-storm`)

        const getComponents = () => components

        this.addTemplate({
            src: resolve(__dirname, '../templates', 'components.js'),
            fileName: '../.components.gen.js',
            options: {getComponents},
        })

    });

}
*/
