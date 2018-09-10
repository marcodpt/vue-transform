<script type="text/babel">
  import T from 'libt'
  import {transform} from '../index.vue'

  module.exports = {
    components: {
      transform: transform
    },
    props: {
      component: {
        type: String,
        default: ''
      },
      tests: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data: function () {
      return {
        ready: false,
        form: null,
        model: null,
        fields: null
      }
    },
    methods: {
      submit: function (data) {
        if (this.component === 'modal') {
          this.$root.$data.modal = T.copy(data)
        } else {
          this.$data.form = T.copy(data)
        }
        this.$data.ready = true
      },
      build: function () {
        this.$data.ready = false
        this.$data.model = T.copy(this.tests)
        this.$data.fields = T.copy(this.$options.components[
          (this.component === 'modal' ? 'transform' : this.component)
        ].props)
      }
    },
    mounted: function () {
      this.build()
    },
    watch: {
      component: function () {
        this.build()
      }
    }
  }
</script>

<template>
  <div>
    <div v-if="ready">
      <transform v-if="component === 'transform'" v-bind="form" />
    </div>
    <transform
      icon="cog"
      :label="'Live Playground '+component"
      :model="model"
      :fields="fields"
      :submit="submit"
      :buttons="[{
        type: 'primary',
        icon: 'cog',
        label: 'Rebuild'
      }]"
    />
  </div>
</template>
