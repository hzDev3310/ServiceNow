import ClipLoader from "react-spinners/ClipLoader";

const AppLoading = () => {
  return (
    <div className="w-screen h-screen absolute flex flex-col justify-center items-center" style={{ backgroundColor: "rgba(1, 2, 3, 0.5)"}}  >
      <ClipLoader
        color="#2563eb"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h1>... loading</h1>
    </div>
  );
};

export default AppLoading;
