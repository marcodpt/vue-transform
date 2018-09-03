<script type="text/babel">
  import T from 'libt'
  import v from '../index.vue'

  var components = {}
  Object.keys(v).forEach(key => {
    if (key !== 'lib') {
      components[`v-${key}`] = v[key]
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
        var name = 'v-' + this.component
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
      <v-button v-if="component === 'button'" v-bind="tests" />
      <v-data v-if="component === 'data'" v-bind="tests" />
      <v-file v-if="component === 'file'" v-bind="tests" />
      <v-form v-if="component === 'form'" v-bind="tests" />
      <v-icon v-if="component === 'icon'" v-bind="tests" />
      <v-input v-if="component === 'input'" v-bind="tests" />
      <v-item v-if="component === 'item'" v-bind="tests" />
      <v-select v-if="component === 'select'" v-bind="tests" />
      <v-text v-if="component === 'text'" v-bind="tests" />
    </div>
    <v-playground
      :model="tests"
      :name="component"
      :props="getProps()"
      :callback="callback"
    ></v-playground>
  </div>
</template>
