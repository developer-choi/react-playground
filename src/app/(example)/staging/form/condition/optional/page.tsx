"use client";

import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import {Button} from '@forworkchoe/core';

/**
 * URL: http://localhost:3000/staging/form/condition/optional
 * Doc: https://docs.google.com/document/d/1FrcXHqKlEYCa5KU3PACrsC0qpolvLXICbpB8Ht8vhO4/edit?tab=t.0
 */
export default function Home() {
  const {register, handleSubmit, watch, unregister} = useForm<TestFormData>({
    defaultValues: {
      enable: true
    }
  });

  const enable = watch("enable");

  useEffect(() => {
    if (!enable) {
      // 이거 안하면 제출할 때 text값이 들어가버리는 문제가 생김.
      // 그대신 이거 하면, 제출할 때 키값 자체가 빠짐. undefined 안나오고
      unregister("text");
    } else {
      // third-party library는 여기서 직접 register 다시 해줘야함
    }
  }, [enable, unregister]);

  const onError: SubmitErrorHandler<TestFormData> = useCallback(errors => {
    console.error(errors.text);
  }, []);

  const onSubmit: SubmitHandler<TestFormData> = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Checkbox {...register('enable')} label="활성화"/>
      {watch("enable") ? <Input {...register("text", {required: "필수임"})} /> : null}
      <Button isSubmit>제출</Button>
    </form>
  );
}

interface TestFormData {
  text: string;
  enable: boolean;
}
