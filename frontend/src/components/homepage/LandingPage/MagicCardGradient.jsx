import React from 'react';
import Card from './Card';

const MagicCardGradient = () => {
  return (
    <div className="container-fluid">
      <div className="row gap-4">
        <div className="col-lg-4 col-md-6">
          <Card title="Magic" />
        </div>
        <div className="col-lg-4 col-md-6">
          <Card title="Card" />
        </div>
        <div className="col-lg-4 col-md-6">
          <Card title="Demo" />
        </div>
      </div>
    </div>
  );
};

export default MagicCardGradient;
