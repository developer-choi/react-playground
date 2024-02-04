import {useCallback} from 'react';
import type {ScriptProps} from 'next/script';

export default function Home() {
  const downloadScript = useCallback(() => {
    appendScript({
      src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
      onLoad: () => {
        console.log('loaded');
      }
    });
  }, []);

  return (
    <button onClick={downloadScript} style={{padding: 10}}>download script</button>
  );
}

export async function getServerSideProps() {
  return {
    props: {}
  };
}

function appendScript(props: ScriptProps & Required<Pick<ScriptProps, 'src'>>) {
  // 이거 안쓰면 document body 밑에 script 똑같은거 무한정 추가됨. (물론 그렇다고 실제 JS 더 불러오려는 요청은 네트워크 패널에 안생김)
  const existedScript = document.querySelector(`script[src='${props.src}']`) as HTMLScriptElement;

  if (existedScript) {
    assignScriptAttribute(existedScript, props);
    return;
  }

  const script = document.createElement('script');
  assignScriptAttribute(script, props);

  document.body.appendChild(script);
}

function assignScriptAttribute(script: HTMLScriptElement, props: ScriptProps) {
  Object.assign(script, Object.fromEntries(Object.entries(props).map(([key, value]) => {
    if (key in HTML_ATTRIBUTE_RECORD) {
      return [HTML_ATTRIBUTE_RECORD[key as keyof ScriptProps], value];
    } else {
      return [key, value];
    }
  })));
}

const HTML_ATTRIBUTE_RECORD: Partial<Record<keyof ScriptProps, string>> = {
  onLoad: 'onload'
};
