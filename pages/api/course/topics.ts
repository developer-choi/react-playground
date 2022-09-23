import type {NextApiRequest, NextApiResponse} from 'next';
import type {CourseTopicsResponse} from '@type/response/course';
import type {Topic} from '@type/response-sub/course-sub';

export default function topics(req: NextApiRequest, res: NextApiResponse) {
  res.json(DUMMY_TOPICS);
}

export const DUMMY_TOPIC_MATH: Topic = {
  pk: 1,
  name: '수학'
};

export const DUMMY_TOPIC_ENGLISH: Topic = {
  pk: 2,
  name: '영어'
};

export const DUMMY_TOPIC_KOREAN: Topic = {
  pk: 3,
  name: '국어'
};

export const DUMMY_TOPICS: CourseTopicsResponse = {
  list: [DUMMY_TOPIC_MATH, DUMMY_TOPIC_ENGLISH, DUMMY_TOPIC_KOREAN]
};
