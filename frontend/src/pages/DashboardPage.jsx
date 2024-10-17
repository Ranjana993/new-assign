// import Dashboard from '../components/Dashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="w-[90%] h-[80%]">
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
