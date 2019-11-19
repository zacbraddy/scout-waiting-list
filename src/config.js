const dev = {
  TEST: process.env.REACT_APP_DEV_TEST,
};

const prod = {
  TEST: process.env.REACT_APP_PROD_TEST,
};

let config;
if (process.env.NODE_ENV !== 'production') {
  config = dev;
} else {
  config = prod;
}

export default config;
