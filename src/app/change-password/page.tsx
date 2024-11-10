'use client';
import {FormEventHandler, useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Signup() {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setErrorMessage(null);
    setSuccessMessage(null);

    // Basic client-side validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsLoading(true);

    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({newPassword: password, password: currentPassword}),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message);
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage(data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Change Password</h2>

        {successMessage && (
          <div className="p-2 text-green-700 bg-green-100 border border-green-200 rounded">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="p-2 text-red-700 bg-red-100 border border-red-200 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                ></path>
              </svg>
            ) : null}
            {isLoading ? 'Changing Password...' : 'Change Password'}
          </button>

          <a href="/dashboard">
            <div
              className="w-full mt-4 text-center px-4 py-2 font-semibold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              Back to dashboard
            </div>
          </a>
        </form>
      </div>
    </div>
  );
}
