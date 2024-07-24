import {customFetchInServerSide} from "@/utils/extend/api/server";

export async function getTestStatus401ServerApi() {
  return customFetchInServerSide("/api/test/status-401", {authorize: 'private', method: 'GET'});
}
