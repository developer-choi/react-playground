import {customFetchInClientSide} from "@/utils/extend/api/client";

export function getTestStatus401ClientApi() {
  return customFetchInClientSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
