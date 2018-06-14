const testEnv = require('./test-environment')
const db = require('../functions/db')

let testDb = null

beforeEach(() => {
  testDb = testEnv.getTestDb()
  return testEnv.initialise(testDb)
})

afterEach(() => testEnv.cleanup(testDb))

test('getUsers gets all users', () => {
  // One for each letter of the alphabet!
  const expected = 3
  return db.getUsers(testDb)
    .then(users => {
      const actual = users.length
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

test('getUser gets a single user', () => {
  const expected = 'Bron'
  return db.getUser(1, testDb)
    .then(user => {
      const actual = user.name
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

test('insertEntry inserts a new entry', () => {
  const expected = 6
  const data = {
    user_id: 4,
    meat_id: 3,
    amount: 200,
    date: '2018-06-13'
  }
  return db.insertEntry(data, testDb)
    .then(entry => {
      const actual = Number(entry)
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})

test('historTotal calculates the total savings of an user', () => {
  const expected = 600
  const id = 1
  return db.historyTotal(id, testDb)
    .then(total => {
      const actual = Number(Object.values(total))
      expect(actual).toBe(expected)
    })
    .catch(err => expect(err).toBeNull())
})
