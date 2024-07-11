import {getCustomFetchInClientSide} from "@/utils/extend/api/client";

export function getTestStatus401ClientApi() {
  return getCustomFetchInClientSide("/api/test/status-401", {authorize: "private"});
}
