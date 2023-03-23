let loggedIn = "";

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: '../server/db/csds393.db',
    },
    useNullAsDefault: true
  })

  exports.groupAll = async (req, res) => {

    knex('flight')
    .select('email')
    .whereBetween('flighttime', [
      knex.raw("ADDTIME(?,'0 2:0:0.00')", ['*insert flight time*']),
      knex.raw("ADDTIME(?,'0 -2:0:0.00')", ['*insert flight time*']),
    ])
    .where({ '*enter incoming or out going data *': true })
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
      loggedIn = req.body.email;
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving flights: ${err}` })
    })
}