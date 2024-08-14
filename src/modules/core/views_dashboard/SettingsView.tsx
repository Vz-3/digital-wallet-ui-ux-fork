import React, { useState } from 'react';
import { Bell, Globe, Shield, Accessibility } from 'lucide-react';
import useDarkTheme from '../hooks/useDarkTheme';
import { ESettingsViewStyles } from '../styles/styleIndex';
type SettingsType = {
  notifications: NotificationType;
  language: string;
  twoFactor: boolean;
  isDarkMode: boolean;
};

type NotificationType = {
  email: boolean;
  push: boolean;
  sms: boolean;
};

function SettingsView() {
  const [colorTheme, setTheme] = useDarkTheme();
  const [settings, setSettings] = useState<SettingsType>({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    language: 'en',
    twoFactor: false,
    isDarkMode: colorTheme === 'light' ? true : false,
  });

  const handleNotificationChange = (type: keyof NotificationType) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: {
        ...prevSettings.notifications,
        [type]: !prevSettings.notifications[type],
      },
    }));
  };

  const handleLanguageChange = (
    selectOption: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      language: selectOption.target.value,
    }));
  };

  const handleTwoFactorChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      twoFactor: !prevSettings.twoFactor,
    }));
  };

  const handleDarkModeChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      isDarkMode: !prevSettings.isDarkMode,
    }));
    setTheme(colorTheme);
  };

  return (
    <div className={ESettingsViewStyles.CONTAINER}>
      <div className={ESettingsViewStyles.CARD}>
        <div className={ESettingsViewStyles.HEADER}>
          <h3 className={ESettingsViewStyles.HEADER_TITLE}>
            <Bell className="mr-2" size={20} /> Notification Settings
          </h3>
        </div>
        <div className={ESettingsViewStyles.SECTION}>
          <dl className="sm:divide-y sm:divide-gray-200">
            {Object.entries(settings.notifications).map(
              ([key, value]) => (
                <div key={key} className={ESettingsViewStyles.FIELD}>
                  <dt
                    className={`${ESettingsViewStyles.FIELD_TITLE} capitalize`}
                  >
                    {key} Notifications
                  </dt>
                  <dd className={ESettingsViewStyles.FIELD_CONTENT}>
                    <button
                      onClick={() =>
                        handleNotificationChange(
                          key as keyof NotificationType
                        )
                      }
                      className={`${
                        value
                          ? ESettingsViewStyles.TOGGLE_ON
                          : ESettingsViewStyles.TOGGLE_OFF
                      } ${ESettingsViewStyles.TOGGLE}`}
                    >
                      <span
                        className={`${
                          value
                            ? ESettingsViewStyles.TOGGLE_KNOB_ON
                            : ESettingsViewStyles.TOGGLE_KNOB_OFF
                        } ${ESettingsViewStyles.TOGGLE_KNOB}`}
                      />
                    </button>
                  </dd>
                </div>
              )
            )}
          </dl>
        </div>
      </div>
      <div className={ESettingsViewStyles.CARD}>
        <div className={ESettingsViewStyles.HEADER}>
          <h3 className={ESettingsViewStyles.HEADER_TITLE}>
            <Globe className="mr-2" size={20} /> Language Settings
          </h3>
        </div>
        <div className={ESettingsViewStyles.SECTION}>
          <div className={ESettingsViewStyles.FIELD}>
            <dt className={ESettingsViewStyles.FIELD_TITLE}>
              Language
            </dt>
            <dd className={ESettingsViewStyles.FIELD_CONTENT}>
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className={ESettingsViewStyles.INPUT}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </dd>
          </div>
        </div>
      </div>
      <div className={ESettingsViewStyles.CARD}>
        <div className={ESettingsViewStyles.HEADER}>
          <h3 className={ESettingsViewStyles.HEADER_TITLE}>
            <Shield className="mr-2" size={20} /> Security Settings
          </h3>
        </div>
        <div className={ESettingsViewStyles.SECTION}>
          <div className={ESettingsViewStyles.FIELD}>
            <dt className={ESettingsViewStyles.FIELD_TITLE}>
              Two-Factor Authentication
            </dt>
            <dd className={ESettingsViewStyles.FIELD_CONTENT}>
              <button
                onClick={handleTwoFactorChange}
                className={`${
                  settings.twoFactor
                    ? ESettingsViewStyles.TOGGLE_ON
                    : ESettingsViewStyles.TOGGLE_OFF
                } ${ESettingsViewStyles.TOGGLE}`}
              >
                <span
                  className={`${
                    settings.twoFactor
                      ? ESettingsViewStyles.TOGGLE_KNOB_ON
                      : ESettingsViewStyles.TOGGLE_KNOB_OFF
                  } ${ESettingsViewStyles.TOGGLE_KNOB}`}
                />
              </button>
            </dd>
          </div>
        </div>
      </div>
      <div className={ESettingsViewStyles.CARD}>
        <div className={ESettingsViewStyles.HEADER}>
          <h3 className={ESettingsViewStyles.HEADER_TITLE}>
            <Accessibility className="mr-2" size={20} /> Preferences
          </h3>
        </div>
        <div className={ESettingsViewStyles.SECTION}>
          <div className={ESettingsViewStyles.FIELD}>
            <dt className={ESettingsViewStyles.FIELD_TITLE}>
              Enable Dark Mode
            </dt>
            <dd className={ESettingsViewStyles.FIELD_CONTENT}>
              <button
                onClick={handleDarkModeChange}
                className={`${
                  settings.isDarkMode
                    ? ESettingsViewStyles.TOGGLE_ON
                    : ESettingsViewStyles.TOGGLE_OFF
                } ${ESettingsViewStyles.TOGGLE}`}
              >
                <span
                  className={`${
                    settings.isDarkMode
                      ? ESettingsViewStyles.TOGGLE_KNOB_ON
                      : ESettingsViewStyles.TOGGLE_KNOB_OFF
                  } ${ESettingsViewStyles.TOGGLE_KNOB}`}
                />
              </button>
            </dd>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => alert('Settings saved!')}
          className={ESettingsViewStyles.BUTTON}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default SettingsView;
