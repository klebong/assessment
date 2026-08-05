# Postgres DB

```sql
CREATE DATABASE education;

CREATE TABLE teachers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_teachers_email UNIQUE (email)
);

CREATE TABLE classes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    level VARCHAR(30) NOT NULL,
    name VARCHAR(50) NOT NULL,
    teacher_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_class_teacher
        FOREIGN KEY (teacher_id)
        REFERENCES teachers(id),
    CONSTRAINT uq_class_teacher UNIQUE (teacher_id),
    CONSTRAINT uq_class_level_name UNIQUE (level, name)
);
```

## Assumptions

- Teacher email is unique since it is used to identify the form teacher when creating a class
- A teacher can only be a form teacher for one class
- A class has exactly one form teacher
- Class level + names are unique

## How to Run Locally

Run the following command in the directory where `docker-compose.yml` is located:

```bash
docker compose up -d
```

**Note:** The PostgreSQL database is automatically pre-seeded with the `teachers` and `classes` tables on first startup.

## Port

- Frontend: localhost:4173
- Backend: localhost:3000
