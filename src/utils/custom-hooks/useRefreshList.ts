import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router';

//refreshHistory도 ferchList처럼 page가 1인지 아닌지 따졌어야했다.. api와 refreshList 둘 다 사용할 수 있도록.
export default function useRefreshList<R>(fetchListCallback: () => Promise<R>, to: string, pageUrlKey = 'id'): Promise<R> | void {
  const {push} = useHistory();
  const params = useParams<Record<string, string>>();
  const currentPage = params[pageUrlKey];

  if (!currentPage) {
    console.error('현재 페이지를 가져오는 key가 유효하지않습니다. Route에서 /url/:id의 id부분에 해당하는 key를 패러미터로 넘겨주세요. 그러므로 현재 페이지번호를 1번이라 가정하고 작동됩니다.');
    return fetchListCallback();
  }

  const _currentPage = Number(currentPage);

  if (_currentPage === 1) {
    return fetchListCallback();
  }

  push(to);
}
