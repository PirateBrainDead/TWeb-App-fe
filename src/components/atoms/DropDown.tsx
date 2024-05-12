'use client';
import ArrowSvg from '@/components/atoms/svg/Arrow';
import React, { useEffect, useState } from 'react';

interface DropdownProps {
  options: string[];
  onOptionClick?: (option: number) => void;
  currentMonth?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onOptionClick,
  currentMonth,
}) => {
  const [selectedValue, setSelectedValue] = useState(currentMonth || 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setSelectedValue(currentMonth || 0);
  }, [currentMonth]);

  const handleOptionClick = (option: any) => {
    setSelectedValue(option);
    onOptionClick && onOptionClick(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className='relative'>
      <div className='cursor-pointer' onClick={toggleDropdown}>
        <div className='bg-[#0090ff33] text-sm py-1 px-2 w-[7rem] rounded-md font-normal capitalize text-primary flex justify-between items-center gap-1'>
          {options[selectedValue]}
          <ArrowSvg rotate={270} height={15} width={15} />
        </div>
      </div>

      {isDropdownOpen && (
        <ul className='absolute z-10 mt-1 py-2 bg-dark font-normal text-[0.74rem] text-primary rounded shadow-md w-[7rem]'>
          {options.map((option, index) => (
            <li
              key={index}
              className='cursor-pointer px-2 py-1 hover:bg-dark-80 capitalize'
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
