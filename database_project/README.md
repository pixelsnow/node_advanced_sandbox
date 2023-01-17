# Database

This database class if a general purpose class for creating and using MariaDB / MySQL queries. The constructor takes all necessary information needed to open a database connection as parameter object. This layer is used between the datadabe engine and our application.

Here is an example of the option object for constructor:

```js
{
    host: "127.0.0.1",
    port: 3306,
    user: "zeke",
    password: "1234",
    database: "employeeDB"
}
```

## Method **doQuery(sql, parameters)**

### Method usage

```js
const result = await db.doQuery("select * from employee");
```

```js
const result = await db.doQuery("select * from employee where id=?", [1]);
```

Select queries will result a Javascript object:

```js
{
  queryResult: [
    {
      id: 1,
      firstname: "Matt",
      lastname: "River",
      department: "ICT",
      salary: "5000.00",
    },
  ],
  resultSet: true
}
```

For example an insert statement will return an object:

```js
const result = await db.doQuery("insert into employee values(?,?,?,?,?)", [
  123,
  "Vera",
  "River",
  "ICT",
  6000,
]);
```

The statement to be sent to database engine will be:

insert into employee values(123, "Vera", "River", "ICT", 6000);

will return an object:

```js
{
    queryResult: { rowsChanged: 1, insertId: 0, status:0 },
    resultSet: false
}
```
