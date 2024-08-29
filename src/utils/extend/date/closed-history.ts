import dayjs from 'dayjs';
import {getDiffBetweenDate} from '@/utils/extend/date/util';
import {LocalStorageArrayManager} from '@/utils/extend/browser/local-storage-array';
import {LoopCallback} from '@/utils/extend/data-type/array';

export interface ClosedHistoryParam<T extends string | number> {
  pkList: T[]; //여러개의 n일간 안보기 팝업목록중에, 하나를 골라서 띄우고싶기 위해서.

  /**
   * 얼마만큼 차이가 나야 팝업이 다시 뜰 수 있는지를 지정
   * 주의 : 24시간동안 보지않기 vs 1일간 보지않기는 서로 다름.
   * 1일간 보지않기 = 날짜 차이가 하루라도 나면 active 상태로 판단함. (= 1월 1일 23시 50분과 1월 2일 00시 10분은 20분 차이지만 1일차이로 간주)
   */
  closePeriod: MatchPeriod;
}

type ConditionalPkResult<T extends string | number> = T extends number ? number | undefined : string | undefined;

export class ClosedHistoryManager {
  /**
   * 여러 종류의 n일간 안보기팝업을 구분할 수 있는 유니크한 접미사
   * pk가 number인 팝업 (multiple)은 반드시 지정해야하고,
   * pk가 string인 팝업 (single)은 굳이 안지정해도됨.
   *
   * pk가 number라는것은, 관리자에서 등록한 다른 DB 테이블에 저장된 다른 용도의 팝업과 id가 겹칠 수 있으므로 unique prefix를 지정하는것이고,
   *
   * pk가 string이라는 것은, 이미 pk 자체가 유니크한 경우가 있어서 굳이 지정하지않아도 된다는 뜻. 값을 'some-special-event-popup' 이런식으로 지정할 수 있으니까.
   */
  uniquePrefix: string;

  constructor(uniquePrefix = "") {
    this.uniquePrefix = uniquePrefix;
  }

  /**
   * @param 여러개의 n일간 안보기 팝업목록
   * @return 그중에 띄워야하는 팝업의 PK
   */
  getActiveInClosedHistory<T extends string | number>({pkList, closePeriod}: ClosedHistoryParam<T>): ConditionalPkResult<T> {
    const historyList = manager.getParsedData();

    // 너무 옛날기록은 삭제
    const resultList = historyList.filter((history) => {
      const diffValue = getDiffPeriod(new Date(), history.closedTimestamp, CLOSE_PERIOD.diffType);
      return diffValue <= CLOSE_PERIOD.value;
    });

    manager.setStringifyItem(resultList);

    return findItem(pkList, (pk) => {
      const findHistory = resultList.find(history => history.uniquePrefix === this.uniquePrefix && history.originalPk === pk);

      // 해당 팝업을 단 한번도 n일간 보지않기 한 적이 없으면
      if (!findHistory) {
        return pk;
      }

      const diffValue = getDiffPeriod(new Date(), findHistory.closedTimestamp, closePeriod.diffType);
      const validated = diffValue >= closePeriod.value;

      if (!validated) {
        return false;
      }

      return pk;
    }) as ConditionalPkResult<T>;
  }

  closeDuringSpecificPeriod(pk: string | number) {
    this.addManuallyClosedHistory(pk, new Date().getTime());
  }

  addManuallyClosedHistory(pk: string | number, timestamp: number) {
    manager.appendFirst({
      uniquePrefix: this.uniquePrefix,
      originalPk: pk,
      closedTimestamp: timestamp,
      closedDateFormat: dayjs(timestamp).format('YYYY.MM.DD HH:mm:ss')
    });
  }
}

interface UniqueCloseHistory {
  uniquePrefix: string;
  originalPk: number | string; //n일간 보지않기 팝업 원본데이터의 PK
}

interface ClosedHistory extends UniqueCloseHistory {
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

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
/** TODO
 * 이 기능 삭제하고 그 대신에
 * active 검사하다가 이미 active한 기록을 찾았으면
 * 과거의 거는 그냥 지워버리는게 나을듯.
 *
 * 물론 갑자기 내일 기획자가 그 체크하는거 기준을 5일이 아닌 1달로 해주세요 바꿔달라고 하면 대응이.... 음... ㄴㄴㄴ 이것도 상관없음.
 * active한거보다 이전꺼를 다 삭제하는거라서.
 *
 * 기존 : n일이 지난 기록은 삭제
 * 변경 : 1시간 전에 닫은 기록을 찾았으면, 그 이전에 막 어제닫고 그저께 닫고 이런 기록은 다 삭제하는게 맞음.
 */
// 1년이 지난 기록은 삭제
const CLOSE_PERIOD: MatchPeriod = {
  diffType: 'date',
  value: 365
}

const manager = new LocalStorageArrayManager({
  key: 'closed-history-in-specific-period',
  enableDuplicated: false, //같은 PK면 닫은기록에는 하나만 생성되야함.
  getUnique: ({uniquePrefix, originalPk}: ClosedHistory) => uniquePrefix + originalPk
});

function findItem<I, R>(list: I[], resultCallback: LoopCallback<I, R | false>): R | undefined {
  for (let i = 0 ; i < list.length ; i++) {
    const item = list[i];
    const result = resultCallback(item, i, list);

    if (result === false) {
      continue;
    }

    return result;
  }

  return undefined;
}
