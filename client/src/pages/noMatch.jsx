import NotFoundGif from "../../src/monkeyLaptopGIF.gif";

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4">
      <h1 className="text-6xl md:text-8xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        Page Not Found
      </h2>

      <img
        src={NotFoundGif} 
        alt="Page not found animation" 
        className="max-w-md w-full rounded-lg shadow-lg" 
      />

      <p className="mt-8 text-xl">Looks like you've wandered off the map!</p>
      
    </div>
  );
};

export default NoMatch;
