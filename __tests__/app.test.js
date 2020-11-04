require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token;
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns rogues', async() => {

      const expectation = [
        { 'id':1, 'user_id':1, 'alias':'Bane', 'name':'Edward', 'alive':true, 'category':'Central Rogues', 'year':1993 }, { 'id':2, 'user_id':1, 'alias':'Black Mask', 'name':'Roman Sionis', 'alive':false, 'category':'Central Rogues', 'year':1985 }, { 'id':3, 'user_id':1, 'alias':'The Boss', 'name':'Sal Maroni', 'alive':false, 'category':'Organized Crime', 'year':1942 }, { 'id':4, 'user_id':1, 'alias':'Catwoman', 'name':'Selina Kyle', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':5, 'user_id':1, 'alias':'Calendar Man', 'name':'Julian Gregory Day', 'alive':true, 'category':'Secondary Rogues', 'year':1958 }, { 'id':6, 'user_id':1, 'alias':'Clayface', 'name':'Basil Karlo', 'alive':false, 'category':'Central Rogues', 'year':1940 }, { 'id':7, 'user_id':1, 'alias':'Deadshot', 'name':'Floyd Lawton', 'alive':true, 'category':'Central Rogues', 'year':1950 }, { 'id':8, 'user_id':1, 'alias':'Deathstroke', 'name':'Slade Wilson', 'alive':false, 'category':'Central Rogues', 'year':1980 }, { 'id':9, 'user_id':1, 'alias':'Firefly', 'name':'Garfield Lynns', 'alive':true, 'category':'Central Rogues', 'year':1952 }, { 'id':10, 'user_id':1, 'alias':'Great White Shark', 'name':'Warren White', 'alive':true, 'category':'Secondary Rogues', 'year':2004 }, { 'id':11, 'user_id':1, 'alias':'Hangman', 'name':'Sofia Gigante', 'alive':false, 'category':'Organized Crime', 'year':1999 }, { 'id':12, 'user_id':1, 'alias':'Harley Quinn', 'name':'Dr. Harleen F. Quinzel', 'alive':true, 'category':'Central Rogues', 'year':1992 }, { 'id':13, 'user_id':1, 'alias':'Holiday', 'name':'Alberto Falcone', 'alive':false, 'category':'Organized Crime', 'year':1996 }, { 'id':14, 'user_id':1, 'alias':'Hugo Strange', 'name':'Professor Hugo Strange', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':15, 'user_id':1, 'alias':'Hush', 'name':'Dr. Thomas Elliot', 'alive':true, 'category':'Central Rogues', 'year':2003 }, { 'id':16, 'user_id':1, 'alias':'The Joker', 'name':'Jack Napier', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':17, 'user_id':1, 'alias':'Killer Croc', 'name':'Waylon Jones', 'alive':true, 'category':'Central Rogues', 'year':1983 }, { 'id':18, 'user_id':1, 'alias':'Mad Hatter', 'name':'Dr. Jervis Tetch', 'alive':true, 'category':'Central Rogues', 'year':1948 }, { 'id':19, 'user_id':1, 'alias':'Mr. Freeze', 'name':'Dr. Victor Fries', 'alive':true, 'category':'Central Rogues', 'year':1959 }, { 'id':20, 'user_id':1, 'alias':'Onomatopoeia', 'name':'N/A', 'alive':true, 'category':'Recurring Rogues', 'year':2002 }, { 'id':21, 'user_id':1, 'alias':'The Penguin', 'name':'Oswald Chesterfield Cobblepot', 'alive':true, 'category':'Central Rogues', 'year':1941 }, { 'id':22, 'user_id':1, 'alias':'Poison Ivy', 'name':'Dr. Pamela Lillian Isley', 'alive':true, 'category':'Central Rogues', 'year':1966 }, { 'id':23, 'user_id':1, 'alias':'Ra\'s al Ghul', 'name':'Ra\'s al Ghul', 'alive':true, 'category':'League of Assassins', 'year':1971 }, { 'id':24, 'user_id':1, 'alias':'The Red Hood', 'name':'Jason Todd', 'alive':true, 'category':'Central Rogues', 'year':1987 }, { 'id':25, 'user_id':1, 'alias':'The Riddler', 'name':'Edward Nigma/Nashton', 'alive':true, 'category':'Central Rogues', 'year':1948 }, { 'id':26, 'user_id':1, 'alias':'The Roman', 'name':'Carmine Falcone', 'alive':false, 'category':'Organized Crime', 'year':1987 }, { 'id':27, 'user_id':1, 'alias':'Two-Face', 'name':'Harvey Dent', 'alive':true, 'category':'Central Rogues', 'year':1942 }, { 'id':28, 'user_id':1, 'alias':'Man-Bat', 'name':'Dr. Kirk Langstrom', 'alive':true, 'category':'Central Rogues', 'year':1970 }, { 'id':29, 'user_id':1, 'alias':'Maxie Zeus', 'name':'Maximillian Zeus', 'alive':true, 'category':'Secondary Rogues', 'year':1979 }, { 'id':30, 'user_id':1, 'alias':'Mr. Zsasz', 'name':'Victor Zsasz', 'alive':true, 'category':'Central Rogues', 'year':1992 }, { 'id':31, 'user_id':1, 'alias':'Professor Pyg', 'name':'Dr. Lazlo Valentin', 'alive':true, 'category':'Secondary Rogues', 'year':2007 }, { 'id':32, 'user_id':1, 'alias':'Scarecrow', 'name':'Professor Jonathan Crane', 'alive':true, 'category':'Central Rogues', 'year':1941 }, { 'id':33, 'user_id':1, 'alias':'Solomon Grundy', 'name':'Cyrus Gold', 'alive':false, 'category':'Secondary Rogue', 'year':1944 }, { 'id':34, 'user_id':1, 'alias':'Talia al Ghul', 'name':'Talia al Ghul', 'alive':true, 'category':'League of Assassins', 'year':1971 }, { 'id':35, 'user_id':1, 'alias':'Ventriloquist', 'name':'Arnold Wesker', 'alive':true, 'category':'Central Rogues', 'year':1988 }];

      const data = await fakeRequest(app)
        .get('/rogues')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns a single rogue', async() => {
      const expectation = { 'id':28, 'user_id':1, 'alias':'Man-Bat', 'name':'Dr. Kirk Langstrom', 'alive':true, 'category':'Central Rogues', 'year':1970 };

      const data = await fakeRequest (app)
        .get('/rogues/28')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test.only('adds a rogue to the DB and returns it', async() => {
      const expectation = {
        id: 36,
        user_id: 1,
        alias: 'Catman',
        name: 'Thomas Blake',
        alive: true,
        category: 'Secondary Rogue',
        year: 1963
      };

      const data = await fakeRequest(app)
        .post('/rogues')
        .send({
          user_id: 1,
          alias: 'Catman',
          name: 'Thomas Blake',
          alive: true,
          category: 'Secondary Rogue',
          year: 1963
        })
        .expect('Content-Type', /json/)
        .expect(200);

      const allRogues = await fakeRequest(app)
        .get('/rogues')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
      expect(allRogues.body.length).toEqual(36);
    });

    test.only('modifies a rogue inside of DB and returns it', async() => {
      const expectation = {
        id: 1,
        user_id: 1,
        alias: 'Bane',
        name: 'Antonio Diego',
        alive: false,
        category: 'Central Rogues',
        year: 1993
      };

      const data = await fakeRequest(app)
        .put('/rogues/1')
        .send({
          user_id: 1,
          alias: 'Bane',
          name: 'Antonio Diego',
          alive: false,
          category: 'Central Rogues',
          year: 1993
        })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test.only('deletes a rogue', async() => {
      const expectation = [
        { 'id':2, 'user_id':1, 'alias':'Black Mask', 'name':'Roman Sionis', 'alive':false, 'category':'Central Rogues', 'year':1985 }, { 'id':3, 'user_id':1, 'alias':'The Boss', 'name':'Sal Maroni', 'alive':false, 'category':'Organized Crime', 'year':1942 }, { 'id':4, 'user_id':1, 'alias':'Catwoman', 'name':'Selina Kyle', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':5, 'user_id':1, 'alias':'Calendar Man', 'name':'Julian Gregory Day', 'alive':true, 'category':'Secondary Rogues', 'year':1958 }, { 'id':6, 'user_id':1, 'alias':'Clayface', 'name':'Basil Karlo', 'alive':false, 'category':'Central Rogues', 'year':1940 }, { 'id':7, 'user_id':1, 'alias':'Deadshot', 'name':'Floyd Lawton', 'alive':true, 'category':'Central Rogues', 'year':1950 }, { 'id':8, 'user_id':1, 'alias':'Deathstroke', 'name':'Slade Wilson', 'alive':false, 'category':'Central Rogues', 'year':1980 }, { 'id':9, 'user_id':1, 'alias':'Firefly', 'name':'Garfield Lynns', 'alive':true, 'category':'Central Rogues', 'year':1952 }, { 'id':10, 'user_id':1, 'alias':'Great White Shark', 'name':'Warren White', 'alive':true, 'category':'Secondary Rogues', 'year':2004 }, { 'id':11, 'user_id':1, 'alias':'Hangman', 'name':'Sofia Gigante', 'alive':false, 'category':'Organized Crime', 'year':1999 }, { 'id':12, 'user_id':1, 'alias':'Harley Quinn', 'name':'Dr. Harleen F. Quinzel', 'alive':true, 'category':'Central Rogues', 'year':1992 }, { 'id':13, 'user_id':1, 'alias':'Holiday', 'name':'Alberto Falcone', 'alive':false, 'category':'Organized Crime', 'year':1996 }, { 'id':14, 'user_id':1, 'alias':'Hugo Strange', 'name':'Professor Hugo Strange', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':15, 'user_id':1, 'alias':'Hush', 'name':'Dr. Thomas Elliot', 'alive':true, 'category':'Central Rogues', 'year':2003 }, { 'id':16, 'user_id':1, 'alias':'The Joker', 'name':'Jack Napier', 'alive':true, 'category':'Central Rogues', 'year':1940 }, { 'id':17, 'user_id':1, 'alias':'Killer Croc', 'name':'Waylon Jones', 'alive':true, 'category':'Central Rogues', 'year':1983 }, { 'id':18, 'user_id':1, 'alias':'Mad Hatter', 'name':'Dr. Jervis Tetch', 'alive':true, 'category':'Central Rogues', 'year':1948 }, { 'id':19, 'user_id':1, 'alias':'Mr. Freeze', 'name':'Dr. Victor Fries', 'alive':true, 'category':'Central Rogues', 'year':1959 }, { 'id':20, 'user_id':1, 'alias':'Onomatopoeia', 'name':'N/A', 'alive':true, 'category':'Recurring Rogues', 'year':2002 }, { 'id':21, 'user_id':1, 'alias':'The Penguin', 'name':'Oswald Chesterfield Cobblepot', 'alive':true, 'category':'Central Rogues', 'year':1941 }, { 'id':22, 'user_id':1, 'alias':'Poison Ivy', 'name':'Dr. Pamela Lillian Isley', 'alive':true, 'category':'Central Rogues', 'year':1966 }, { 'id':23, 'user_id':1, 'alias':'Ra\'s al Ghul', 'name':'Ra\'s al Ghul', 'alive':true, 'category':'League of Assassins', 'year':1971 }, { 'id':24, 'user_id':1, 'alias':'The Red Hood', 'name':'Jason Todd', 'alive':true, 'category':'Central Rogues', 'year':1987 }, { 'id':25, 'user_id':1, 'alias':'The Riddler', 'name':'Edward Nigma/Nashton', 'alive':true, 'category':'Central Rogues', 'year':1948 }, { 'id':26, 'user_id':1, 'alias':'The Roman', 'name':'Carmine Falcone', 'alive':false, 'category':'Organized Crime', 'year':1987 }, { 'id':27, 'user_id':1, 'alias':'Two-Face', 'name':'Harvey Dent', 'alive':true, 'category':'Central Rogues', 'year':1942 }, { 'id':28, 'user_id':1, 'alias':'Man-Bat', 'name':'Dr. Kirk Langstrom', 'alive':true, 'category':'Central Rogues', 'year':1970 }, { 'id':29, 'user_id':1, 'alias':'Maxie Zeus', 'name':'Maximillian Zeus', 'alive':true, 'category':'Secondary Rogues', 'year':1979 }, { 'id':30, 'user_id':1, 'alias':'Mr. Zsasz', 'name':'Victor Zsasz', 'alive':true, 'category':'Central Rogues', 'year':1992 }, { 'id':31, 'user_id':1, 'alias':'Professor Pyg', 'name':'Dr. Lazlo Valentin', 'alive':true, 'category':'Secondary Rogues', 'year':2007 }, { 'id':32, 'user_id':1, 'alias':'Scarecrow', 'name':'Professor Jonathan Crane', 'alive':true, 'category':'Central Rogues', 'year':1941 }, { 'id':33, 'user_id':1, 'alias':'Solomon Grundy', 'name':'Cyrus Gold', 'alive':false, 'category':'Secondary Rogue', 'year':1944 }, { 'id':34, 'user_id':1, 'alias':'Talia al Ghul', 'name':'Talia al Ghul', 'alive':true, 'category':'League of Assassins', 'year':1971 }, { 'alias':'Catman', 'alive':true, 'category':'Secondary Rogue', 'id':36, 'name': 'Thomas Blake', 'user_id': 1, 'year': 1963 }, { 'alias': 'Bane', 'alive': false, 'category': 'Central Rogues', 'id': 1, 'name': 'Antonio Diego', 'user_id': 1, 'year': 1993,
        }
      ];

      const data = await fakeRequest(app)
        .delete('/rogues/35')
        .expect('Content-Type', /json/)
        .expect(200);

      const getData = await fakeRequest(app)
        .get('/rogues')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(getData.body).toEqual(expectation);
    });
  });
});
