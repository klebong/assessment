import { Request, Response, NextFunction } from 'express';
import { TeacherService } from '../services/TeacherService';
import { CreateTeacherDTO } from '../models';

export class TeacherController {
  private teacherService: TeacherService;

  constructor(teacherService: TeacherService) {
    this.teacherService = teacherService;
  }

  getAllTeachers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teachers = await this.teacherService.findAll();
      res.status(200).json({ data: teachers });
    } catch (error) {
      next(error);
    }
  };

  createTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const teacherData: CreateTeacherDTO = req.body;

      if (!this.validateTeacherData(teacherData)) {
        res.status(400).json({ 
          error: 'Missing required fields: name, subject, email, or contactNumber' 
        });
        return;
      }

      const existingTeacher = await this.teacherService.findByEmail(teacherData.email);
      if (existingTeacher) {
        res.status(409).json({ 
          error: 'Teacher with this email already exists' 
        });
        return;
      }

      const newTeacher = await this.teacherService.createTeacher(teacherData);
      res.status(201).json(newTeacher);
    } catch (error) {
      next(error);
    }
  };

  private validateTeacherData(data: CreateTeacherDTO): boolean {
    return (
      typeof data.name === 'string' &&
      data.name.trim() !== '' &&
      typeof data.subject === 'string' &&
      data.subject.trim() !== '' &&
      typeof data.email === 'string' &&
      data.email.trim() !== '' &&
      typeof data.contactNumber === 'string' &&
      data.contactNumber.trim() !== ''
    );
  }
}
