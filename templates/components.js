import Vue from 'vue'
<%= options.components.map(({ name, file }) => {
    return `import ${name} from '${file}'`
}).join('\n') %>

<%= options.components.map(({ name, file }) => {
    let template = `Vue.component('${name}', ${name})`
    template += `\nVue.component('Lazy${name}', ${name})`
    return template
}).join('\n') %>
