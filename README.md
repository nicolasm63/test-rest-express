# REST API Example

This example of a **REST API with TypeScript** using express and Sequelize on postgresql DB was widely inspired from the example https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express.

## Getting started

### 1. Requirements

- Node (tested with v18.7.0)
- Docker Compose (tested with v2.2.3)

### 2. Install

Start by cloning this repo.

You can then install npm dependencies:

```
cd test-rest-express
npm install
```

### 3. Run the app

The DB runs in a docker container, start it:

```
docker-compose up
```

You may now start the api:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can check it by accessing [`http://localhost:3000/status`](http://localhost:3000/status).

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/students`: Fetch all students
  - Query Parameters
    - `gender` (optional): Filters by gender (`male` or `female`)
    - `bornBefore` (optional): Filters students born before a given date (ex: `1990-06-01`)
    - `bornAfter` (optional): Filters students born after a given date (ex: `1990-06-01`)
    - `hasLatinCourses` (optional): Filters students depending on if they have latin courses (`true` or `false`)
    - `hasMathsCourses` (optional): Filters students depending on if they have maths courses (`true` or `false`)
    - `hasEconomicsCourses` (optional): Filters students depending on if they have economics courses (`true` or `false`)
    - `search` (optional): Search on students' `firstName`, `lastName` and `email`

### `POST`

- `/groups`: Create a new group
  - Body:
    - `name: String` (required): The unique name of the group
    - `creationDate: Date` (required): The creation date of the group (ex: `2022-06-01`)
    - `studentIds: number[]` (required): The members of the group. Note that a group can have between 3 and 10 members, and there can be at most two different courses selected among the members.
    - `isActive: Boolean` (optional): Whether the group is active

### `PUT`

- `/groups/:id`: Update the members of a group
  - Body:
    - `studentIds: number[]` (required): The members of the group, that will replace the existing one. Note that a group can have between 3 and 10 members, and there can be at most two different courses selected among the members.

### `DELETE`

- `/groups/:id`: Delete a group by its `id`
