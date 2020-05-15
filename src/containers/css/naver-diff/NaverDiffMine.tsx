import * as React from "react";
import "./NaverDiff.scss";

export default function NaverDiffMine() {

    return (
        <div>
            <div className="naver-style">
                <div className="post_article">
                    <div className="cont_post"><h2><a href="https://d2.naver.com/helloworld/8819851">NAVER 오픈소스 세미나 - Performance does matter</a>
                    </h2>
                        <div className="cont_img">
                            <a href="https://d2.naver.com/helloworld/8819851">
                                <img src="https://d2.naver.com/content/images/2019/06/image.png" width="100%" height="100%" alt=""/>
                            </a>
                        </div>
                        <a href="https://d2.naver.com/helloworld/8819851" className="post_txt_wrap">
                            <div className="post_txt"> 다양한 컴포넌트의 조합으로 구성된 서비스를 운영하다보면 장애나 성능 문제가 발생했을 때 정확한 원인을 파악하는데 시간이 오래
                                걸린다는 또다른 난제에 부딪히곤 합니다. NAVER에서도 시스템 복잡도가 높아지며 발생하는 이러한 문제들을 해결하기 위해 여러가지 고민을 했고, 그 결과 Pinpoint라는
                                새로운 플랫폼을 만들어서 오픈소스로 공개한 바 있습니다. (참고: 대규모 분산 시스템 추적 플랫폼, Pinpoint) 공개 이후 Pinpoint는 NAVE
                            </div>
                        </a>
                        <dl>
                            <dt><i className="xi-time-o"><span className="blind">등록일</span></i></dt>
                            <dd>2019.06.28</dd>
                            <dt><span className="blind">|</span></dt>
                            <dd><span className="line_bar">|</span></dd>
                            <dt><i className="xi-eye"><span className="blind">카운트</span></i></dt>
                            <dd>12123</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="my-style" style={{maxWidth: "640px"}}>
                <a className="display-flex hover-container" href="">
                    <div className="display-flex flex-direction-column">
                        <span className="title hover-item-underline">NAVER 오픈소스 세미나 - Performance does matter</span>
                        <span className="content">다양한 컴포넌트의 조합으로 구성된 서비스를 운영하다보면 장애나 성능 문제가 발생했을 때 정확한 원인을 파악하는데 시간이 오래
                                걸린다는 또다른 난제에 부딪히곤 합니다. NAVER에서도 시스템 복잡도가 높아지며 발생하는 이러한 문제들을 해결하기 위해 여러가지 고민을 했고, 그 결과 Pinpoint라는
                                새로운 플랫폼을 만들어서 오픈소스로 공개한 바 있습니다. (참고: 대규모 분산 시스템 추적 플랫폼, Pinpoint) 공개 이후 Pinpoint는 NAVE</span>
                    </div>
                    <img className="image" src="https://d2.naver.com/content/images/2019/06/image.png" width="170px" alt=""/>
                </a>
            </div>
        </div>
    );
}
