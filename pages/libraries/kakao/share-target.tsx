import React from "react";
import type {GetServerSideProps} from "next";

interface PageProp {
  count: number
}

const Page = ({count}: PageProp) => {
  return (
    <div>
      count = {count}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  return {
    props: {
      count: query.count
    }
  };
};

export default Page;
