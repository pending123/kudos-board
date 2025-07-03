import DarkModeToggle from "../../pages/darkModeToggle";

function TestComponent() {
  return (
    <div className="min-h-screen bg-blue-700 text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <DarkModeToggle />
      <h1 className="text-2xl font-bold">Hello Dark Mode</h1>
    </div>
  );
}
export default TestComponent;