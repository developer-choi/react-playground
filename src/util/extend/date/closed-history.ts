import {getDiffBetweenDate} from '@util/extend/date/date-util';
import {LocalStorageArrayManager} from '@util/extend/browser/local-storage-array';
import moment from 'moment';
import {findItem} from '@util/extend/data-type/array';

export interface ClosedHistoryParam<T extends string | number> {
  pkList: T[]; //여러개의 n일간 안보기 팝업목록중에, 하나를 골라서 띄우고싶기 위해서.

  //다시 뜨기 위한 계산방법, 이 기간값보다 차이가 작아야 팝업이 뜸.
  closePeriod: MatchPeriod;

  //기록을 삭제하기위한 계산방법, 이 기간값보다 차이가 크면 기록에서 삭제함.
  clearPeriod?: MatchPeriod;
}

type ConditionalPkResult<T extends string | number> = T extends number ? number | undefined : string | undefined;

export class ClosedHistoryManager {
  uniquePrefix: string; //여러 종류의 n일간 안보기팝업을 구분할 수 있는 유니크한 이름

  constructor(uniquePrefix = "") {
    this.uniquePrefix = uniquePrefix;
  }

  /**
   * @param 여러개의 n일간 안보기 팝업목록
   * @return 그중에 띄워야하는 팝업의 PK
   */
  getActiveInClosedHistory<T extends string | number>({pkList, closePeriod, clearPeriod}: ClosedHistoryParam<T>): ConditionalPkResult<T> {
    const pkListToClosedHistoryKey = pkList.map(pk => this.makeClosedHistoryKey(pk));

    const historyList = manager.getParsedData();

    if (clearPeriod) {
      const resultList = historyList.filter((history) => {
        if (!pkListToClosedHistoryKey.find((param) => history.uniqueKeyInStorage === param.uniqueKeyInStorage)) {
          return true;
        }

        const diffValue = getDiffPeriod(new Date(), history.closedTimestamp, clearPeriod.diffType);
        return diffValue <= clearPeriod.value;
      });

      manager.setStringifyItem(resultList);
    }

    return findItem(pkListToClosedHistoryKey, ({uniqueKeyInStorage, originalPk}) => {
      const findHistory = historyList.find(history => history.uniqueKeyInStorage === uniqueKeyInStorage);

      if (!findHistory) {
        return originalPk;
      }

      const diffValue = getDiffPeriod(new Date(), findHistory.closedTimestamp, closePeriod.diffType);
      const validated = diffValue >= closePeriod.value;

      if (!validated) {
        return false;
      }

      return originalPk;
    }) as ConditionalPkResult<T>;
  }

  closeDuringSpecificPeriod(pk: string | number) {
    this.addManuallyClosedHistory(pk, new Date().getTime());
  }

  addManuallyClosedHistory(pk: string | number, timestamp: number) {
    const {originalPk, uniqueKeyInStorage} = this.makeClosedHistoryKey(pk);

    manager.appendFirst({
      uniqueKeyInStorage: uniqueKeyInStorage,
      originalPk,
      closedTimestamp: timestamp,
      closedDateFormat: moment(timestamp).format('YYYY.MM.DD HH:mm:ss')
    });
  }

  private makeClosedHistoryKey(pk: string | number): ClosedHistoryKey {
    return {
      //originalPk자체가 다른 n일동안 안보기 팝업의 PK와 구분될 수 있는 string값이라면, pkInlocalStorage값도 동일하게 설정
      uniqueKeyInStorage: !this.uniquePrefix ? pk.toString() : `${this.uniquePrefix}-${pk}`,
      originalPk: pk
    };
  }
}

export function forceClearClosedHistory() {
  manager.setStringifyItem([]);
}

interface ClosedHistoryKey {
  /**
   * @example
   * main-event-banner-${bannerPk} //동적인 경우
   * event-induction //정적인 경우
   * 로컬스토리지 안에서, 다른 유형의 n일간 보지않기 팝업을 구분할 수 있는값
   */
  uniqueKeyInStorage: string;
  originalPk: number | string; //n일간 보지않기 팝업 원본데이터의 PK
}

interface ClosedHistory extends ClosedHistoryKey {
  //닫았을 때 timestamp
  closedTimestamp: number;
  closedDateFormat: string;
}

interface MatchPeriod {
  diffType: 'date' | 'hour';
  value: number;
}

//띄울 시간이 지났는지 체크 (닫았을 때 기준으로 지정한 값만큼 시간이 지났는지)
function getDiffPeriod(targetDate: Date, closedTimestamp: number, diffType: MatchPeriod['diffType']) {
  if (diffType === 'hour') {
    return (targetDate.getTime() - closedTimestamp) / 1000 / 3600;

  } else {
    return getDiffBetweenDate(targetDate, new Date(closedTimestamp));
  }
}

const manager = new LocalStorageArrayManager({
  key: 'closed-history-in-specific-period',
  enableDuplicated: false, //같은 PK면 닫은기록에는 하나만 생성되야함.
  pkExtractor: (value: ClosedHistory) => value.uniqueKeyInStorage
});
