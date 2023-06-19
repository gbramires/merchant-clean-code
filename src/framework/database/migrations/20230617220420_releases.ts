import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('releases', (table) => {
    table.uuid('_id').primary()
    table.float('amount').notNullable()
    table.string('releaseName').notNullable()
    table.string('type').notNullable()
    table.dateTime('createdAt').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('releases')
}
