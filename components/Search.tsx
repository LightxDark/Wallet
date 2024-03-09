'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchWallet = () => {
  const regex = /^0x[a-fA-F0-9]{40}$/;
  const [inputText, setInputText] = useState('');
  const [showContent, setShowContent] = useState(false); // State to manage content visibility
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (regex.test(inputText)) {
      // Save inputText to local storage
      localStorage.setItem('inputText', inputText);

      // Navigate to the '/wallet/' route
      router.push('/wallet/'+ inputText);
      window.location.href = `/wallet/${inputText}`;

      // Set showContent to true when condition is met
      setShowContent(true);
    } else {
      alert('Invalid Ethereum Address');
      // Hide content if condition is not met
      setShowContent(false);
    }
  };


  return (
    <div className='absolute pt-1 flex-col'>
      <form onSubmit={handleSubmit} autoFocus={true}>
        <svg className="absolute mt-4 p-2" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="2em" width="2.5em" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path fill="none"></path>
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.281-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"></path>
          </g>
        </svg>
        <input
          className='mt-2 pl-12 w-96 transition-all duration-100 delay-100 p-2 rounded-3xl border-gray-500 border-4 bg-inherit hover:rounded-none'
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            // Update showContent based on the regex test
            setShowContent(regex.test(e.target.value));
          }}
        />
        {/* Conditionally render the section based on showContent state */}
        {showContent && (
          <div className='relative select-none px-48'>
            ✔
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchWallet;