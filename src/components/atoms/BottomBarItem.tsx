import Link from 'next/link';
import React from 'react';

interface BottomBarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const BottomBarItem: React.FC<BottomBarItemProps> = ({
  href,
  icon,
  label,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      className='flex flex-col justify-center items-center'
      onClick={onClick}
    >
      {icon}
      <span className={`text-sm ${active ? 'text-primary' : ''}`}>{label}</span>
    </Link>
  );
};

export default BottomBarItem;
