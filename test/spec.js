const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

describe('Application launch', function () {
  this.timeout(5000)

  beforeEach(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start();

  })

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
      // Please note that getWindowCount() will return 2 if `dev tools` are opened.
      // assert.equal(count, 2)
    })
  })

  it('initial window title is INTO-CPS App', function () {
    return this.app.client.getTitle().then(function (title) {
      assert.equal(title, 'INTO-CPS App')
    })
  })

  it('displays Welcome in mainView', function () {
    return this.app.client.getText('#mainView').then(function (title) {
      assert.equal(title, 'Welcome to the INTO-CPS Application version '+ process.env.npm_package_version)
    })
  })
})
