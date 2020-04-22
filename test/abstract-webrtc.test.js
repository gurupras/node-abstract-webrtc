import AbstractWebRTC from '../index'
import testImplementation from './test-implementation'

describe('AbstractWebRTC', () => {
  testImplementation(() => new AbstractWebRTC())

  describe('API', () => {
    let instance
    beforeEach(() => {
      instance = new AbstractWebRTC()
    })
    const methods = ['setup', 'destroy', 'sendScreen', 'stopScreen', 'sendWebcam']
    test.each(methods)('%s throws error', async (method) => {
      await expect(instance[method]()).rejects.toThrow()
    })
  })
})
