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
    const name = file.match(/(\w*)\.vue$/)[1]
    count++
    return { name, file }
  })

  const getComponents = () => components

  logger.info(`${count} components compiled for PHPStorm`)

  this.addTemplate({
    src: resolve(__dirname, '../templates', 'components.js'),
    fileName: '../.components.gen.js',
    options: { getComponents },
  })

}
