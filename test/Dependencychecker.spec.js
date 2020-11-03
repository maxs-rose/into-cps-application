const Application = require('spectron').Application
const assert = require('assert')
const expect = require('chai').expect;
const electronPath = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')


describe('The Dependency Checker', function () {
  this.timeout(100000)

  before(function () {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    })
    return this.app.start().then(app => {return app.client.waitUntilWindowLoaded()})
  })

  after(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }

    //server.stop(done);
  })

  xit('shows an initial window', function () {
    this.app.client.waitUntilWindowLoaded().then( app => {app.webContents.isLoading().then(function (visible) {
      console.log('window is loading? ' + visible)
    })
    
  })
  
  })

  xit('should execute javascript', function () {
    return this.app.client.waitUntilWindowLoaded().then( () => {
      this.app.webContents.executeJavaScript('1 + 2')
      .then(function (result) {
        console.log(result) // prints 3
        })
    }) 

  })

  // test function implemented directly in main.js for now.
  it('should execute javascript function', function () {
    return this.app.webContents.executeJavaScript(
    'const { remote } = require("electron");' +
    'const functiontestprocess = remote.require("./functionaltestbed.js");' +
    'functiontestprocess.test(1);'
      )
      .then(function (result) {
        console.log(result) 
        })

  });

  it('should execute javascript dialog', function () {
    return this.app.webContents.executeJavaScript(
      'const dialog = require("electron").remote.dialog;' +
      'dialog.showMessageBox({type: "error", buttons: ["OK"],message:"Please install the: Co-simulation Orchestration Engine first."});', true).then((result) => {
        console.log(result);
      });
  } );

  xit('should get all webcontents', function () {
    this.app.client.waitUntilWindowLoaded().then( app => {
      result = this.app.webContents.getAllWebContents()
      console.log(result) // prints 3
        
    }) 

  })

  xit('should work', async function () {
    const { remote } = require('electron');
    const mainProcess = remote.require('./main.js');
  });
  

})



