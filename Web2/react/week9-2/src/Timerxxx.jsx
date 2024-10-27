import React, { useState, useEffect } from 'react';


const Timerxxx = () => {
    const [seconds, setSeconds] = useState(0);
    const [isAudible, setIsAudible] = useState(false);
  
    useEffect(() => { 
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);
  
    return <div>
          {seconds} seconds elapsed
           </div>;
  };
  

  export default Timerxxx;