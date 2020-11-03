const client = require('../lib/client');
// import our seed data:
const rogues = require('./rogues.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      rogues.map(rogue => {
        return client.query(`
                    INSERT INTO rogues (user, alias, name, alive, category, year)
                    VALUES ($1, $2, $3, $4, $5);
                `,
        [user.id, rogue.alias, rogue.name, rogue.alive, rogue.category, rogue.year]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
