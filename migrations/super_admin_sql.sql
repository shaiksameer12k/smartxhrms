create table admins(
 user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 user_name varchar(100) NOT NULL,
 user_email varchar(100) NOT NULL,
 created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)


CREATE OR REPLACE FUNCTION CreateNewAdmin(
  p_user_name  TEXT,
  p_user_email TEXT
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN

  -- 1. Null / empty checks
  IF p_user_name IS NULL OR TRIM(p_user_name) = '' THEN
    RAISE EXCEPTION 'user_name cannot be empty';
  END IF;

  IF p_user_email IS NULL OR TRIM(p_user_email) = '' THEN
    RAISE EXCEPTION 'user_email cannot be empty';
  END IF;

  -- 2. Basic email format check
  IF p_user_email NOT LIKE '%_@_%.__%' THEN
    RAISE EXCEPTION 'Invalid email format: %', p_user_email;
  END IF;

  -- 3. Duplicate email check
  IF EXISTS (
    SELECT 1 FROM admins WHERE user_email = LOWER(TRIM(p_user_email))
  ) THEN
    RAISE EXCEPTION 'Email already exists: %', p_user_email;
  END IF;

  -- 4. Insert with cleaned values
  INSERT INTO admins (user_name, user_email)
  VALUES (
    TRIM(p_user_name),
    LOWER(TRIM(p_user_email))
  );

  RAISE NOTICE 'Admin created successfully: %', p_user_name;

END;
$$;


CREATE OR REPLACE FUNCTION deleteAdminUser(
    p_user_id INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'user_id is missing';
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM admins
        WHERE user_id = p_user_id
    ) THEN
        RAISE EXCEPTION 'Invalid user_id';
    END IF;

    DELETE FROM admins
    WHERE user_id = p_user_id;

END;
$$;



