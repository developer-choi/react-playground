export function getDummy<T>(data: T, willSuccess = true, timeout = 0): Promise<T> {

  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {

      if (willSuccess) {
        resolve(data);

      } else {
        reject(data);
      }

    }, timeout);
  });
}

export function postDummy(item: Object, timeout = 0) {

  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

export const BACK_IMAGE1 = 'https://www.navercorp.com/img/ko/main/img_main_slide1.jpg';
export const BACK_IMAGE2 = 'https://www.navercorp.com/img/ko/main/img_main_slide2.jpg';
export const BACK_IMAGE3 = 'https://www.navercorp.com/img/ko/main/img_main_slide3.jpg';
export const BACK_IMAGE4 = 'https://www.navercorp.com/img/ko/main/img_main_slide4.jpg';
export const BACK_IMAGE5 = 'https://www.navercorp.com/img/ko/main/img_main_slide5.jpg';

export const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
