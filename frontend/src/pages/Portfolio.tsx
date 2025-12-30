import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Portfolio from '../components/Portfolio';

const PortfolioPage = () => {
  return (
    <div className="pt-20">
      <Portfolio />
    </div>
  );
};

export default PortfolioPage;