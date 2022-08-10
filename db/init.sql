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

INSERT INTO student (first_name, last_name, email, birthdate, gender, has_latin_courses, has_maths_courses, has_economics_courses) VALUES
('Alice', 'Dupond', 'ad@yopmail.com', '1990-01-01', 'female', False, False, False),
('Bob', 'Morane', 'bm@yopmail.com', '1993-06-30', 'male', True, True, True),
('Claire', 'Chazale', 'cc@yopmail.com', '1992-01-15', 'female', True, False, False),
('Daniel', 'Jackson', 'dj@yopmail.com', '1980-01-15', 'male', False, True, False),
('Emile', 'Gravier', 'eg@yopmail.com', '1985-03-15', 'male', False, False, True),
('Fred', 'I', 'fi@yopmail.com', '1990-01-01', 'male', True, False, False),
('Gaston', 'L', 'gl@yopmail.com', '1990-01-02', 'male', True, False, False),
('Hortense', 'Z', 'hz@yopmail.com', '1990-01-03', 'female', True, False, False),
('Irène', 'N', 'in@yopmail.com', '1990-01-04', 'female', True, False, False),
( 'Justine', 'M', 'jm@yopmail.com', '1990-01-05', 'female', True, False, False),
( 'K', 'Z', 'kz@yopmail.com', '1990-01-06', 'female', True, False, False),
( 'Lucien', 'O', 'lo@yopmail.com', '1990-01-07', 'male', True, False, False),
( 'Marc', 'N', 'mn@yopmail.com', '1990-01-07', 'male', True, False, False);

INSERT INTO "group" (name, creation_date, is_active) VALUES
('Group 1', '2022-08-05', True),
('Group 2', '2021-01-01', False);

-- NB: we assume ids were created in order here
INSERT INTO student_group (group_id, student_id) VALUES
(1, 1),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(2, 9),
(2, 10),
(2, 11);
