import React, { useState } from 'react';
import { CreditCard, QrCode, X } from 'lucide-react';
import { EStorePurchaseStyles } from '../styles/styleIndex';
import { generateQRCodeAPI } from '../services/apiAuthService';

type StoreType = {
  id: number;
  name: string;
  distance: string;
};

type ItemType = {
  id: number;
  name: string;
  price: number;
};

enum EScanningMode {
  STORE = 'store',
  ITEM = 'item',
}

interface IStorePurchaseProps {
  onScan: (qrCode: string) => void;
}

const StorePurchase = () => {
  const [scanningMode, setScanningMode] =
    useState<EScanningMode | null>(null); // 'store' or 'item'
  const [selectedStore, setSelectedStore] =
    useState<StoreType | null>(null);
  const [cart, setCart] = useState<ItemType[]>([]);
  const [total, setTotal] = useState(0);

  // For QR-Code
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);

  const fooBarMessage =
    "(In a real app, this would use the device's camera)";

  // Simulated database of QR codes
  const qrCodes: Record<string, StoreType | ItemType> = {
    store123: { id: 1, name: 'Grocery Store', distance: '0.5 miles' },
    store456: {
      id: 2,
      name: 'Electronics Shop',
      distance: '1.2 miles',
    },
    item789: { id: 1, name: 'Milk', price: 3.99 },
    itemABC: { id: 2, name: 'Bread', price: 2.49 },
  };

  const startScanning = (mode: EScanningMode | null) => {
    setScanningMode(mode);
  };

  const handleScan = (qrCode: string) => {
    const qrCodeData = qrCodes[qrCode];
    if (qrCodeData) {
      if (
        scanningMode === EScanningMode.STORE &&
        'distance' in qrCodeData
      ) {
        setSelectedStore(qrCodeData);
        setScanningMode(null);
      } else if (
        scanningMode === EScanningMode.ITEM &&
        'price' in qrCodeData
      ) {
        addToCart(qrCodeData);
        setScanningMode(null);
      } else {
        alert('Invalid QR code');
      }
    } else {
      alert('QR code not found');
    }
  };

  const handleGenerateQr = async () => {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0');
      }

      const response = await generateQRCodeAPI(amount);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setQrCodeDataURL(data.qrCodeDataURL);
      setPaymentId(data.paymentId);
    } catch (error) {
      alert(`${error}`);
    }
  };

  const addToCart = (item: ItemType) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (item: ItemType) => {
    const newCart = cart.filter((i) => i.id !== item.id);
    setCart(newCart);
    setTotal(total - item.price);
  };

  const processPayment = () => {
    // In a real app, this would integrate with a payment gateway
    alert(`Payment of $${total.toFixed(2)} processed successfully!`);
    setCart([]); // reset
    setTotal(0);
    setSelectedStore(null);
  };

  // Simulated QR code scanner
  const QRScanner = ({ onScan }: IStorePurchaseProps) => (
    <div className={EStorePurchaseStyles.QR_SCANNER}>
      <p className="mb-2">Scanning QR Code...</p>
      <input
        type="text"
        placeholder="Enter QR code"
        className={EStorePurchaseStyles.QR_INPUT}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            onScan(event.currentTarget.value);
            event.currentTarget.value = '';
          }
        }}
      />
      <p className={EStorePurchaseStyles.QR_MESSAGE}>
        {fooBarMessage}
      </p>
    </div>
  );

  return (
    <div>
      <div className={EStorePurchaseStyles.CONTAINER}>
        {!selectedStore ? (
          <div className={EStorePurchaseStyles.SECTION}>
            <div className={EStorePurchaseStyles.SECTION_HEADER}>
              <h3 className={EStorePurchaseStyles.SECTION_TITLE}>
                Select a Store
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              {scanningMode === EScanningMode.STORE ? (
                <QRScanner onScan={handleScan} />
              ) : (
                <button
                  onClick={() => startScanning(EScanningMode.STORE)}
                  className={`${EStorePurchaseStyles.BUTTON} ${EStorePurchaseStyles.BUTTON_SCAN_STORE}`}
                >
                  <QrCode size={18} className="mr-2" />
                  Scan Store QR Code
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={EStorePurchaseStyles.SECTION}>
            <div className={EStorePurchaseStyles.SECTION_HEADER}>
              <h3 className={EStorePurchaseStyles.SECTION_TITLE}>
                {selectedStore.name}
              </h3>
              <p className={EStorePurchaseStyles.SECTION_SUBTITLE}>
                {selectedStore.distance}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <div className="p-1">
                  <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Scan Items
                  </h4>
                  {scanningMode === EScanningMode.ITEM ? (
                    <QRScanner onScan={handleScan} />
                  ) : (
                    <button
                      onClick={() =>
                        startScanning(EScanningMode.ITEM)
                      }
                      className={`${EStorePurchaseStyles.BUTTON} ${EStorePurchaseStyles.BUTTON_SCAN_ITEM}`}
                    >
                      <QrCode size={18} className="mr-2" />
                      Scan Item QR Code
                    </button>
                  )}
                </div>
                <div className="p-1">
                  <h4 className="mt-1 text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Your Cart
                  </h4>
                  <ul className="divide-y divide-gray-200">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className={EStorePurchaseStyles.CART_ITEM}
                      >
                        <div
                          className={
                            EStorePurchaseStyles.CART_ITEM_CONTENT
                          }
                        >
                          <p
                            className={
                              EStorePurchaseStyles.CART_ITEM_TEXT
                            }
                          >
                            {item.name} - ${item.price.toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item)}
                            className={
                              EStorePurchaseStyles.CART_REMOVE_BUTTON
                            }
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <p className={EStorePurchaseStyles.TOTAL_TEXT}>
                      Total: ${total.toFixed(2)}
                    </p>
                    <button
                      onClick={processPayment}
                      className={EStorePurchaseStyles.PAY_BUTTON}
                    >
                      <CreditCard size={18} className="mr-2" />
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-white shadow mt-5 pb-4 overflow-hidden sm:rounded-lg dark:bg-gray-800 dark:shadow-none">
        <div className={EStorePurchaseStyles.SECTION_HEADER}>
          <h3 className={EStorePurchaseStyles.SECTION_TITLE}>
            Generate QR Code
          </h3>
        </div>
        <div className="flex w-full items-center justify-center border-t border-gray-200 px-4 py-5 sm:p-6">
          <input
            type="number"
            placeholder="Enter amount"
            className={`mt-1 w-1/4 bg-blue-100 p-1 text-black focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md`}
            onChange={({ target }) => setAmount(Number(target.value))}
            required
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="btn-template text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus:ring-indigo-400"
            onClick={handleGenerateQr}
          >
            Generate qr
          </button>
        </div>

        <div
          className={`${
            qrCodeDataURL === '' ? 'hidden' : 'visible'
          } `}
        >
          <div className="flex w-full justify-center items-center p-2">
            <img src={qrCodeDataURL} alt="QR Code" />
          </div>
          <p className="flex justify-center items-center content-center">
            Amount: {amount}
          </p>
          <p className="flex justify-center items-center content-center">
            Payment ID: {paymentId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorePurchase;
