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
