export interface Course {
  pk: number;
  title: string;
  topic: Topic;
  teacher: Teacher;
  room: Room;
  startTimestamp: number;
}

export interface Topic {
  pk: number;
  name: string;
}

export interface Teacher {
  pk: number;
  name: string;
  topic: Topic;
}

export interface Room {
  pk: number;
  name: string;
}

export type CourseSortType = 'room-asc' | 'room-desc' | 'start-asc' | 'start-desc';
