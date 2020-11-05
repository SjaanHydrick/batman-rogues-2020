const client = require('../lib/client');
// import our seed data:
const rogues = require('./rogues.js');
const categories = require('./categories.js');
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
      categories.map(category => {
        return client.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *;
        `,
        [category.name]);
      })
    );

    await Promise.all(
      rogues.map(rogue => {
        return client.query(`
                    INSERT INTO rogues (user_id, alias, name, alive, category_id, year)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    ORDER BY alias ASC;
                `,
        [user.id, rogue.alias, rogue.name, rogue.alive, rogue.category_id, rogue.year]);
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
