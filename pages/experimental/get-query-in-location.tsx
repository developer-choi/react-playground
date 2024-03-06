import {useEffect} from "react";
import {useRouter} from "next/router";

// URL: http://localhost:3000/experimental/get-query-in-location
export default function Home() {
  const {replace} = useRouter();

  useEffect(() => {
    replace({
      query: {
        fruit: ["apple", "banana"]
      }
    });
  }, [replace]);

  useEffect(() => {
    console.log(groupParamsByKey(location.search));
  }, []);

  return null;
}

// https://stackoverflow.com/a/52539264/22674805
const groupParamsByKey = (locationSearch: string) => {
  const params = new URLSearchParams(locationSearch);

  return Array.from(params.entries()).reduce((acc, tuple) => {
    // getting the key and value from each tuple
    const [key, value] = tuple;

    if (acc.hasOwnProperty(key)) {
      // if the current key is already an array, we'll add the value to it
      if (Array.isArray(acc[key])) {
        // eslint-disable-next-line no-param-reassign
        acc[key] = [...acc[key], value];
      } else {
        // if it's not an array, but contains a value, we'll convert it into an array
        // and add the current value to it
        // eslint-disable-next-line no-param-reassign
        acc[key] = [acc[key] as string, value];
      }
    } else {
      // plain assignment if no special case is present
      // eslint-disable-next-line no-param-reassign
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, string | string[]>);
};

export async function getServerSideProps() {
  return {
    props: {}
  };
}
