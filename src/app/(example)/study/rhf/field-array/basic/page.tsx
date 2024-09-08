'use client';

import React from 'react';
import {useFieldArray, useForm} from 'react-hook-form';

// URL: http://localhost:3000/study/rhf/field-array/basic
// Doc: https://docs.google.com/document/d/1IpA5GiRVJy_Ww9PFoyguaCLKc_KWvrzEl8Oa-dQirnE/edit
export default function Page() {
  const { register, control, handleSubmit } = useForm({
    // defaultValues: {}; you can populate the fields by this attribute
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test"
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`test.${index}.firstName`)} />
            <input {...register(`test.${index}.lastName`)} />
            <button type="button" onClick={() => remove(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => append({ firstName: "bill", lastName: "luo" })}
      >
        append
      </button>
      <input type="submit" />
    </form>
  );
}