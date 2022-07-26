/**
 * @example ('/fruit/banana', '/fruit') ==> true
 * @example ('/animal/lion?key=value#hash', '/animal') ==> true
 * @example ('/animal-fake/lion', '/animal') ==> false
 */
export function isActiveLink(asPath: string, activePath: string): boolean {
  const _asPath = (function () {

    if (asPath.includes('?')) {
      const endIndex = asPath.indexOf('?');
      return asPath.slice(0, endIndex);

    } else if (asPath.includes('#')) {
      const endIndex = asPath.indexOf('#');
      return asPath.slice(0, endIndex);

    } else {
      return asPath;
    }
  }());

  if (_asPath === activePath) {
    return true;
  }

  return _asPath.startsWith(`${activePath}/`);
}
