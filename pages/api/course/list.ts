import type {CourseListResponse} from '@type/response/course';
import type {NextApiRequest, NextApiResponse} from 'next';
import type {Course, CourseOrderby, Teacher} from '@type/response-sub/course-sub';
import {COURSE_LIST_ARTICLE_PER_VIEW} from '@util/services/course';
import {sortByString} from '@util/extend/array';
import {range} from '@util/extend/number';
import {getDiffDate} from '@util/extend/date/date-util';
import type {CourseFilter} from '@api/CourseApi';
import {DUMMY_ROOMS} from '@pages/api/course/rooms';
import {randomNumber} from '@util/extend/random';
import {DUMMY_TOPIC_ENGLISH, DUMMY_TOPIC_KOREAN, DUMMY_TOPIC_MATH} from '@pages/api/course/topics';
import type {Direction, Sort} from '@util/custom-hooks/useSortButton';

export default async function list(req: NextApiRequest, res: NextApiResponse) {
  const {page, topic, room, orderby, direction} = req.query;
  const config = {
    page: Number(page),
    topic: !topic ? undefined : Number(topic),
    room: !room ? undefined : Number(room),
    orderby: orderby as CourseOrderby | undefined,
    direction: direction as Direction | undefined
  };

  const list = filterOrSortOrPagingList(serverCourseList.list, config);
  const response: CourseListResponse = {
    list,
    total: list.length
  };
  res.json(response);
}

const DUMMY_TEACHERS: Teacher[] = [
  {
    pk: 1,
    name: '정승제',
    topic: DUMMY_TOPIC_MATH
  },
  {
    pk: 2,
    name: '최원규',
    topic: DUMMY_TOPIC_ENGLISH
  },
  {
    pk: 3,
    name: '김나영',
    topic: DUMMY_TOPIC_KOREAN
  }
];

const DUMMY_COURSE_LIST: Course[] = range(1, 100).map(value => {
  const teacher = DUMMY_TEACHERS[randomNumber(0, DUMMY_TEACHERS.length - 1)];
  const room = DUMMY_ROOMS.list[randomNumber(0, DUMMY_ROOMS.list.length - 1)];
  return {
    pk: value,
    title: `${teacher.name} 강의 #${value}`,
    teacher,
    topic: teacher.topic,
    room,
    startTimestamp: getDiffDate(new Date(), [0, 0, value]).getTime(),
  }
});

let serverCourseList: CourseListResponse = {
  list: DUMMY_COURSE_LIST,
  total: DUMMY_COURSE_LIST.length
};

interface FilterOrSortOrPagingListConfig extends Partial<Sort<CourseOrderby>>, Partial<CourseFilter> {
  page: number;
}

function filterOrSortOrPagingList(list: Course[], {page, room, topic, orderby, direction}: FilterOrSortOrPagingListConfig) {
  const enableSort = [orderby, direction].every(value => value);
  const enableFilter = [room, topic].some(value => value);
  const filterResult = !enableFilter ? list : filterCourseList(list, {topic, room});

  return courseListPaging(filterResult, {
    sort: !enableSort ? undefined : {orderby, direction} as Sort<CourseOrderby>,
    page,
    articlePerPage: COURSE_LIST_ARTICLE_PER_VIEW
  });
}

function filterCourseList(list: Course[], filter: Partial<CourseFilter>): Course[] {
  return list.filter(({topic, room}) => {
    const isMatchTopic = filter.topic === undefined || filter.topic === topic.pk;
    const isMatchRoom = filter.room === undefined || filter.room === room.pk;
    return isMatchTopic && isMatchRoom;
  });
}

interface SlicePagingConfig {
  page: number;
  articlePerPage: number;
  sort?: Sort<CourseOrderby>;
}

function courseListPaging(list: Course[], {page, articlePerPage, sort}: SlicePagingConfig): Course[] {
  if (!sort) {
    return list.slice((page - 1) * articlePerPage, page * articlePerPage);
  }

  switch (sort.orderby) {
    case 'topic': {
      const result = sortByString(sort.direction, list, course => course.topic.name);
      return courseListPaging(result, {page, articlePerPage});
    }

    case 'room': {
      const result = sortByString(sort.direction, list, course => course.teacher.name);
      return courseListPaging(result, {page, articlePerPage});
    }
  }
}
