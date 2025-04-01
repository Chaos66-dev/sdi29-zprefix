/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', (table) => {
        table.increments('id')
        table.integer('UserId')
        table.foreign('UserId').references('users.id').onDelete('CASCADE')
        table.string('ItemName', 200)
        table.string('Description', 500)
        table.integer('Quantity')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('items')
};
