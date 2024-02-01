import React from "react";
import type {GetServerSideProps} from "next";

interface PageProp {
  pk: number;
}

const Page = ({pk}: PageProp) => {
  return <div>pk = {pk}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    props: {
      pk: query.pk
    }
  };
};

export default Page;
