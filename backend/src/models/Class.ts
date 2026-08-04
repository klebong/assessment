export interface Class {
  id: number;
  level: string;
  name: string;
  teacherId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateClassDTO {
  level: string;
  name: string;
  teacherEmail: string;
}
