import {  useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';




const SearchDonorsPage = () => {
  
const axiosInstance = useAxios();
  const [locations, setLocations] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchParams, setSearchParams] = useState(null);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Load locations.json from public folder
  useEffect(() => {
    fetch('/operatingArea.json')
      .then(res => res.json())
      .then(data => {
        setLocations(data);
        const uniqueDistricts = data.map(loc => loc.district);
        setDistricts(uniqueDistricts);
      });
  }, []);

  // Update upazila list on district change
  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    const matched = locations.find(loc => loc.district === district);
    setUpazilas(matched ? matched.upazila : []);
  };

  // Search query
  const { data: donors = [], refetch, isLoading } = useQuery({
    queryKey: ['public-donors', searchParams],
    enabled: !!searchParams,
    queryFn: async () => {
      const res = await axiosInstance.get('/public-donors', {
        params: searchParams,
      });
      return res.data;
    },
  });

   useEffect(() => {
  if (searchParams) {
    refetch();
  }
}, [searchParams, refetch]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    setSearchParams({ bloodGroup, district, upazila });
   

  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">🔍 Search Donors</h2>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-base-200 p-4 rounded-xl shadow"
      >
        <select name="bloodGroup" className="select select-bordered" required>
          <option value="">Select Blood Group</option>
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          name="district"
          className="select select-bordered"
          required
          onChange={handleDistrictChange}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select name="upazila" className="select select-bordered" required>
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Search
        </button>
      </form>

      {/* Donor List */}
      <div className="mt-10">
        {isLoading ? (
          <p className="text-center text-lg">Loading donors...</p>
        ) : (
          <>
            {donors.length === 0 && searchParams ? (
              <p className="text-center text-warning text-lg mt-6">
                No donors found for the selected filters.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {donors.map((donor) => (
                  <div key={donor._id} className="card bg-base-100 shadow-xl">
                    <div className="card-body flex flex-row gap-4 items-center">
                      <img
                        src={donor.avatar}
                        alt={donor.name}
                        className="w-20 h-20 rounded-full object-cover border"
                      />
                      <div>
                        <h2 className="card-title">{donor.name}</h2>
                        <p>
                          <strong>Blood Group:</strong> {donor.bloodGroup}
                        </p>
                        <p>
                          <strong>Location:</strong> {donor.district},{' '}
                          {donor.upazila}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchDonorsPage;
