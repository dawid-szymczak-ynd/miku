create table users (
  id serial primary key,
  name varchar(100) not null,
  email varchar(100) not null UNIQUE,
  scoring NUMERIC(5, 2) not null
);
