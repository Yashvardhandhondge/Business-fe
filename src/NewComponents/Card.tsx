
import React, { useState } from 'react';

interface CardProps {

  children: React.ReactNode;
  onSave: (value: number) => void;
  value: number;
}

const Card: React.FC<CardProps> = ({  children, onSave, value }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInputValue] = useState<number>(value);

  const handleSave = () => {
    onSave(inputValue);
    setIsOpen(false);
  };

  return (
    <div className="card h-full">
      
      {isOpen && (
        <div className="card-body h-full min-w-[210px]">
          {children}
        </div>
      )}
      {!isOpen && <p>{value}</p>}
    </div>
  );
};

export default Card;
