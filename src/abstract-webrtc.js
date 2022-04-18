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

  async onRemoteTrack (track, stream, info) {
    if (track.kind === 'audio') {
      await this.setupGainNode(track, stream)
    }
  }

  async setupGainNode (audioTrack, stream) {
    const ctx = new AudioContext()
    const src = ctx.createMediaStreamSource(new MediaStream([audioTrack]))
    const gainNode = ctx.createGain()
    gainNode.gain.value = 1
    // Connect the nodes
    src.connect(gainNode)
    gainNode.connect(ctx.destination)
    stream.originalTrack = audioTrack
    audioTrack.hasGainNode = true
    stream.gainNode = gainNode
    // Set up a method on the stream to change its volume
    stream.volume = volume => {
      if (ctx.state === 'suspended') {
        // We need to start this
        ctx.resume()
      }
      gainNode.gain.value = volume * volume
    }
    if (this.options.isChrome) {
      const audio = new Audio()
      audio.muted = true
      const tmpStream = new MediaStream([audioTrack])
      audio.srcObject = tmpStream
      stream.audio = audio
    }
  }

  async discover () {
    throw new Error('Unimplemented')
  }

  async updateVolume () {
    throw new Error('Unimplemented')
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
