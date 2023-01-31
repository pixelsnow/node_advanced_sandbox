# REST

mozilla developer http
https://developer.mozilla.org/en-US/docs/Web/HTTP

http methods
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

http status
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Methods

- GET
- POST
- PUT
- DELETE

## Resource

### For example all computers:

```
http://localhost:4000/api/computers
```

The GET request would be:

GET http://localhost:4000/api/computers HTTP/1.1

### GET

GET /api/computers

returns all computers as a json (or some other format) array

### Computer number 2:

```
http://localhost:4000/api/computers/2
```

GET /api/computers/2

return the computer with id 2

```json
{
  "id": 1,
  "name": "Beast II",
  "type": "server",
  "processor": "Selenium III",
  "amount": 100
}
```

### POST

Add a new computer

POST /api/computer

```json
{
  "id": 3,
  "name": "BMI I",
  "type": "server",
  "processor": "Selenium III",
  "amount": 25
}
```

computer is giver as json object. Returns a status code

### PUT

update or add

PUT /api/computers/3

computer is given as json object. Returns a status object.

If the computer with give number doesn't exist, it will be added.

If the computer exists, it will be updated.

The id must match the number given in URL.

### DELETE

remove computer

DELETE /api/computers/2

deleted computer number 2 and returns a status object

# javascript (fetch)

Let's assume `cors` situation:

### GET

```js
const option = {
  method: "GET",
  mode: "cors",
};

const allComputers = "http://localhost:4000/api/computers";
const oneComputer = "http://localhost:4000/api/computers/2";
const data = await fetch(oneComputer, options);
const result = await data.json();

const data2 = await fetch(allComputers, { mode: "cors" }); // GET is default
const result = await data2.json();
```

### POST

```js
const computerObject = {
  id: 1,
  name: "Beast II",
  type: "server",
  processor: "Selenium III",
  amount: 100,
};

const option = {
  method: "POST",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(computerObject),
};

const postComputers = "http://localhost:4000/api/computers";
const data = await fetch(postComputers, options);
const result = await data.json();
```

### PUT

```js
const putOption = {
  method: "PUT",
  mode: "cors",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(computerObject),
};

const putComputer = "http://localhost:4000/api/computers/2";
const data = await fetch(putComputer, putOptions);
const result = await data.json();
```

### DELETE

```js
const option = {
  method: "DELETE",
  mode: "cors",
};

const oneComputer = "http://localhost:4000/api/computers/2";
const data = await fetch(oneComputer, options);
const result = await data.json();
```
