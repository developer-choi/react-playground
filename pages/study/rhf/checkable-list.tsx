import React, {useEffect} from "react";
import {range} from "@util/extend/data-type/number";
import type {NumericString} from "@type/string";
import {useForm} from "react-hook-form";
import {useQuery} from "@tanstack/react-query";
import {useLogWhenRendering} from "@util/extend/test";
import styled from "styled-components";

/** URL: http://localhost:3000/study/rhf/checkable-list
 * 버그 재현방법
 * (1) 1-title 체크
 * (2) 2-title 체크
 * (3) 3-title 체크
 * (4) 이러면 첫 번째 effect에 의해 전체체크박스도 선택됨.
 * (5) 1-title 해제
 * (6) 이러면 두 번째 effect에 의해 모든 체크박스가 해제되버림. (expected: 전체체크박스와 1-title2개만 해제)
 */
export default function Page() {
  const {register, watch, setValue} = useForm<MailListFormData>({
    defaultValues: {
      deletePks: [],
      allChecked: false
    }
  });
  const {data} = useQuery({
    queryKey: ["checkable-list"],
    queryFn: getMailListApi
  });

  const {allChecked, deletePks} = watch();

  //목표1. 모든 체크박스들이 선택/해제 여부에 따라 전체체크박스가 체크/해제 되야한다. ==> 실패
  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    setValue("allChecked", data.length === deletePks.length);
  }, [data, deletePks, setValue, watch]);

  //목표2. 전체체크박스 체크/해제 여부에 따라, 모든 체크박스가 선택 / 해제되야한다. ==> 실패
  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    if (allChecked) {
      setValue(
        "deletePks",
        data.map((mail) => mail.pk.toString() as NumericString)
      );
    } else {
      setValue("deletePks", []);
    }
  }, [allChecked, data, setValue]);

  useLogWhenRendering("watch", watch());

  if (!data) {
    return null;
  }

  return (
    <Form>
      <label>
        <input type="checkbox" {...register("allChecked")} />
        전체선택
      </label>
      {data.map((mail) => (
        <label key={mail.pk}>
          <input type="checkbox" value={mail.pk} {...register("deletePks")} />
          {mail.title}
        </label>
      ))}
    </Form>
  );
}

interface Mail {
  pk: number;
  title: string;
}

interface MailListFormData {
  deletePks: NumericString[];
  allChecked: boolean;
}

async function getMailListApi(): Promise<Mail[]> {
  return range(1, 3).map((value) => ({
    pk: value,
    title: `${value}-title`
  }));
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
