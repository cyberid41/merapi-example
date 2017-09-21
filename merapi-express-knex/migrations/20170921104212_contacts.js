
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable("contacts", function (table) {
            table.uuid("id").notNullable().primary();
            table.string("name").notNullable();
            table.string("address").notNullable();
            table.string("phone").notNullable();
            table.string("email").notNullable();
            table.timestamps(true, true);
        })
    ]);
};

exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists("contacts")
    ]);
};
