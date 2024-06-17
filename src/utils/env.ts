const env = {
  private: {
    prv: process.env.PRIVATE,
    common: process.env.COMMON_VALUE
  },
  public: {
    origin: process.env.NEXT_PUBLIC_ORIGIN as string,
    pub: process.env.NEXT_PUBLIC_PUBLIC as string,
    api: process.env.NEXT_PUBLIC_API as string,
    kakaoJavascriptKey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY as string
  }
};

export default env;
