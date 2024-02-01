import React, {ChangeEvent, ComponentPropsWithoutRef, forwardRef, Ref, useCallback} from "react";

export interface InputFileProp extends Omit<ComponentPropsWithoutRef<"input">, "type" | "onChange"> {
  onChangeFile?: (file: File | undefined) => void;
  onChangeFiles?: (file: File[]) => void;
}

export default forwardRef(function InputFile({onChangeFiles, onChangeFile, ...rest}: InputFileProp, ref: Ref<HTMLInputElement>) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? []);

      /**
       * https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file#answer-60886920
       * 1. a.png파일 선택
       * 2. UI상으로 a.png파일이 목록에 추가됨
       * 3. 해당 파일목록을 목록에서 삭제
       * 4. 다시 파일탐색기 열어서 a.png 추가
       * ==> 추가안됨
       *
       * 이 버그를 해결하기위해 추가
       */
      // eslint-disable-next-line no-param-reassign
      event.target.value = "";

      if (onChangeFile) {
        const file = files.length > 0 ? files[0] : undefined;
        onChangeFile(file);
        return;
      }

      if (onChangeFiles) {
        onChangeFiles(files);
        return;
      }
    },
    [onChangeFile, onChangeFiles]
  );

  return <input ref={ref} type="file" onChange={onChange} {...rest} />;
});
