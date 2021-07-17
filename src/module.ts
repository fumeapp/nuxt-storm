import { resolve } from 'path'
import consola from 'consola'

export default function stormModule (moduleOptions) {
  if (process.env.NODE_ENV === 'production') {
    return
  }
  let count = 0
  const logger = consola.withScope('nuxt:storm')

  let components
  this.nuxt.hook('components:extend', dirs => {
    components = [...dirs].map(file => {
      count++
      return { name: file.pascalName, file: file.filePath}
    })
  });

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
