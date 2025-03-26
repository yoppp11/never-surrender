import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../App.css';
import DoctorCard from '../components/DoctorCard';
import HealthReminder from '../components/HealthReminder';
import Navbar from '../components/Navbar';
import http from '../helpers/http';

export default function HomePage() {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [remind, setRemind] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }


    async function fetchHealthTips(){
        try {
            const response = await http({
                method: 'GET',
                url: '/ai/reccomendations',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            // const data = await response.json()
            setRemind(response.data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    
    async function fetchDoctors(){
      try {
        
        const response = await http({
            method: 'GET',
            url: '/doctors',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        setDoctors(response.data)
        setFilteredDoctors(response.data)
      } catch (error) {
        console.error('Error fetching doctors:', error)
      } finally {
        setIsLoading(false)
      }
    };

    fetchDoctors()
    fetchHealthTips()
  }, [navigate])

  useEffect(() => {
    
    let result = [...doctors]
    
    
    if (specializationFilter !== 'all') {
      result = result.filter(doctor => 
        doctor.specialization.toLowerCase() === specializationFilter.toLowerCase()
      );
    }
    
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(doctor => 
        doctor.name.toLowerCase().includes(term) || 
        doctor.specialization.toLowerCase().includes(term)
      );
    }
    
    
    if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'experience') {
      result.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredDoctors(result);
  }, [searchTerm, specializationFilter, sortOption, doctors]);

  
  const specializations = ['all', ...new Set(doctors.map(doctor => doctor.specialization))];

  return (
    <div className="home-container">
      <Navbar />
      
      <div className="home-content">
        <HealthReminder data={remind}/>
        
        <div className="doctors-header">
          <h2>Temukan Dokter Terbaik</h2>
          
          <div className="doctors-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Cari dokter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-container">
              <select
                value={specializationFilter}
                onChange={(e) => setSpecializationFilter(e.target.value)}
                className="filter-select"
              >
                {specializations.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec === 'all' ? 'Semua Spesialisasi' : spec}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sort-container">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="default">Default</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="experience">Pengalaman Terbanyak</option>
              </select>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="loading">Memuat data dokter...</div>
        ) : filteredDoctors.length === 0 ? (
          <div className="no-results">Tidak ditemukan dokter yang sesuai</div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
