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

## Contract des routes

### Place
Route de Places
<img width="946" height="293" alt="image" src="https://github.com/user-attachments/assets/adf7f328-df5e-4caf-98f2-efd02756f542" />

### Rating 
Route de Ratings
<img width="932" height="260" alt="image" src="https://github.com/user-attachments/assets/c743663d-1082-4c42-b3e9-78afc9cdc4d3" />


## Structure of project 
```
energy-api/
├── src/
    place/
    ├── dto/
    ├── update.place.dto.ts
    └── create.place.dto.ts
├── entities/
    └── place.entity.ts
├── place.controller.ts
├── place.module.ts
└── place.service.ts
    rating/
    ├── dto/
    ├── create.rating.dto.ts
    ├── update.rating.dto.ts
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

