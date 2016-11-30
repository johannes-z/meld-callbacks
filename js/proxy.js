export default class {
  constructor () {
    console.log('constructor called ...')
  }

  test (cb) {
    console.log('test called ...')
    cb('param1')
  }
}
