import React, {useEffect} from 'react';

export default function Page(props: any) {
  useEffect(() => {
    console.log('props', props);
  }, [props]);

  return (
    <div>Custom 404 page</div>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  return {
    props: {
      data: 'data'
    }
  };
}
