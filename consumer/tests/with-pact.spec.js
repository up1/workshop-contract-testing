const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const Pact = require('@pact-foundation/pact').Pact
const { somethingLike: like, term } = require('@pact-foundation/pact').Matchers
const expect = chai.expect
const API_PORT = process.env.API_PORT || 3001
const { fetchProviderData } = require('../consumer')
chai.use(chaiAsPromised)

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
  consumer: 'Consumer 01',
  provider: 'Provider 01',
  port: API_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2,
})

const submissionDate = new Date().toISOString()
const date = '2020-10-16T12:31:20+07:00'
const dateRegex =
  '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\+|\\-)\\d{2}:\\d{2}'

describe('Pact with Our Provider', () => {
  describe('given data count > 0', () => {
    describe('when a call to the Provider is made', () => {
      before(() => {
        return provider.setup()
          .then(() => {
            provider.addInteraction({
              uponReceiving: 'a request for JSON data',
              withRequest: {
                method: 'GET',
                path: '/provider',
                query: {
                  validDate: submissionDate
                }
              },
              willRespondWith: {
                status: 200,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: {
                  test: 'NO',
                  validDate: term({ generate: date, matcher: dateRegex }),
                  count: like(0.1),
                },
              }
            })
          })
      })

      it('can process the JSON payload from the provider', done => {
        const response = fetchProviderData(submissionDate)

        expect(response).to.eventually.have.property('count', 1000)
        expect(response).to.eventually.have.property('date', date).notify(done)
      })

      it('should validate the interactions and create a contract', () => {
        return provider.verify()
      })
      
    })

    // Write pact files to file
    after(() => {
      return provider.finalize()
    })
  })
})

