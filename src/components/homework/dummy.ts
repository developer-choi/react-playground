import {ImageInfo} from "./ImageInfo";

export interface CardInfo {
    imageInfo: ImageInfo,
    title: string,
    content: string,
    starPoint: number,
    author: string,
    hightlight: string,
    crossOut: string,
    label: string
}

export const loremText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const shortText = "short text";
export const longText = new Array<string>(10).fill("long text LONG TEXT").join(" ");
export const middleText = new Array<string>(2).fill("middle text MIDDLE TEXT").join(" ");
export const horizonImageInfo = {
    src: "/static/images/horizon-long.jpg",
    alt: "dummy image"
};
export const verticalImageInfo = {
    src: "/static/images/vertical-long.jpg",
    alt: "dummy image"
};
export const imageInfo = {
    src: "/static/images/img-temp.png",
    alt: "dummy image"
};

export const longCard: CardInfo = {
    imageInfo: horizonImageInfo, title: longText, author: longText, content: longText,
    starPoint: 1, hightlight: longText, crossOut: longText, label: longText
};
export const middleCard: CardInfo = {
    imageInfo: verticalImageInfo, title: middleText, author: middleText, content: middleText,
    starPoint: 2, hightlight: middleText, crossOut: middleText, label: middleText
};
export const shortCard: CardInfo = {
    imageInfo: imageInfo, title: shortText, author: shortText, content: shortText,
    starPoint: 3, hightlight: shortText, crossOut: shortText, label: shortText
};
