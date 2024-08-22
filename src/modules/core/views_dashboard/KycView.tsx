import React, { useEffect, useState } from 'react';
import {
  createWalletAPI,
  uploadKycDocumentAPI,
} from '../services/apiAuthService';
import { Upload } from 'lucide-react';

function KycView() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleKYCSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('documentType', file.type);

    try {
      const response = await uploadKycDocumentAPI(formData);
      if (response.ok) {
        console.log('KYC document uploaded successfully!');
        // Handle success (e.g., show a success message)
        alert('KYC document uploaded successfully!');
      } else {
        const errorData = await response.json();
        throw new Error(
          'Error uploading KYC document: ' + errorData.message
        );
      }
    } catch (error) {
      alert(`${error}`);
    }
  };

  const handleApplyWallet = async () => {
    try {
      const response = await createWalletAPI();
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      console.log('Wallet created successfully!');
      alert('Wallet created successfully!');
    } catch (error) {
      alert(`${error}`);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="lg:flex gap-5 space-y-5 lg:space-y-0">
      <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-5 shadow-sm rounded-none md:rounded-lg overflow-hidden block">
        <div className="w-full flex justify-center pb-5 border-gray-200 border-b">
          <h1 className="font-semibold text-lg">
            Upload your KYC document
          </h1>
        </div>
        <div className="w-full block overflow-auto">
          <div className="p-2 flex justify-center items-center">
            <p>Upload your KYC documents to verify your identity.</p>
          </div>
          <form onSubmit={handleKYCSubmit} className="space-y-4">
            <div className="justify-center flex items-center overflow-hidden">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx.,.xls,.xlsx.,.mp4,.mov"
                onChange={handleFileChange}
                className="p-2 border border-gray-200 rounded-md text-black dark:text-white dark:bg-gray-800"
                required
              />
            </div>

            {file && (
              <div className="flex text-sm justify-center">
                <p className="mx-2">Type: {file.type}</p>|
                <p className="mx-2">Size: {file.size} bytes</p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="inline-flex p-2 gap-2 align-middle items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                <Upload size={16} />
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-5 shadow-sm rounded-none md:rounded-lg overflow-hidden block">
        <div className="w-full flex justify-center pb-5 border-gray-200 border-b">
          <h1 className="font-semibold text-lg">Apply for wallet</h1>
        </div>
        <div className="w-full block overflow-auto">
          <div className="p-2 flex justify-center items-center">
            <p>
              Once your KYC documents have been approved, apply for a
              wallet with a click of a button.
            </p>
          </div>

          <div className="flex items-center justify-center p-3">
            <button
              onClick={handleApplyWallet}
              className="w-24 inline-flex p-2 gap-2 align-middle items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KycView;
