import React from 'react';

const DistroSea: React.FC = () => {
  const url = "/distrosea-proxy/";

  return (
    <div className="w-full h-full bg-black flex flex-col overflow-hidden">
      <iframe 
        src={url}
        className="w-full h-full border-none"
        title="DistroSea Real Site"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
};

export default DistroSea;
