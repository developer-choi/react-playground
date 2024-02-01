import ValidateError from "@util/services/handle-error/ValidateError";

export type FileUnit = "B" | "KB" | "MB" | "GB" | "TB";

export interface FileSize {
  size: number;
  unit: FileUnit;
}

export interface FileSizeDetail extends FileSize {
  original: number;
  text: string;
}

export function fileSizeToByte(size: number, unit: FileUnit): number {
  switch (unit) {
    case "B":
      return size;

    case "KB":
      return size * 2 ** 10;

    case "MB":
      return size * 2 ** 20;

    case "GB":
      return size * 2 ** 30;

    default:
      throw new ValidateError("허용되지 않는 파일의 용량단위입니다.");
  }
}

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string#answer-28120564
export function getFileSizeDetail(byte: number): FileSizeDetail {
  const original = byte;

  if (byte == 0) {
    return {
      size: 0,
      unit: "B",
      text: "0B",
      original
    };
  }

  const e = Math.floor(Math.log(byte) / Math.log(1024));
  const size = Number((byte / Math.pow(1024, e)).toFixed(2));
  const unit = (" KMG".charAt(e) + "B") as FileUnit;
  const text = size + unit;

  return {
    size,
    unit,
    original,
    text
  };
}
