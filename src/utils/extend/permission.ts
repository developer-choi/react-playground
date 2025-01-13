export type Resource = FlatPermissionResource<ResourceObject>;

// actions
export type ReadAction = 'READ';
export type Action = ReadAction | 'CREATE' | 'DELETE' | 'UPDATE' | 'ALL';

// permissions
export type Permission = `${Resource}${PermissionSeparator}${Action}`;
export type ReadPermission = `${Resource}${PermissionSeparator}${ReadAction}`;

export function hasPermission(request: Permission, granted: Permission[]) {
  return granted.some(granted => comparePermission(request, granted));
}

export function parsePermissionsinSession(permissions: string): Permission[] {
  if (!permissions) {
    return [];
  }

  return permissions.split(',') as Permission[];
}

/*************************************************************************************************************
 * Non Export
 *************************************************************************************************************/
interface ResourceObject {
  NOTICE: {
    STUDENT: string;
    TEACHER: string;
  };
  DASHBOARD: {
    COMMUNITY: string;
    PAYMENT: string;
  };
}

// 권한을 객체로 정의한걸 일렬로 펴기위한 유틸리티 타입
type FlatPermissionResource<T, Prefix extends string = ''> = {
  [K in keyof T]:
  T[K] extends string
    ? `${Prefix}${K & string}` // 현재 키를 문자열로 추가
    : `${Prefix}${K & string}` | FlatPermissionResource<T[K], `${Prefix}${K & string}.`>; // 하위 객체 처리
}[keyof T];

/**
 * @param request 확인하려고 하는 권한
 * @param granted 가지고있는 권한 (request와 리소스가 같거나 더 높아야함.)
 *
 * @example ('b2b.inquiry.list:READ', 'coupon:ALL') ==> false
 * @example ('b2b.inquiry.list:READ', 'b2b:ALL') ==> true
 * @example ('b2b.inquiry:READ', 'b2b.inquiry.list:ALL') ==> false
 */
function comparePermission(request: Permission, granted: Permission): boolean {
  const [requestResource, requestAction] = parsePermission(request);
  const [grantedResource, grantedAction] = parsePermission(granted);

  /**
   * 'b2b.inquiry.list', 'coupon.marketing' 이런식으로 아예 계층 이름 혹은 부분집합 자체가 잘못되었거나
   * 'b2b', ''b2b.inquiry' 이런식으로 부분집합 관계가 반대인 경우를 한방에 체크하기 위함
   */
  if (!requestResource.includes(grantedResource)) {
    return false;
  }

  return isActionAllowed(requestAction, grantedAction);
}

/**
 * @param request 확인하려고 하는 액션
 * @param grantedAction 가지고있는 액션
 * @example ('READ', 'ALL') ==> true
 * @example ('ALL', 'ALL') ==> true
 * @example ('READ', 'READ') ==> true
 * @example ('ALL', 'READ') ==> false
 */
function isActionAllowed(request: Action, grantedAction: Action) {
  if (grantedAction === 'ALL') {
    return true;

  } else {
    return request === grantedAction;
  }
}

// 권한 구분자는 콜론으로 하기로 협의됨.
type PermissionSeparator = ':';
const Permission_Separator: PermissionSeparator = ':';
function parsePermission(permission: Permission): [Resource, Action] {
  return permission.split(Permission_Separator) as [Resource, Action];
}
