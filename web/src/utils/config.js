const APIV1 = '/api/v1'

module.exports = {
  name: 'Invoice Admin',
  prefix: 'invoiceAdmin',
  footerText: 'Invoice Admin  © 2018 Malinda',
  logo: '/public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: ['http://localhost:8080'],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    todos: `${APIV1}/todos`,
    user: `${APIV1}/user/:id`,
    todo: `${APIV1}/todo/:id`,
    invoice: `${APIV1}/invoice`,
    menus: `${APIV1}/menus`,
  },
}
