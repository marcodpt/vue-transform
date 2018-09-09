var form = require('./json/form.json')
var validate = require('./json/validate.json')

form.fields.forEach((field, i) => {
  if (field.source === '&country') {
    form.fields[i].source = function (model, callback) {
      callback(['Russia', 'Italy', 'Brazil'])
    }
  } else if (field.source === '&city') {
    form.fields[i].source = function (model, callback) {
      if (model.country === 'Russia') {
        callback([
          {id: 1, label: 'Moscow'},
          {id: 2, label: 'St. Petersburg'}
        ])
      } else if (model.country === 'Italy') {
        callback(['Roma', 'Veneza', 'Milao'])
      } else if (model.country === 'Brazil') {
        callback(['Sao Paulo', 'Rio de Janeiro', 'Porto Alegre', 'Manaus'])
      } else {
        callback(['Unknown'])
      }
    }
  } else if (field.source === '&banana') {
    form.fields[i].source = function (model, callback) {
      callback(['Apple', 'Banana'])
    }
  }
})

module.exports = [
  {
    path: '/components',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: 'form',
        component: 'tmx-tests',
        props: {
          component: 'form',
          tests: {
            model: form.model,
            label: 'Test form'
          }
        }
      }, {
        path: 'modal',
        component: 'tmx-tests',
        props: {
          component: 'modal',
          tests: {
            model: form.model,
            fields: form.fields,
            submit: function () {
              console.log('submited')
              console.log(this.model)
            }
          }
        }
      }
    ]
  }, {
    path: '*',
    redirect: '/components/form'
  }
]
