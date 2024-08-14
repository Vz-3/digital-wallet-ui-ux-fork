import React, { useState } from 'react';
import { CreditCard, QrCode, X } from 'lucide-react';
import { EStorePurchaseStyles } from '../styles/styleIndex';

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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">
                  Scan Items
                </h4>
                {scanningMode === EScanningMode.ITEM ? (
                  <QRScanner onScan={handleScan} />
                ) : (
                  <button
                    onClick={() => startScanning(EScanningMode.ITEM)}
                    className={`${EStorePurchaseStyles.BUTTON} ${EStorePurchaseStyles.BUTTON_SCAN_ITEM}`}
                  >
                    <QrCode size={18} className="mr-2" />
                    Scan Item QR Code
                  </button>
                )}
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">
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
  );
};

export default StorePurchase;
