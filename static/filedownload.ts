import axios from 'axios';

/**
 * 왜 이미지다운로드가 1은되고 2는안되는지 모르겠다.
 * https://stackoverflow.com/questions/3749231/download-file-using-javascript-jquery
 *
 * 어쨌든 스펙은,
 * 1. CORS도 잘 적용되서 CORS 허용안해주는 서버의 자원을 요청하면 에러도 잘 떨어지고,
 * 2. CORS가 허용된 서버의 자원을 요청하면 잘 다운로드도 받아진다.
 */

export async function fetchImage() {
  const res = await fetch('http://localhost:3000/doren-logo.png');
  const blob = await res.blob();
  afterProcess(blob);
}

export async function fetchImage2() {
  const res = await axios.get('http://localhost:3000/doren-logo.png');
  const blob = new Blob([res.data]);
  afterProcess(blob);
}

function afterProcess(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  console.log(url);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  // the filename you want
  a.download = 'hello.png';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
