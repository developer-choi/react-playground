const env = {
  private: {
    prv: process.env.PRIVATE,
    common: process.env.COMMON_VALUE
  },
  public: {
    origin: process.env.NEXT_PUBLIC_ORIGIN as string,
    pub: process.env.NEXT_PUBLIC_PUBLIC as string
  }
};

export default env;
