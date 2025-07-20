'use client';

import React, { useState, useRef, useEffect } from 'react';

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [pins, setPins] = useState([]);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const svgRef = useRef(null);

  const handleCountryClick = (countryId, countryName) => {
    setSelectedCountry({ id: countryId, name: countryName });
  };

  const handleSvgClick = (event) => {
    if (event.target === svgRef.current) {
      setSelectedCountry(null);
    }
  };

  const addPin = (event, regionId, regionName) => {
    event.stopPropagation();
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    
    const newPin = {
      id: Date.now(),
      x,
      y,
      regionId,
      title: `Pin in ${regionName || selectedCountry?.name || 'Unknown'}`
    };
    
    setPins([...pins, newPin]);
  };

  const removePin = (pinId) => {
    setPins(pins.filter(p => p.id !== pinId));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setSelectedCountry(null);
      } else if (e.key === 'c' && e.ctrlKey) {
        setPins([]);
        e.preventDefault();
      } else if (e.key === 's' && e.ctrlKey) {
        setShowStats(!showStats);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showStats]);

  // Handle country selection highlighting
  useEffect(() => {
    if (svgRef.current && svgRef.current.svgDoc) {
      const svgDoc = svgRef.current.svgDoc;
      const countries = svgDoc.querySelectorAll('path.landxx, g.landxx');
      
      countries.forEach(element => {
        const elementId = element.getAttribute('id');
        const elementClasses = element.getAttribute('class') || '';
        const countryMatch = elementClasses.match(/\b([a-z]{2,3})\b/g);
        const excludeClasses = ['landxx', 'coastxx', 'eu', 'eaeu', 'limitxx', 'antxx'];
        const countryCode = countryMatch?.find(code => !excludeClasses.includes(code)) || elementId;
        
        // Reset to original style
        if (element.tagName === 'g') {
          const childPaths = element.querySelectorAll('path');
          childPaths.forEach(path => {
            path.style.fill = path.dataset.originalFill || '';
          });
        } else {
          element.style.fill = element.dataset.originalFill || '';
        }
        
        // Apply selection style
        if (selectedCountry?.id === countryCode) {
          if (element.tagName === 'g') {
            const childPaths = element.querySelectorAll('path');
            childPaths.forEach(path => {
              path.style.fill = '#4CAF50';
            });
          } else {
            element.style.fill = '#4CAF50';
          }
        }
      });
    }
  }, [selectedCountry]);

  // Pin statistics
  const getRegionStats = () => {
    const regionCounts = {};
    pins.forEach(pin => {
      const region = pin.title.split(' in ')[1] || 'Unknown';
      regionCounts[region] = (regionCounts[region] || 0) + 1;
    });
    return regionCounts;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">

      {/* Statistics Panel */}
      {showStats && pins.length > 0 && (
        <div className="p-4 bg-white border-b shadow-sm">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Pin Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(getRegionStats()).map(([region, count]) => (
              <div key={region} className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-gray-700">{region}</div>
                <div className="text-2xl font-bold text-green-600">{count}</div>
                <div className="text-xs text-gray-500">{count === 1 ? 'pin' : 'pins'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-xl shadow-lg p-4 border">
          <div className="relative">
            {/* Load the comprehensive SVG world map */}
            <object 
              ref={svgRef}
              data="/world-map.svg"
              type="image/svg+xml"
              className="w-full h-auto cursor-pointer border rounded-lg"
              onClick={handleSvgClick}
              onLoad={(e) => {
                const svgDoc = e.target.contentDocument;
                if (svgDoc) {
                  // Store reference to SVG document for later use
                  svgRef.current.svgDoc = svgDoc;
                  
                  // Select all interactive elements - paths and groups with country classes
                  const countries = svgDoc.querySelectorAll('path.landxx, g.landxx');
                  
                  countries.forEach(element => {
                    // Extract country code from ID or class
                    const elementId = element.getAttribute('id');
                    const elementClasses = element.getAttribute('class') || '';
                    
                    // Get country code from classes (look for 2-3 letter country codes)
                    const countryMatch = elementClasses.match(/\b([a-z]{2,3})\b/g);
                    let countryCode = null;
                    let countryName = null;
                    
                    if (countryMatch) {
                      // Filter out common class names that aren't country codes
                      const excludeClasses = ['landxx', 'coastxx', 'eu', 'eaeu', 'limitxx', 'antxx'];
                      countryCode = countryMatch.find(code => !excludeClasses.includes(code));
                    }
                    
                    // Get the title element for country name
                    const titleElement = element.querySelector('title');
                    if (titleElement) {
                      countryName = titleElement.textContent.trim();
                    } else {
                      // Fallback to ID-based names for specific regions
                      if (elementId) {
                        const idNames = {
                          'us': 'United States',
                          'ca': 'Canada',
                          'mx': 'Mexico',
                          'br': 'Brazil',
                          'ar': 'Argentina',
                          'ru': 'Russia',
                          'cn': 'China',
                          'in': 'India',
                          'au': 'Australia',
                          'za': 'South Africa',
                          'gb': 'United Kingdom',
                          'fr': 'France',
                          'de': 'Germany',
                          'it': 'Italy',
                          'es': 'Spain',
                          'jp': 'Japan'
                        };
                        countryName = idNames[elementId] || elementId.toUpperCase();
                      }
                    }
                    
                    if (!countryCode) countryCode = elementId;
                    if (!countryName) countryName = countryCode ? countryCode.toUpperCase() : 'Unknown Region';
                    
                    // Store original fill for reset
                    element.dataset.originalFill = element.style.fill || '';
                    
                    // Add event listeners
                    element.addEventListener('mouseenter', () => setHoveredRegion(countryName));
                    element.addEventListener('mouseleave', () => setHoveredRegion(null));
                    element.addEventListener('click', (event) => {
                      event.stopPropagation();
                      handleCountryClick(countryCode, countryName);
                      if (selectedCountry?.id === countryCode) {
                        addPin(event, countryCode, countryName);
                      }
                    });
                  });
                }
              }}
            />
            
            {/* Render pins overlay */}
            <svg
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              viewBox="0 0 2754 1398"
              style={{ zIndex: 10 }}
            >
              <defs>
                <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.4"/>
                </filter>
              </defs>
              
              {pins.map((pin) => (
                <g key={pin.id} className="pointer-events-auto">
                  <circle
                    cx={(pin.x / 100) * 2754}
                    cy={(pin.y / 100) * 1398}
                    r="12"
                    fill="#FF4444"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="cursor-pointer hover:r-14 transition-all duration-200"
                    filter="url(#pinShadow)"
                    onClick={() => removePin(pin.id)}
                  />
                  <circle
                    cx={(pin.x / 100) * 2754}
                    cy={(pin.y / 100) * 1398}
                    r="6"
                    fill="#FFFFFF"
                    className="pointer-events-none"
                  />
                  <text
                    x={(pin.x / 100) * 2754}
                    y={(pin.y / 100) * 1398 - 18}
                    fontSize="16"
                    fill="#333"
                    textAnchor="middle"
                    className="pointer-events-none font-semibold"
                    filter="url(#pinShadow)"
                  >
                    📍
                  </text>
                </g>
              ))}
              
              {/* Legend */}
              <g className="pointer-events-none">
                <rect x="50" y="1200" width="400" height="150" fill="rgba(255,255,255,0.95)" stroke="#ccc" strokeWidth="2" rx="10"/>
                <text x="70" y="1230" fontSize="24" fill="#333" fontWeight="bold">Virtual Pin Map</text>
                <text x="70" y="1260" fontSize="18" fill="#666">• Click countries to select</text>
                <text x="70" y="1285" fontSize="18" fill="#666">• Click selected areas to pin</text>
                <text x="70" y="1310" fontSize="18" fill="#666">• Click pins to remove</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Pin List with enhanced styling */}
      {pins.length > 0 && (
        <div className="p-6 bg-white border-t shadow-inner">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Your Pins ({pins.length})</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {pins.map((pin, index) => (
              <div key={pin.id} className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📍</span>
                      <span className="font-semibold text-gray-800 text-sm">Pin #{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm font-medium">{pin.title}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Coordinates: ({pin.x.toFixed(1)}%, {pin.y.toFixed(1)}%)
                    </p>
                  </div>
                  <button
                    onClick={() => removePin(pin.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200 ml-2"
                    title="Remove pin"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Empty state when no pins */}
      {pins.length === 0 && (
        <div className="p-6 bg-gray-50 border-t text-center">
          <div className="text-gray-400 text-4xl mb-2">🗺️</div>
          <p className="text-gray-600 font-medium">No pins placed yet</p>
          <p className="text-gray-500 text-sm mt-1">Select a country or state and click on it to place your first pin!</p>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
