/**
 * 이미지 다운로드가 이제는 더이상 안되는 코드를 분류했습니다.
 */

// https://stackoverflow.com/a/28890083/14477509
function download1(href: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = "output.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// https://stackoverflow.com/questions/17527713/force-browser-to-download-image-files-on-click
async function download2(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = objectUrl;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

// https://stackoverflow.com/a/49886131/14477509
function download3(url: string, fileName: string){
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
function download4(url: string, filename: string) {
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:application/octet-stream,' + encodeURIComponent(url));
  pom.setAttribute('download', filename);
  pom.style.display = 'none';
  document.body.appendChild(pom);
  pom.click();
  document.body.removeChild(pom);
}

// https://stackoverflow.com/a/49093626/14477509
async function private_toDataUrlFileReader(url: string) {
  let blob = await fetch(url).then(r => r.blob());
  return new Promise<string>(resolve => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

async function download5(url: string, filename: string) {
  const dataUrl = await private_toDataUrlFileReader(url);
  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = dataUrl;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export {};
