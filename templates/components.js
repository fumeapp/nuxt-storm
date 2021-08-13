import Vue from 'vue'
<%= options.getComponents().map(({ name, file }) => {
  return `Vue.component('${name}', '') \n` +
         `Vue.component('Lazy${name}', '')`
}).join('\n') %>
