import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const hideBackOn = ['/'];

  const showBackButton = !hideBackOn.includes(location.pathname);

  return (
    <div className="HeaderWrapper bg-gray-800 text-white py-4 shadow-md flex items-center justify-center">
      {showBackButton && (
        <button
          className="absolute left-4 cursor-pointer text-lg"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <div className="Header text-center text-3xl font-bold tracking-wider"
      >Kudos Board</div>
    </div>
  );
};

export default Header;
