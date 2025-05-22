import React from 'react';
import { useParams } from 'react-router-dom';
import { TreatmentList } from '../components/treatment/TreatmentList';

const Treatment = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Treatment</h1>
        <p className="text-gray-500">View and manage treatment plans</p>
      </div>
      <TreatmentList />
    </div>
  );
};

export default Treatment;