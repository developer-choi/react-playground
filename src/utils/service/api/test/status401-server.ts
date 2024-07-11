import {getCustomFetchInServerSide} from "@/utils/extend/api/server";

export async function getTestStatus401ServerApi() {
  return getCustomFetchInServerSide("/api/test/status-401", {authorize: "private"});
}
