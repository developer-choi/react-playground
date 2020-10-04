export function asyncAlert(message?: any) {

  setTimeout(() => {
    alert(message);
  });
}
