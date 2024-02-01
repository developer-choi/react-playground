import {type ChangeEvent, useCallback} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";

/** file 컨트롤을 rhf로 테스트했었던 예제
 * URL: http://localhost:3000/experimental/rhf/file
 * URL.revokeObjectURL() 부분을 추가로 개선하면됨. 현재는 미리보기이미지 create만 해놓고 revoke를 안했음.
 * ==> useFilesToImages()와 결합해서. 로직 구현하면됨.
 *
 * 파일컨트롤은, 굳이 register()해서 연동할 필요성을 찾지못했음.
 * rhf의 registerOptions에서 제공하는 온갖 유효성검증 기능 하나도 못쓰는것도있고,
 * register()하게되면 폼데이터에 FileList 타입으로 저장되기때문에, 썸네일이미지 삭제할 때 원본파일을 같이 삭제할 수 없음. ( deleteFile() 구현부분 )
 * FileList에는 삭제하는 메소드가 없기때문.
 * 그래서, onChange handler에 그냥 setValue로 데이터연동만 하기로 판단함.
 */
export default function Page() {
  const {handleSubmit, watch, setValue, getValues} = useForm<TestFormData>({
    defaultValues: {
      files: []
    }
  });

  const onSubmit: SubmitHandler<TestFormData> = useCallback((data) => {
    console.log(data.files);
  }, []);

  const previewList = watch("files").map((file) => ({
    thumbnail: URL.createObjectURL(file),
    file
  }));

  const deleteFile = useCallback(
    (file: File) => {
      const currentFiles = getValues("files");
      setValue(
        "files",
        currentFiles.filter(({name}) => file.name !== name)
      );
    },
    [getValues, setValue]
  );

  const onChangeFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      setValue("files", files ? Array.from(files) : []);
    },
    [setValue]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" multiple onChange={onChangeFiles} />
        <button style={{background: "red", width: 100, height: 30}}>제출</button>
      </form>

      {previewList.map((preview) => (
        <div key={preview.file.name} style={{position: "relative", display: "inline-block"}}>
          <img src={preview.thumbnail} width={100} height={100} alt="미리보기" />
          <button onClick={() => deleteFile(preview.file)} style={{position: "absolute", right: 0, top: 0}}>
            X
          </button>
        </div>
      ))}
    </>
  );
}

interface TestFormData {
  files: File[];
}
