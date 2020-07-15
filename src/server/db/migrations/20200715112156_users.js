exports.up = (knex) => {
  return Promise.all(
    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('username').unique().notNullable();
      table.string('email').unique().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  );
};

exports.down = (knex) => {
  return Promise.all(knex.schema.dropTable('users'));
};
