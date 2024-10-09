// src/components/VideoPlayer.js

import React from 'react';

const VideoPlayer = ({ onVideoEnd }) => {
  return (
    <div className="video-container">
      {/* <h2>Uploaded Video</h2> */}
      <video 
        controls 
        width="600" 
        onEnded={onVideoEnd} 
        autoPlay
        muted // Add muted if you want to autoplay without sound
      >
        <source src="/assets/Asian_paints.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
