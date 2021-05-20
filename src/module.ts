import glob from 'glob'
import { resolve } from 'path'
import consola from 'consola'

export default function stormModule (moduleOptions) {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  const { nuxt } = this

  let count = 0
  const logger = consola.withScope('nuxt:storm')

  const components = glob.sync(`${nuxt.options.srcDir}/components/**/*.vue`).map(file => {
    let name
    if (moduleOptions.nested) {
      name = file.match(/components\/(.*?).vue$/)[1].replace(/\//g, '')
    } else {
      name = file.match(/(\w*)\.vue$/)[1]
      // If file is an index.vue file, use folder name instead
      if (name === 'index') {
        name = file.replace('/index.vue', '').split('/').reverse()[0]
      }
    }
    count++
    return { name, file }
  })

  const getComponents = () => components

  if (moduleOptions.nested) {
    logger.info(`Nested components option detected`)
  }
  logger.info(`${count} components compiled for nuxt-storm`)

  this.addTemplate({
    src: resolve(__dirname, '../templates', 'components.js'),
    fileName: '../.components.gen.js',
    options: { getComponents },
  })

}
