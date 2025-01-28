import { Link } from "react-router-dom";

const Advertisements = ({ advertisements }) => {

  return (
    <div className="w-full h-full">
      <Link to={'#'}>
        <img
          src={advertisements && advertisements[0]?.image_path}
          alt=""
          className="w-full object-cover"
        />
      </Link>
    </div>
  );
};

export default Advertisements;
