export interface FormTeacher {
  name: string
}

export interface Class {
  level: string
  name: string
  formTeacher: FormTeacher
}

export interface ClassesResponse {
  data: Class[]
}

export interface Teacher {
  id: number
  name: string
  subject: string
  email: string
  contactNumber: string
}

export interface TeachersResponse {
  data: Teacher[]
}
