const chai = require('chai')
const nock = require('nock')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const API_PORT = process.env.API_PORT || 3001
chai.use(chaiAsPromised)

const API_HOST = `http://localhost:${API_PORT}`

describe('Consumer', () => {
  describe('when a call to the Provider is made', () => {
    const date = '2020-01-12T10:30:20+10:00'
    const { fetchProviderData } = require('../consumer')

    it('can process the JSON payload from the provider', () => {
      nock(API_HOST)
        .get('/provider')
        .query({ validDate: /.*/ })
        .reply(200, {
          test: 'NO',
          validDate: date,
          count: 1000,
        })

      const response = fetchProviderData(new Date().toISOString())
      return expect(response).to.eventually.have.property('count', 0.1)
    })
  })
})