import React, { useState } from 'react';
import {
  Home,
  CreditCard,
  DollarSign,
  Bell,
  User,
  Settings,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeView from '../views_dashboard/HomeView';
import TransactionsView from '../views_dashboard/TransactionsView';
import NotificationsView from '../views_dashboard/NotificationsView';
import ProfileView from '../views_dashboard/ProfileView';
import SettingsView from '../views_dashboard/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';
import { EDashboardStyles } from '../styles/styleIndex';

interface IDashboardProps {
  onLogout: () => void;
}

interface ISidebarLink {
  icon: JSX.Element;
  label: string;
  key: string;
}

function NDashboard({ onLogout }: IDashboardProps) {
  const [activeView, setActiveView] = useState('home');
  const navigate = useNavigate();

  const sidebarLinks: ISidebarLink[] = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <CreditCard />, label: 'Accounts', key: 'accounts' },
    {
      icon: <DollarSign />,
      label: 'Transactions',
      key: 'transactions',
    },
    {
      icon: <ShoppingBag />,
      label: 'Store Purchase',
      key: 'store-purchase',
    },
    { icon: <Bell />, label: 'Notifications', key: 'notifications' },
    { icon: <User />, label: 'Profile', key: 'profile' },
    { icon: <Settings />, label: 'Settings', key: 'settings' },
  ];

  const handleViewChange = (key: string) => {
    setActiveView(key);
    navigate(key);
  };

  return (
    <div className={EDashboardStyles.MAIN_CONTAINER}>
      {/* Sidebar */}
      <div className={EDashboardStyles.SIDEBAR}>
        <div className="p-4">
          <h1 className={EDashboardStyles.APP_HEADER}>Cgash</h1>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              className={`${EDashboardStyles.SIDEBAR_NAV_ITEM} ${
                activeView === link.key
                  ? EDashboardStyles.SIDEBAR_NAV_ITEM_ACTIVE
                  : EDashboardStyles.SIDEBAR_NAV_ITEM_INACTIVE
              }`}
              onClick={() => handleViewChange(link.key)}
            >
              {React.cloneElement(link.icon, {
                size: 18,
                className: 'mr-2',
              })}
              {link.label}
            </button>
          ))}
        </nav>
        <div className={EDashboardStyles.SIDEBAR_FOOTER}>
          <button
            className={EDashboardStyles.LOGOUT_BUTTON}
            onClick={onLogout}
          >
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className={EDashboardStyles.MAIN_HEADER}>
          <div className={EDashboardStyles.MAIN_HEADER_TITLE}>
            <h1 className={EDashboardStyles.MAIN_ACTIVE_HEADER}>
              {activeView.charAt(0).toUpperCase() +
                activeView.slice(1)}
            </h1>
          </div>
        </header>
        <main className={EDashboardStyles.MAIN_CONTENT_WRAPPER}>
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="home" element={<HomeView />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route
              path="transactions"
              element={<TransactionsView />}
            />
            <Route
              path="store-purchase"
              element={<StorePurchase />}
            />
            <Route
              path="notifications"
              element={<NotificationsView />}
            />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default NDashboard;
