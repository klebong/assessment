export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTeacherDTO {
  name: string;
  subject: string;
  email: string;
  contactNumber: string;
}
