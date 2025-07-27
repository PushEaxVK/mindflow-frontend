import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <ClipLoader
      color="#649179"
      loading
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
