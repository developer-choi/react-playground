import React, {useCallback} from 'react';
import styled from 'styled-components';
import {Button} from '@component/atom/button/button-presets';
import axios, {AxiosError} from 'axios';

export default function Page() {

  const onClick = useCallback(async () => {
    try {
      const response = await axios.post('http://localhost:8000/buy/expensive', {}, {
        withCredentials: true
      });
      console.log('api call success', response);
    } catch (error) {
      console.log('error', {...(error as AxiosError)});
    }
  }, []);

  const down = useCallback(() => {
    const url = 'http://localhost:8000/images/appStore.svg';
    const filename = 'download.png';
    startDownload(url);
    // imgDown1(url);
    // fetchImageUrl(url);
    // forceDownload(url, filename);
    // downImg2(url, filename)
    // downImg3(url, filename);
  }, []);

  return (
    <Wrap>
      <a href="/images/next-logo.png" download>클릭시 이미지 다운로드</a>
      <Button onClick={onClick}>CORS API 호출</Button>
      <Button onClick={down}>이미지 다운</Button>
      <ImageDownload mediaType="image/svg" src="http://localhost:8000/images/appStore.svg"/>
      {/*<ImageDownload mediaType="image/png" src="https://s.pstatic.net/static/www/img/uit/sp_main_947f65.png"/>*/}
    </Wrap>
  );
}

// https://stackoverflow.com/a/28890083/14477509
function imgDown1(href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = "output.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// https://stackoverflow.com/questions/17527713/force-browser-to-download-image-files-on-click
async function fetchImageUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.download = 'download.png';
  anchor.href = objectUrl;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

// https://stackoverflow.com/a/49886131/14477509
function forceDownload(url: string, fileName: string){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL(this.response);
    var tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  }
  xhr.send();
}

// https://stackoverflow.com/a/32471653/14477509
function downImg2(url: string, filename: string) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(url));
  pom.setAttribute('download', filename);
  pom.style.display = 'none';
  document.body.appendChild(pom);
  pom.click();
  document.body.removeChild(pom);
}

async function toDataUrlFileReader(url: string) {
  let blob = await fetch(url).then(r => r.blob());
  return new Promise<string>(resolve => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

async function downImg3(url: string, filename: string) {
  const dataUrl = await toDataUrlFileReader(url);
  console.log('dataurl', dataUrl);
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = dataUrl;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function ImageDownload({src, mediaType}: {src: string, mediaType: string}) {
  return (
    <a href={src} type={mediaType} download>
      <img src={src} alt="image" crossOrigin="use-credentials"/>
      {/*<img src={src} alt="image"/>*/}
    </a>
  );
}

let downloadedImg: HTMLImageElement | null = null;

function startDownload(imageURL: string) {
  downloadedImg = new Image;
  downloadedImg.crossOrigin = "Anonymous";
  downloadedImg.src = imageURL;
  /**
   * TODO
   * 화면에 잠깐 이미지 보이나안보이나 체크하기.
   * 근데 왜 DATA URI로 바꾸는 다른방법 다 왜 안되? blob()로 바꿔서 fileReader API했었는데.
   * 캔버스 그리는방법말고 진짜로 없는거야 dataurl 만드는방법?
   */
  downloadedImg.onload = imageReceived;
}

function imageReceived() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  if (!context || !downloadedImg) {
    return;
  }

  canvas.width = downloadedImg.width;
  canvas.height = downloadedImg.height;

  try {
    context.drawImage(downloadedImg, 0, 0);
    const dataurl = canvas.toDataURL('image/png');
    console.log('canvas dataurl', dataurl);
    const anchor = document.createElement('a');
    anchor.download = 'download.png';
    anchor.href = dataurl;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
  catch(err) {
    console.log("Error: " + err);
  }
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > * {
    padding: 5px;
  }
`;
