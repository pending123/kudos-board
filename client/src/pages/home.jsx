import SubNavbar from "../components/subNavbar";

const Home = ({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
  handleSearchSubmit,
  handleClearSearch,
}) => {
  return (
    <div className="navBar">
      <SubNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchInputValue={searchInputValue}
        handleOnSearchInputChange={handleOnSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        handleClearSearch={handleClearSearch}
      />
      <p>Welcome to Home Page!</p>
    </div>
  );
};

export default Home;
