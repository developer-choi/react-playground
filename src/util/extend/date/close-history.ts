import {useCallback, useMemo} from 'react';
import {getDiffBetweenDate} from '@util/extend/date/date-util';
import {LocalStorageArrayManager} from '@util/extend/browser/local-storage-array';
import moment from 'moment';

export interface CloseHistoryParam {
  pkList: string[]; //굉장히 여러개의 n일간 안보기 팝업목록중에, 하나를 골라서 띄우고싶기 위해서.

  //다시 뜨기 위한 계산방법
  closePeriod: MatchPeriod;

  //기록을 삭제하기위한 계산방법
  clearPeriod?: MatchPeriod;
}

/**
 * @param 여러개의 n일간 안보기 팝업목록
 * @return 그중에 띄워야하는 팝업의 PK
 */
export function useCloseHistory({pkList, closePeriod, clearPeriod}: CloseHistoryParam) {
  const target = useMemo(() => {
    const historyList = manager.parseItem();

    return pkList.find(pk => {
      const findHistory = historyList.find(history => history.pk === pk);

      if (!findHistory) {
        return true;
      }

      return isAfterPeriod(new Date(), findHistory.closedTimestamp, closePeriod);
    });
  }, [closePeriod, pkList]);

  const closeDuringSpecificPeriod = useCallback(() => {
    if (!target) {
      throw new Error('이 팝업은 처음부터 뜰 수 없었던 팝업이기때문에, 닫는 로직이 실행되는것 자체가 문제임.');
    }

    const current = new Date();

    forceAddCloseHistory(target, current.getTime());

    if (!clearPeriod) {
      return;
    }

    const resultList = manager.parseItem().filter(({closedTimestamp}) => isAfterPeriod(current, closedTimestamp, clearPeriod));

    manager.setStringifyItem(resultList);
  }, [clearPeriod, target]);

  return {
    target,
    closeDuringSpecificPeriod,
  };
}

//테스트용으로 강제로 과거히스토리 만들고싶을 때 사용
export function forceAddCloseHistory(pk: string, timestamp: number) {
  manager.appendFirst({
    pk,
    closedTimestamp: timestamp,
    closedDateFormat: moment(timestamp).format('YYYY.MM.DD HH:mm:ss')
  });
}

export function forceClearAddCloseHistory() {
  manager.setStringifyItem([]);
}

interface CloseHistory {
  /**
   * @example
   * main-event-banner-${bannerPk} //동적인 경우
   * event-induction //정적인 경우
   */
  pk: string;

  //닫았을 때 timestamp
  closedTimestamp: number;
  closedDateFormat: string;
}

interface MatchPeriod {
  diffType: 'date' | 'hour';
  value: number;
}

//띄울 시간이 지났는지 체크 (닫았을 때 기준으로 지정한 값만큼 시간이 지났는지)
function isAfterPeriod(targetDate: Date, closedTimestamp: number, {value, diffType}: MatchPeriod) {
  const diffValue = diffType === 'hour' ?
    (targetDate.getTime() - closedTimestamp) / 1000 / 3600
    :
    getDiffBetweenDate(targetDate, new Date(closedTimestamp));

  console.log(diffValue);

  return diffValue >= value;
}

const manager = new LocalStorageArrayManager({
  key: 'close-during-specific-period',
  enableDuplicated: false, //같은 PK면 닫은기록에는 하나만 생성되야함.
  pkExtractor: (value: CloseHistory) => value.pk
});
