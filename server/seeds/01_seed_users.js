/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {FirstName: 'Visitor', LastName: '', Username: 'visitor', Password: ''},
    {FirstName: 'Erik', LastName: 'Voss', Username: 'Chaos', Password: 'zprefixrocks'},
    {FirstName: 'James', LastName: 'Kelley', Username: 'jkelley', Password: 'lovethebeard'},
    {FirstName: 'Matthew', LastName: 'Wegenke', Username: 'mwegenke', Password: 'fearthisbeard'},
    {FirstName: 'Jeff', LastName: 'Haddock', Username: 'jhaddock', Password: 'coolhatman'},
  ]);
};
