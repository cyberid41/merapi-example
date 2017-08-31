# Merapi Express 

## Prerequisite

- nodejs
- typescript `$ npm install -g typescript`

## Install dependencies
- `$ npm install --save merapi-plugin-express`

## Development

- `$ npm install`
- `$ tsc` 
- `$ node start`
- Please open the following link `http://localhost:8080/hello`
    - output must be `unauthorized`
- Please open the following link `http://localhost:8080/hello?role=member`
    - output must be `Hello world`
- Please open the following link `http://localhost:8080/hello/world`
    - output must be `unauthorized`
- Please open the following link `http://localhost:8080/hello?role=admin`
    - output must be 
    ```
    {
        "method": "GET",
        "url": "/hello/world"
    }
    ```

