create table "loans_types" (
  id serial primary key,
  name varchar(100) not null
);
create table loans (
  id serial primary key,
  type_id serial references "loans_types" (id),
  name varchar(100) not null,
  max_length integer not null,
  min_length integer not null,
  max_amount integer not null,
  min_amount integer not null,
  rate NUMERIC(7, 4) not null,
  recuired_scoring NUMERIC(5, 2) not null
);

insert into "loans_types" values (1, 'housing');
insert into loans values (1, 1, 'dream house', 480, 36, 10000000, 100000, 0.035, 60);
