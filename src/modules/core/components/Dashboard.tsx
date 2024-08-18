import React, { useState } from 'react';
import {
  Home,
  CreditCard,
  DollarSign,
  Bell,
  User,
  Settings,
  WalletMinimal,
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

interface IDashboardProps {
  onLogout: () => void;
}

interface ISidebarLink {
  icon: JSX.Element;
  label: string;
  key: string;
}

function Dashboard({ onLogout }: IDashboardProps) {
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

  const hiddenMobileRoutes = ['home', 'notifications', 'profile'];

  const bottombarLinks: ISidebarLink[] = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <Bell />, label: 'Notifications', key: 'notifications' },
    { icon: <User />, label: 'Profile', key: 'profile' },
  ];

  const handleViewChange = (key: string) => {
    setActiveView(key);
    navigate(key);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 ">
      {/* Sidebar */}
      <div className="h-screen w-16 md:w-56  bg-amber-50 dark:bg-neutral-700">
        <div className="p-4 flex ">
          <WalletMinimal
            size={32}
            className="md:mr-1 text-amber-400"
          />
          <h1 className="hidden md:block ml-2 text-2xl font-bold text-amber-500">
            Cgash
          </h1>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              className={`${
                hiddenMobileRoutes.includes(link.key)
                  ? 'hidden md:flex'
                  : 'block'
              }
                ${
                  activeView === link.key
                    ? 'text-amber-500 font-bold md:bg-neutral-700 md:dark:bg-white transition ease-in-out delay-150'
                    : 'text-neutral-950 dark:text-neutral-200 md:hover:bg-neutral-200 md:dark:hover:bg-neutral-500'
                } p-4 w-full flex items-center justify-center md:justify-normal`}
              onClick={() => handleViewChange(link.key)}
            >
              <div
                className={`sidebar-icon 
                    ${
                      activeView === link.key
                        ? 'sidebar-icon-active shadow-xl md:shadow-none transition ease-in-out delay-100'
                        : 'sidebar-icon-inactive transition ease-in-out delay-100'
                    }
                    `}
              >
                {React.cloneElement(link.icon, {
                  size: 24,
                  className: `${
                    activeView === link.key
                      ? 'text-black md:text-neutral-300 md:dark:text-neutral-600'
                      : 'text-neutral-500 md:text-neutral-600 md:dark:text-neutral-300'
                  }`,
                })}
              </div>
              <div className="hidden md:block">{link.label}</div>
            </button>
          ))}
        </nav>
      </div>
      {/* Bottombar */}
      <div className="fixed inline-block w-full h-14 bottom-0 z-10 bg-[#6e5951] dark:bg-[#252525] md:hidden">
        <nav className="m-4">
          {bottombarLinks.map((link) => (
            <button
              key={link.key}
              className="p-1 w-1/3 inline-flex items-center justify-center"
              onClick={() => handleViewChange(link.key)}
            >
              <div className="">
                {React.cloneElement(link.icon, {
                  size: 24,
                  className: `${
                    activeView === link.key
                      ? 'text-amber-300 dark:text-amber-200'
                      : 'text-amber-100 dark:text-gray-100'
                  }`,
                })}
              </div>
            </button>
          ))}
        </nav>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-10 md:pb-0">
        <header className="bg-white shadow-sm dark:bg-zinc-800">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 dark:text-white">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {activeView.charAt(0).toUpperCase() +
                activeView.slice(1)}
            </h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:text-white">
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
            <Route
              path="profile"
              element={<ProfileView onLogout={onLogout} />}
            />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
