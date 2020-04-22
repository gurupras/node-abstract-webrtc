const { testForEvent } = require('@gurupras/test-helpers')

const events = ['connect', 'close', 'no-stream', 'stream', 'track']

function testImplementation (ctor) {
  describe('AbstractWebRTC implementation tests', () => {
    let instance
    beforeEach(async () => {
      instance = await ctor()
    })
    test('Exposes an EventEmitter API', async () => {
      const event = `now-${Date.now()}`
      const promise = testForEvent(instance, event)
      expect(() => instance.emit(event)).not.toThrow()
      await expect(promise).toResolve()
    })
    describe('Events can be listened for', () => {
      test.each(events)('%s', async (event) => {
        const promise = testForEvent(instance, event)
        expect(() => instance.emit(event)).not.toThrow()
        await expect(promise).toResolve()
      })
    })
  })
}

module.exports = testImplementation // eslint-disable-line jest/no-export
