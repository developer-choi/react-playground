//추후 swiper 라이브러리에 출처 추가필요
export function calculateWidth(containerWidth: number, {spaceBetween = 0, slidesPerView}: {spaceBetween?: number; slidesPerView: number}) {
  return (containerWidth - (slidesPerView - 1) * spaceBetween) / slidesPerView;
}
