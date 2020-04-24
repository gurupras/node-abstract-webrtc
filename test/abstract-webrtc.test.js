import AbstractWebRTC from '../index'
import testImplementation from './test-implementation'

const methods = ['setup', 'discover', 'updateVolume', 'destroy', 'sendScreen', 'stopScreen', 'sendWebcam']

describe('AbstractWebRTC', () => {
  testImplementation(() => new AbstractWebRTC())

  describe('API', () => {
    let instance
    beforeEach(() => {
      instance = new AbstractWebRTC()
    })
    test.each(methods)('%s throws error', async (method) => {
      await expect(instance[method]()).rejects.toThrow()
    })
  })
})
