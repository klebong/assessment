import { query } from '../database';
import { Class, CreateClassDTO } from '../models/Class';

export class ClassService {
  async createClass(data: CreateClassDTO): Promise<Class> {
    const { level, name, teacherEmail } = data;

    const teacher = await query(
      'SELECT * FROM teachers WHERE email = $1', [teacherEmail]
    );

    const result = await query(
      `INSERT INTO classes (level, name, teacher_id) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [level, name, teacher.rows[0].id]
    );

    return result.rows[0];
  }

  async findByTeacherId(teacherEmail: string): Promise<Class | null> {
    const teacher = await query(
      'SELECT * FROM teachers WHERE email = $1', [teacherEmail]
    );

    const result = await query('SELECT * FROM classes WHERE teacher_id = $1', [teacher.rows[0].id]);
    return result.rows[0] || null;
  }

  async findAll(): Promise<Array<{ id: number; level: string; name: string; formTeacher: { name: string } }>> {
    const result = await query(
      `SELECT c.id, c.level, c.name, t.name as "teacherName"
       FROM classes c
       LEFT JOIN teachers t ON c.teacher_id = t.id
       ORDER BY c.id`
    );
    
    return result.rows.map((row) => ({
      id: row.id,
      level: row.level,
      name: row.name,
      formTeacher: {
        name: row.teacherName || null
      }
    }));
  }

  async findById(id: number): Promise<Class | null> {
    const result = await query('SELECT * FROM classes WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}
