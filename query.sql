create table users(
	id_user serial primary key,
	name varchar(100) not null,
	username varchar(50) not null,
	password varchar(50) not null,
	email varchar(50) not null,
    updated_by smallint not null,
	created_by smallint not null,
    created_date timestamp not null,
	is_deleted numeric(1,0) not null
);

create table events(
	id_event serial primary key,
	name varchar(100) not null,
	location varchar(100) not null,
	start_date timestamp not null,
	end_date timestamp not null,
	price numeric(16,2),
	path_image varchar(50),
	updated_by smallint not null,
	created_by smallint not null,
    created_date timestamp not null,
	is_deleted numeric(1,0) not null
);