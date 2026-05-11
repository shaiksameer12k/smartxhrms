-- pre onboarding

-- trigger pre-onboarding
create table trigger_pre_boarding (
trigger_id int generated always as identity primary key,
firstname varchar(100) not null,
middlename varchar(100),
lastname varchar(100) not null,
dob varchar(10) not null,
email varchar(100) not null,
mobileno varchar(12) not null,
created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)


-- post trigger function
create or replace function trigger_pre_onboarding(p_firstname text,
p_middlename text,
p_lastname text,
p_dob text,
p_email text,
p_mobileno text)
returns void
language plpgsql
as $$
begin
	insert into trigger_pre_boarding (firstname,
	middlename,
	lastname,
	dob,
	email,
	mobileno) values (p_firstname,
					p_middlename,
					p_lastname,
					p_dob,
					p_email,
					p_mobileno);
end;
$$

-- delete trigger function
select get_pre_onboardinglist()
select trigger_pre_onboarding('ananth','','k s','14-04-1997','ananth@ksgmail.com','910014234')

truncate table trigger_pre_boarding
select * from trigger_pre_boarding