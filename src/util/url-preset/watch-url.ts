import {urlStringify} from '@util/extend/query-string';

export const WATCH_URLS = {

  /** Examples
   * https://www.youtube.com/watch?v=tB0EJDuaW8E
   * https://www.youtube.com/watch?v=tB0EJDuaW8E&t=100s
   * https://www.youtube.com/watch?v=tB0EJDuaW8E&list=PLswsdArQJ4KVtETM2JUayFmIllqEqqY06&index=2&t=11797s
   */
  watch: function ({t, ...rest}: WatchQuery) {
    const _t = typeof t === 'number' ? `${t}s` : t;

    return `/watch${urlStringify({
      t: _t,
      ...rest
    })}`;
  }
};

/** Rules
 * Query Parameter Key: type;
 */
type WatchQuery = {
  v: string; // videoId
  t?: string | number; // time
  list?: string;
  index?: string;
}
