import {TailSpin} from "react-loader-spinner";

const LoaderComponent = () => {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
    />
  );
};

export default LoaderComponent;
