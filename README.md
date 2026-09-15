## Description

REST API which allows student to rate and consulte places on the campus.

## Project setup

```bash
$ npm install
```

## Configurations: 

.env should follow the example of .env.example
<ul>
  <li>PORT</li>
  <li>DATA_FILE_PATH</li>
</ul>

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Structure of project 
```
energy-api/
├── src/
    place/
    ├── dto/
    └── create-place.dto.ts
├── entities/
    └── place.entity.ts
├── place.controller.ts
├── place.module.ts
└── place.service.ts
    rating/
    ├── dto/
    ├── create-rating.dto.ts
    ├── entities/
    └── rating.entity.ts
├── rating.controller.ts
├── rating.module.ts
└── rating.service.ts
    ├── app.controller.spec.ts
    ├── app.module.ts
    └── main.ts
├── test/
├── configure-swagger.ts
├── .gitignore
├── README.md
├── .env.example
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.build.json
└── tsconfig.json
```
## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

