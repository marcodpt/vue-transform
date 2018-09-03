var form = require('./json/form.json')

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
    path: '/basic',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: 'icon',
        component: 'tests',
        props: {
          component: 'icon',
          tests: {
            name: 'check'
          }
        }
      }, {
        path: 'button',
        component: 'tests',
        props: {
          component: 'button',
          tests: {
            data: {msg: 'You click me!'},
            click: function (data) {
              window.alert(data.msg)
            },
            icon: 'play',
            label: 'Click me with router view!'
          }
        }
      }, {
        path: 'data',
        component: 'tests',
        props: {
          component: 'data',
          tests: {
            model: {id: '2018-12-25'},
            id: 'id',
            format: 'date'
          }
        }
      }, {
        path: 'input',
        component: 'tests',
        props: {
          component: 'input',
          tests: {
            model: {id: 'Test'},
            id: 'id'
          }
        }
      }, {
        path: 'text',
        component: 'tests',
        props: {
          component: 'text',
          tests: {
            model: {id: 'Test'},
            id: 'id'
          }
        }
      }, {
        path: 'select',
        component: 'tests',
        props: {
          component: 'select',
          tests: {
            model: {id: 'Gauss'},
            id: 'id',
            source: function (model, callback) {
              callback([
                "Eistein",
                "Newton",
                "Gauss",
                "Euler",
                "Riemann"
              ])
            }
          }
        }
      }, {
        path: 'file',
        component: 'tests',
        props: {
          component: 'file',
          tests: {
            model: {},
            id: 'id'
          }
        }
      }, {
        path: 'item',
        component: 'tests',
        props: {
          component: 'item',
          tests: {
            model: {id: 'Test'},
            id: 'id'
          }
        }
      }
    ]
  }, {
    path: '/form',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      {
        path: 'simple',
        component: 'tests',
        props: {
          component: 'form',
          tests: {
            model: form.model,
            label: 'Test form'
          }
        }
      }, {
        path: 'complete',
        component: 'tests',
        props: {
          component: 'form',
          tests: {
            label: 'Complete form',
            icon: 'cog',
            buttons: [
              {
                icon: 'play',
                type: 'primary',
                label: 'Submit'
              }
            ],
            model: form.model,
            fields: form.fields,
            submit: function (data) {
              window.alert(JSON.stringify(data, undefined, 2))
            }
          }
        }
      }
    ]
  }, {
    path: '*',
    redirect: '/form/complete'
  }
]
