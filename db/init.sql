CREATE TYPE GENDER AS ENUM('male', 'female');

CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    gender GENDER NOT NULL,
    has_latin_courses boolean NOT NULL,
    has_maths_courses boolean NOT NULL,
    has_economics_courses boolean NOT NULL
);

CREATE TABLE "group" (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL UNIQUE,
    creation_date DATE NOT NULL,
    is_active boolean NOT NULL DEFAULT True
);

CREATE TABLE student_group (
    id SERIAL PRIMARY KEY,
    group_id integer NOT NULL,
    student_id integer NOT NULL,
    CONSTRAINT unique_student_group_group_id_student_id UNIQUE (group_id, student_id),
    FOREIGN KEY (group_id) REFERENCES "group"(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE
);

INSERT INTO student (id, first_name, last_name, email, birthdate, gender, has_latin_courses, has_maths_courses, has_economics_courses) VALUES
(1, 'Alice', 'Dupond', 'ad@yopmail.com', '1990-01-01', 'female', False, False, False),
(2, 'Bob', 'Morane', 'bm@yopmail.com', '1993-06-30', 'male', True, True, True),
(3, 'Claire', 'Chazale', 'cc@yopmail.com', '1992-01-15', 'female', True, False, False),
(4, 'Daniel', 'Jackson', 'dj@yopmail.com', '1980-01-15', 'male', False, True, False),
(5, 'Emile', 'Gravier', 'eg@yopmail.com', '1985-03-15', 'male', False, False, True);

INSERT INTO "group" (id, name, creation_date, is_active) VALUES
(1, 'Group 1', '2022-08-05', True),
(2, 'Group 2', '2022-01-01', False);

INSERT INTO student_group (id, group_id, student_id) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 1, 4);