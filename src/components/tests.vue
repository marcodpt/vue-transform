<script type="text/babel">
  import T from 'libt'
  import tmx from '../index.vue'

  var components = {}
  Object.keys(tmx).forEach(key => {
    if (key !== 'lib') {
      components[`tmx-${key}`] = tmx[key]
    }
  })

  module.exports = {
    components: components,
    props: {
      case: {
        type: String,
        default: ''
      },
      component: {
        type: String,
        default: ''
      },
      tests: {
        type: Object,
        default: function () {
          return {}
        }
      },
      isReady: {
        type: Function
      }
    },
    data: function () {
      return {
        ready: false
      }
    },
    methods: {
      callback: function () {
        this.$data.ready = true
        if (this.isReady) {
          this.isReady()
        } 
        if (this.component === 'modal') {
          this.$root.$data.modal = T.copy(this.tests)
        }
      },
      getProps: function () {
        var name = 'tmx-' + (this.component === 'modal' ? 'form' : this.component)
        return this.$options.components[name].props
      }
    },
    watch: {
      component: function () {
        this.$data.ready = false
      }
    }
  }
</script>

<template>
  <div>
    <div v-if="ready">
      <tmx-form v-if="component === 'form'" v-bind="tests" />
    </div>
    <tmx-playground
      :model="tests"
      :name="component"
      :props="getProps()"
      :callback="callback"
    ></tmx-playground>
  </div>
</template>
