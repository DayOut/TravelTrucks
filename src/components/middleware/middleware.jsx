const errorMiddleware = (store) => (next) => (action) => {
  if (action.type.endsWith("/rejected")) {
    console.error("Error:", action.payload);
  }
  return next(action);
};

export default errorMiddleware;
