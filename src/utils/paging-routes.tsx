/** Example
 * urlWithId /user/list/:id
 * initialUrl /user/list/1
 * redirectPath /user/list
 */
import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {RouteProps} from 'react-router';

export interface PagingRouteResult {
  urlWithId: string;
  initialUrl: string;
  redirectPath: string;
}

function makePagingRoute(urlWithId: string): PagingRouteResult {
  if (urlWithId.includes(':id')) {
    throw Error(':id is not in parameter. parameter=' + urlWithId)
  }

  return {
    initialUrl: urlWithId.replace(':id', '1'),
    redirectPath: urlWithId.replace('/:id', ''),
    urlWithId
  };
}

export function pagingRouteToUrlTemplate({urlWithId}: PagingRouteResult) {
  return function (page: number) {
    return urlWithId.replace(':id', page.toString());
  };
}

export function PagingRoute({urlWithId, redirectPath, initialUrl, ...rest}: Omit<PagingRouteResult, 'urlTemplate'> & RouteProps) {
  return (
      <>
        <Redirect to={initialUrl} path={redirectPath}/>
        <Route exact path={urlWithId} {...rest}/>
      </>
  );
}

export const SWAP_HISTORY_PAGING_ROUTE = makePagingRoute('/user/swap/:id');
