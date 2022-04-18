export const authenticateMiddleware = (store) => (next) => (action) => {

  try {
      console.log(action);
    if (action?.payload?.error?.includes(401)) {
      localStorage.clear();
      window.location.href = "https://spotify-applay.netlify.app";
      return;
    }

    return next(action);
  } catch (err) {
    console.error("Caught an exception!", err);
    //   Raven.captureException(err, {
    //     extra: {
    //       action,
    //       state: store.getState()
    //     }
    //   })
    throw err;
  }
};
