/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {UserId: 2, ItemName: 'MacBook Pro', Description: 'The current laptop I am working on.', Quantity: 1},
    {UserId: 3, ItemName: 'Bottled Water', Description: 'Used to hydrate the throat and vocal chords after a long lecture and many questions.', Quantity: 400},
    {UserId: 4, ItemName: 'USAA Backpack', Description: 'Some leftover relic of the past. Its existence is questioned, however it tells the tales of its former life.', Quantity: 3},
    {UserId: 5, ItemName: 'Screen Recording Software Licenses', Description: 'Used quite adeptly to demonstrate basic concepts to a bunch of meddling kids.', Quantity: 25}
  ]);
};
