const Emittery = require('emittery')

class AbstractWebRTC {
  constructor (options, socket, userIdentifier, iceServers) {
    new Emittery().bindMethods(this)
    Object.assign(this, {
      options,
      socket,
      userIdentifier,
      iceServers
    })
  }

  async setup () {
    throw new Error('Unimplemented')
  }

  async sendWebcam () {
    throw new Error('Unimplemented')
  }

  async sendScreen () {
    throw new Error('Unimplemented')
  }

  async stopScreen () {
    throw new Error('Unimplemented')
  }

  async destroy () {
    throw new Error('Unimplemented')
  }
}

module.exports = AbstractWebRTC
