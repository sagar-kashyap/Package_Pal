
import React from 'react';
import { PackageSuggestion } from '../types';

interface PackageResultCardProps {
  packageInfo: PackageSuggestion;
  index: number;
}

const PackageResultCard: React.FC<PackageResultCardProps> = ({ packageInfo, index }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl hover:shadow-sky-500/30 transition-shadow duration-300 ease-in-out">
      <div className="flex items-center mb-3">
        <span className="bg-sky-500 text-slate-900 text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full mr-3">{index + 1}</span>
        <h3 className="text-xl font-semibold text-sky-400">{packageInfo.name}</h3>
      </div>
      <p className="text-slate-300 text-sm">{packageInfo.description}</p>
    </div>
  );
};

export default PackageResultCard;
    