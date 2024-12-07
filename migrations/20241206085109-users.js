const bcrypt = require('bcrypt');

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection("users").insertOne(
      {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(10)),
        created_at: new Date(),
        updated_at: new Date()
      }
    );
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    await db.collection('users').drop();
  }
};
