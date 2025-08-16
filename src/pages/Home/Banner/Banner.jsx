import { Link } from "react-router";
import bloodBannerImage from "../../../../public/Blood donation illustration.png.jpg";


const Banner = () => {
  return (
    <section className="bg-red-50 mt-20 pt-30 md:pt-40 pb-16 px-4 md:px-10 rounded-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 leading-tight">
            Be a Hero. <br /> Donate Blood Today.
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Join LifeStream in saving lives. One drop of blood can bring hope to someone in need.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md"
            >
              Join as a Donor
            </Link>
            <Link
              to="/search-donor"
              className="border border-red-600 text-red-600 hover:bg-red-100 font-semibold px-6 py-3 rounded-lg"
            >
              Search Donors
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full max-w-md">
          <img
            src={bloodBannerImage}
            alt="Blood donation illustration"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
