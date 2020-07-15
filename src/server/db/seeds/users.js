exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return Promise.all([
        knex('users').insert({
          username: 'Reed',
          email: 'reed0schalo@gmail.com'
        }),
        knex('users').insert({
          username: 'Jeff',
          email: 'JeffDummyDunDun@gmail.com'
        })
      ]);
    });
};
