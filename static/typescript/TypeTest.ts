interface CanEat {
  delicious: boolean;
}

interface TypeTest extends CanEat{
  fruitName: string;
}

interface CanMove {
  distance: string;
}

interface Car {
  carName: string;
}

interface TestSingle<EatType extends CanEat> {
  eat: EatType;
}

interface TestDouble<EatType extends CanEat, MoveType extends CanMove> {
  eat: EatType;
  move: MoveType;
}

declare function testFunction<EatType extends CanEat>(): EatType

/* 아래의 변수에 마우스 커서 올려 보기 */
const testFuncResult = testFunction();

testFuncResult;

/* 하지만 주석풀면 아래는 에러남. */
// const testVar: TestDouble = {
//   eat: {delicious: true},
//   move: {distance: "10km"}
// }
//
// testVar;

/* 하지만 주석풀면 에러남. declare를 왼쪽에 붙여야하더라. */
// function useNavigation<T extends {navigate: (str: string) => void}>(): T;
// const navigation = useNavigation();
