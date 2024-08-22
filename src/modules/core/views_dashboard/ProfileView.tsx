import React, { useEffect, useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { EProfileViewStyles } from '../styles/styleIndex';
import { LogOut } from 'lucide-react';
import { getProfile } from '../services/apiAuthService';

type EProfile = {
  name: string;
  email: string;
  phone: string;
};

interface IProfileViewProps {
  onLogout: () => void;
}

function ProfileView({ onLogout }: IProfileViewProps) {
  const [profile, setProfile] = useState<EProfile>({
    name: '',
    email: '',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically make an API call to update the user's profile
    alert('Profile updated successfully!');
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const fetchProfile = async () => {
    try {
      const profileData = await getProfile();
      setProfile({
        name: profileData.firstName + ' ' + profileData.lastName,
        email: profileData.email,
        phone: profile.phone,
      });
    } catch (error) {
      alert('Error fetching profile data!' + error);
    }
  };

  useEffect(() => {
    try {
      fetchProfile();
    } catch (error) {
      alert('Error fetching profile data!' + error);
    }
  }, []);

  return (
    <div className={EProfileViewStyles.CONTAINER}>
      <div className={EProfileViewStyles.HEADER}>
        <h3 className={EProfileViewStyles.HEADER_TITLE}>
          User Profile
        </h3>
      </div>
      <div className={EProfileViewStyles.SECTION}>
        <dl>
          <div className={EProfileViewStyles.FIELD}>
            <dt className={EProfileViewStyles.FIELD_TITLE}>
              <User className="mr-2" size={18} /> Full name
            </dt>
            <dd className={EProfileViewStyles.FIELD_CONTENT}>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className={EProfileViewStyles.INPUT}
                />
              ) : (
                profile.name
              )}
            </dd>
          </div>
          <div className={EProfileViewStyles.FIELD}>
            <dt className={EProfileViewStyles.FIELD_TITLE}>
              <Mail className="mr-2" size={18} /> Email address
            </dt>
            <dd className={EProfileViewStyles.FIELD_CONTENT}>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className={EProfileViewStyles.INPUT}
                />
              ) : (
                profile.email
              )}
            </dd>
          </div>
          <div className={EProfileViewStyles.FIELD}>
            <dt className={EProfileViewStyles.FIELD_TITLE}>
              <Phone className="mr-2" size={18} /> Phone number
            </dt>
            <dd className={EProfileViewStyles.FIELD_CONTENT}>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={EProfileViewStyles.INPUT}
                />
              ) : (
                profile.phone
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="w-full justify-end gap-2 px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-gray-800 inline-flex">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="btn-template text-white bg-green-600 hover:bg-green-700 focus:ring-green-500"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="btn-template text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          >
            Edit
          </button>
        )}
        <button
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:ring-red-400"
          onClick={onLogout}
        >
          <LogOut className="mr-2" size={18} />
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
