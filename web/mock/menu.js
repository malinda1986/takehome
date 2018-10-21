const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '98',
    name: 'Invoice',
    icon: 'edit',
    route: '/invoice',
  },
  {
    id: '99',
    mpid: '-1',
    bpid: '98',
    name: 'Edit Invoice',
    route: '/invoice/:id/edit',
  },
  {
    id: '100',
    mpid: '-1',
    bpid: '98',
    name: 'Add Invoice',
    route: '/invoice/add',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`] (req, res) {
    res.status(200).json(database)
  },
}
