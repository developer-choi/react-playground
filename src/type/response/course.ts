import type {Course, Room, Topic} from '@type/response-sub/course-sub';

// GET /course/list
export interface CourseListResponse {
  list: Course[];
  total: number;
}

// GET /course/topics
export interface CourseTopicsResponse {
  list: Topic[];
}

// GET / course/rooms
export interface CourseRoomsResponse {
  list: Room[];
}
