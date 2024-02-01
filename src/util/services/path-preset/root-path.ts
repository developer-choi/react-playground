import CHANNEL_PATH from "@util/services/path-preset/channel-path";
import BOARD_PATH from "@util/services/path-preset/board-path";

const ROOT_PATH = {
  channel: CHANNEL_PATH,
  board: BOARD_PATH
};

export type DynamicRouteParamType = string | number;

export default ROOT_PATH;
