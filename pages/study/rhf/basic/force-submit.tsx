import React, {useCallback} from "react";
import type {SubmitHandler} from "react-hook-form";
import {useForm} from "react-hook-form";

/**
 * URL: http://localhost:3000/study/rhf/basic/force-submit
 * onSubmit을 form의 onSubmit이나 submit button이 아닌 다른 방법으로 시키고 싶은경우
 * handleSubmit(onSubmit)을 호출하면됨.
 * 이게 유용했던 경우는, 필터에서 뭐하나 체크했을 때 제출하게하는 동작이었음.
 */
export default function Page() {
  const {handleSubmit, register} = useForm<TestFormData>({
    defaultValues: {
      isChecked: false
    }
  });

  const onSubmit: SubmitHandler<TestFormData> = useCallback((data) => {
    console.log("onSubmit", data);
  }, []);

  return (
    <form>
      <input type="checkbox" {...register("isChecked", {onChange: () => handleSubmit(onSubmit)()})} />
    </form>
  );
}

interface TestFormData {
  isChecked: boolean;
}
