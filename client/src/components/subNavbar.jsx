function SubNavbar({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  setSearchInputValue,
  submittedSearch,
  setSubmittedSearch,
  handleOnSearchInputChange,
  handleSearchSubmit,     
  handleClearSearch


}) {
  const categories = [
    "All",
    "Recent",
    "Celebration",
    "Thank You",
    "Inspiration",
  ];
    const handleSubmit = (event) => {
        event.preventDefault(); 
        handleSearchSubmit(searchInputValue);
        console.log("It worked: ", searchInputValue)
  };

  //


  return (
    <nav className="bg-white py-6 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-6">
          <div className="searchBar flex items-center w-full max-w-xl">
            <form onSubmit={handleSubmit} className="flex w-full">
              <label className="visually-hidden">
                
                <input
                  type="text"
                  name="query" 
                  placeholder="Search" 
                  value={searchInputValue} 
                  onChange={handleOnSearchInputChange} 
                  className="flex-grow py-3 px-6 rounded-l-full border border-gray-300 bg-gray-100 text-gray-800 text-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </label>
              <button type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-r-full
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out whitespace-nowrap"
              >Search</button>
              <button type="button" onClick={handleClearSearch}
              className="ml-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-5 rounded-full
                             focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300 ease-in-out"
                
              >Clear</button>
            </form>


            
          </div>
        </div>
        <div className="row flex justify-center">
          <ul className="category-menu flex space-x-4 list-none p-0 m-0">
            {categories.map((cat) => (
              <li
                className={activeCategory === cat ? "is-active" : ""}
                key={cat}
              >
                <button
                  onClick={() => {
                    console.log("Category clicked:", cat); 
                    setActiveCategory(cat);
                  }}
                  // Base styling for all buttons: padding, rounded-full, font, text size, transition
                  className={`
                    px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-opacity-75
                    ${activeCategory === cat
                      // Active state styling (e.g., darker shade, shadow, ring)
                      ? 'shadow-md ' +
                        (cat === "All" ? 'bg-teal-600 text-white ring-teal-500' :
                         cat === "Recent" ? 'bg-purple-600 text-white ring-purple-500' :
                         cat === "Celebration" ? 'bg-yellow-600 text-white ring-yellow-500' :
                         cat === "Thank You" ? 'bg-blue-600 text-white ring-blue-500' :
                         cat === "Inspiration" ? 'bg-red-600 text-white ring-red-500' : 'bg-gray-600 text-white ring-gray-500')
                      // Inactive state styling (default color for that category, lighter hover)
                      : (cat === "All" ? 'bg-teal-500 hover:bg-teal-600 text-white' :
                         cat === "Recent" ? 'bg-purple-500 hover:bg-purple-600 text-white' :
                         cat === "Celebration" ? 'bg-yellow-500 hover:bg-yellow-600 text-white' :
                         cat === "Thank You" ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                         cat === "Inspiration" ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700')
                    }
                  `}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );

   }

export default SubNavbar;
