# Merapi Express 

## Prerequisite

- nodejs
- typescript `$ npm install -g typescript`
- knex `$ npm install -g knex`
- mysql

## Install dependencies
- `$ npm install --save merapi-plugin-express`

## Development

- install deps `$ npm install`
- running using npm command `$ npm run build && npm start` 
- running using typescript command `$ tsc && node start` 

## DB config

please edit the following lines in `service.yml`

```
...
stores:
    knex:
        client: mysql
        connection:
            host: host
            user: user
            password: password
            port: 3306
            database: db_name
            db: db_name
            encrypt: true
        pool:
            min: '2'
            max: '10'
        migrations:
            tableName: migrations
...
```

## create new migration

- `$ knex migrate:make migration_name`

## migrations table

- `$ knex migrate:latest`

## Actions Handled By routes

| Verb          | Uri           |      |    Action     |
| ------------- |:--------------------:|:-------------:|
| GET           | `/contacts`          |    list       |
| POST          | `/contacts`          |    store      |
| GET           | `/contacts/{contact}`|    show       |
| PUT           | `/contacts/{contact}`|    update     |
| DELETE        | `/contacts/{contact}`|    destroy    |
