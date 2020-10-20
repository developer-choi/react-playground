export const FIRST_DIR = Object.freeze({
  style: '/style'
});

export const SECOND_DIR = Object.freeze({
  animation: '/animation'
});

export const ALL_ANIMATION_PATH = `${FIRST_DIR.style}${SECOND_DIR.animation}/all`;

export interface AsideLinkParent {
  name: string;
  childrens: AsideLink[];
}

export interface AsideLink {
  name: string;
  to: string;
}

export const ASIDE_LINKS: Record<string, AsideLinkParent[]> = {
  style: [
    {
      name: '애니메이션',
      childrens: [
        {name: '모든 애니메이션 에제', to: ALL_ANIMATION_PATH}
      ]
    }
  ]
};
