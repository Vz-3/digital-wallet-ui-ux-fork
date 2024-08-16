import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { EProfileViewStyles } from '../styles/styleIndex';

type EProfile = {
  name: string;
  email: string;
  phone: string;
};

function ProfileView() {
  const [profile, setProfile] = useState<EProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
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
      <div className={EProfileViewStyles.FOOTER}>
        {isEditing ? (
          <button
            onClick={handleSave}
            className={EProfileViewStyles.BUTTON}
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className={EProfileViewStyles.BUTTON}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
