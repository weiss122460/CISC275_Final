import React from 'react'
import './loading.css'

    const Loading = () => {
      return (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      );
    };

    export default Loading;