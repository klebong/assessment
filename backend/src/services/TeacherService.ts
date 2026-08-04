import { pool, query } from '../database';
import { Teacher, CreateTeacherDTO } from '../models';

export class TeacherService {
  async createTeacher(data: CreateTeacherDTO): Promise<Teacher> {
    const { name, subject, email, contactNumber } = data;

    const result = await query(
      `INSERT INTO teachers (name, subject_name, email, contact_number) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, subject, email, contactNumber]
    );

    return result.rows[0];
  }

  async findAll(): Promise<Array<{ id: number; name: string; subject: string; email: string; contactNumber: string }>> {
    const result = await query('SELECT id, name, subject_name as "subject", email, contact_number as "contactNumber" FROM teachers ORDER BY id');
    return result.rows;
  }

  async findById(id: number): Promise<Teacher | null> {
    const result = await query('SELECT * FROM teachers WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    const result = await query('SELECT * FROM teachers WHERE email = $1', [email]);
    return result.rows[0] || null;
  }
}
