<p align="center">
  <img src="https://github.com/fumeapp/nuxt-storm/blob/master/nuxt-webstorm.png?raw=true" />
  <img src="https://github.com/fumeapp/nuxt-storm/blob/master/nuxt-phpstorm.png?raw=true" />
</p>

# nuxt-storm

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
<!-- [![npm downloads][npm-downloads-src]][npm-downloads-href] -->

>[NuxtJS](https://nuxtjs.org) module for [WebStorm](https://jetbrains.com/webstorm/) and [PhpStorm](https://jetbrains.com/phpstorm/)  that assists with using [@nuxt/components](https://github.com/nuxt/components) 


## Quick Setup

1. Add `nuxt-storm` to your project as a development dependency

```bash
# Using yarn
yarn add --dev nuxt-storm
# Using npm
npm install --save-dev nuxt-storm
```

2. Add `.components.gen.js` to your `.gitignore` file
   
3. Add 'nuxt-storm' to the `buildModules` section of `nuxt.config.js`

```js
{
  buildModules: [
    'nuxt-storm',
  ]
}
```

ℹ️ If you are using `nuxt < 2.9.0`, use `modules` property instead.

That's it! Restart your `yarn dev` and components should now be found ✨

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-storm/latest.svg
[npm-version-href]: https://npmjs.com/package/nuxt-storm

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-storm.svg
[npm-downloads-href]: https://npmjs.com/package/nuxt-storm

[license-src]: https://img.shields.io/npm/l/nuxt-storm.svg
[license-href]: https://npmjs.com/package/nuxt-storm
