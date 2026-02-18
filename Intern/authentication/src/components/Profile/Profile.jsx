import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import Loading from '../common/Loading';
import ErrorMessage from '../common/ErrorMessage';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loading message="Loading profile..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-md border-2 border-black max-w-2xl w-full p-12 animate-[slideUp_0.5s_ease-out]">
        <div className="text-center mb-8 pb-8 border-b-2 border-gray-200">
          <div className="w-30 h-30 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            {user?.image ? (
              <img 
                src={user.image} 
                alt={`${user.firstName} ${user.lastName}`}
                className="w-30 h-30 rounded-full object-cover"
              />
            ) : (
              <span className="text-6xl text-white">👤</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            @{user?.username}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-semibold text-black">User ID</span>
            <span className="text-gray-600">{user?.id}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-semibold text-black">Email</span>
            <span className="text-gray-600">{user?.email}</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-semibold text-black">Gender</span>
            <span className="text-gray-600 capitalize">{user?.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
