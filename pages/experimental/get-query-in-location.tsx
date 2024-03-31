import {useEffect} from "react";
import {useRouter} from "next/router";
import {convertQueryStringToObject} from '@util/extend/browser/query-string';

// URL: http://localhost:3000/experimental/get-query-in-location
export default function Home() {
  const {replace} = useRouter();

  useEffect(() => {
    replace({
      query: {
        fruit: ["apple", "banana"]
      }
    }).then(() => {
      console.log(convertQueryStringToObject(location.search));
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}
