import {PageServerComponentProps} from '@/types/declaration/next';
import {handleServerSideError, validateViewPageIdParams} from '@/utils/service/error/server';
import {FetchError} from '@/utils/service/error';

// URL: http://localhost:3000/solution/view/1 > 1번 게시글 페이지로 나옴.
// URL: http://localhost:3000/solution/view/a > a번 게시글 페이지는 없으니까 상세데이터 API도 호출도 하지않고 바로 404 페이지 표시됨
// URL: http://localhost:3000/solution/view/9999 > 9999번 게시글 페이지는 있을 수도 있어서 상세데이터 API도 호출은 해봤는데 404 응답되서 404 페이지 표시됨
export default async function Page({params}: PageServerComponentProps) {
  const id = validateViewPageIdParams(params.id);

  try {
    const {title} = await getBoardViewApi(id);

    return (
      <div>{title}</div>
    );
  } catch (error) {
    return handleServerSideError(error);
  }
}

async function getBoardViewApi(id: number) {
  if (id < 999) {
    return {
      title: `${id}번 게시글`
    };
  } else {
    throw new FetchError({} as any, {
      original: {} as any,
      data: {},
      status: 404,
      url: '게시글상세API'
    }, undefined);
  }
}
