import { resolve } from 'path'
import consola from 'consola'

interface Options {
  nested?: boolean
  alias?: string | boolean
}

export default function stormModule (moduleOptions: Options) {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  let count = 0
  const logger = consola.withScope('nuxt:storm')

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
      }
      else { filePath = file.filePath }
      return { name: file.pascalName, file: filePath}
    })

    if (moduleOptions.nested) {
      logger.info(`Nested components option detected`)
    }
    logger.info(`${count} components compiled for nuxt-storm`)

    const getComponents = () => components

    this.addTemplate({
      src: resolve(__dirname, '../templates', 'components.js'),
      fileName: '../.components.gen.js',
      options: { getComponents },
    })

  });

}
