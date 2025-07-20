'use client'

import { useState, useRef, useEffect } from 'react'

interface Country {
  id: string
  name: string
  path: string
}

interface USState {
  id: string
  name: string
  path: string
}

interface Pin {
  id: number
  x: number
  y: number
  regionId: string
  title: string
}

export default function WorldMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [pins, setPins] = useState<Pin[]>([])
  const [showStats, setShowStats] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Enhanced countries with more realistic paths
  const countries: Country[] = [
    {
      id: 'canada',
      name: 'Canada',
      path: 'M 150,180 L 450,170 L 480,200 L 470,240 L 430,280 L 400,300 L 200,310 L 160,260 L 150,220 Z'
    },
    {
      id: 'mexico',
      name: 'Mexico', 
      path: 'M 175,440 L 285,445 L 340,460 L 335,480 L 300,490 L 180,485 Z'
    },
    {
      id: 'brazil',
      name: 'Brazil',
      path: 'M 370,520 L 450,510 L 480,560 L 470,620 L 420,650 L 380,640 L 350,580 Z'
    },
    {
      id: 'argentina',
      name: 'Argentina',
      path: 'M 330,650 L 380,640 L 370,720 L 350,740 L 330,730 L 320,690 Z'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      path: 'M 480,280 L 495,285 L 500,305 L 485,310 L 475,295 Z'
    },
    {
      id: 'france',
      name: 'France',
      path: 'M 500,320 L 520,325 L 525,345 L 505,350 L 495,335 Z'
    },
    {
      id: 'germany',
      name: 'Germany',
      path: 'M 520,300 L 540,305 L 545,325 L 525,330 L 515,315 Z'
    },
    {
      id: 'spain',
      name: 'Spain',
      path: 'M 475,350 L 510,355 L 515,375 L 480,380 L 470,365 Z'
    },
    {
      id: 'italy',
      name: 'Italy',
      path: 'M 525,340 L 540,345 L 545,370 L 535,385 L 520,380 L 520,355 Z'
    },
    {
      id: 'russia',
      name: 'Russia',
      path: 'M 580,180 L 880,170 L 900,220 L 870,270 L 820,300 L 750,290 L 650,280 L 580,240 Z'
    },
    {
      id: 'china',
      name: 'China',
      path: 'M 720,300 L 820,310 L 850,350 L 830,390 L 780,410 L 720,400 L 700,360 L 710,330 Z'
    },
    {
      id: 'india',
      name: 'India',
      path: 'M 670,380 L 720,390 L 730,430 L 710,470 L 680,460 L 650,440 L 655,400 Z'
    },
    {
      id: 'japan',
      name: 'Japan',
      path: 'M 860,340 L 875,345 L 880,365 L 870,380 L 855,375 L 850,355 Z'
    },
    {
      id: 'australia',
      name: 'Australia',
      path: 'M 780,480 L 880,475 L 920,520 L 900,560 L 850,570 L 780,565 L 770,520 Z'
    },
    {
      id: 'africa',
      name: 'Africa',
      path: 'M 520,380 L 580,375 L 620,420 L 610,500 L 580,540 L 520,545 L 480,510 L 490,450 L 510,400 Z'
    }
  ]

  // Enhanced US States with better paths
  const usStates: USState[] = [
    {
      id: 'california',
      name: 'California',
      path: 'M 160,350 L 180,360 L 185,390 L 175,420 L 165,440 L 155,430 L 150,400 L 155,370 Z'
    },
    {
      id: 'texas',
      name: 'Texas',
      path: 'M 285,385 L 335,395 L 350,420 L 340,450 L 310,460 L 280,445 L 275,415 Z'
    },
    {
      id: 'florida',
      name: 'Florida',
      path: 'M 380,430 L 420,435 L 430,450 L 425,465 L 410,470 L 385,460 L 375,445 Z'
    },
    {
      id: 'newyork',
      name: 'New York',
      path: 'M 375,340 L 395,345 L 400,365 L 385,370 L 370,360 Z'
    },
    {
      id: 'nevada',
      name: 'Nevada',
      path: 'M 185,350 L 210,355 L 215,385 L 190,390 L 185,365 Z'
    },
    {
      id: 'alaska',
      name: 'Alaska',
      path: 'M 65,380 L 120,370 L 140,385 L 135,405 L 115,415 L 85,410 L 70,395 Z'
    },
    {
      id: 'hawaii',
      name: 'Hawaii',
      path: 'M 230,420 C 235,420 240,425 240,430 C 240,435 235,440 230,440 C 225,440 220,435 220,430 C 220,425 225,420 230,420 Z'
    }
  ]

  const handleRegionClick = (regionId: string, regionName: string) => {
    setSelectedRegion(regionId)
    console.log(`Selected: ${regionName}`)
  }

  const addPin = (event: React.MouseEvent<SVGPathElement>, regionId: string, regionName: string) => {
    event.stopPropagation()
    if (!svgRef.current) return
    
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    
    const newPin: Pin = {
      id: Date.now(),
      x,
      y,
      regionId,
      title: `Pin in ${regionName}`
    }
    
    setPins([...pins, newPin])
  }

  const removePin = (pinId: number) => {
    setPins(pins.filter(p => p.id !== pinId))
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedRegion(null)
      } else if (e.key === 'c' && e.ctrlKey) {
        setPins([])
        e.preventDefault()
      } else if (e.key === 's' && e.ctrlKey) {
        setShowStats(!showStats)
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [showStats])

  // Pin statistics
  const getRegionStats = () => {
    const regionCounts: { [key: string]: number } = {}
    pins.forEach(pin => {
      const region = pin.title.split(' in ')[1] || 'Unknown'
      regionCounts[region] = (regionCounts[region] || 0) + 1
    })
    return regionCounts
  }

  const getRegionFill = (regionId: string) => {
    if (selectedRegion === regionId) return '#3b82f6' // blue-500
    if (hoveredRegion === regionId) return '#60a5fa' // blue-400
    return '#e5e7eb' // gray-200
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      <div className="p-6 bg-white shadow-md border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Virtual Pin Map
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Click on any country or US state to select it, then click anywhere on that region to place a pin!
            </p>
            {selectedRegion && (
              <div className="flex items-center gap-2 mt-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Selected:</span>
                <span className="text-blue-900 font-semibold">
                  {countries.find(c => c.id === selectedRegion)?.name || 
                   usStates.find(s => s.id === selectedRegion)?.name}
                </span>
                <span className="text-blue-600 text-sm">(Click on the map to add a pin)</span>
              </div>
            )}
            {hoveredRegion && (
              <div className="text-sm text-gray-500 mt-1">
                Hovering: {countries.find(c => c.id === hoveredRegion)?.name || 
                          usStates.find(s => s.id === hoveredRegion)?.name}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </button>
            {pins.length > 0 && (
              <button
                onClick={() => setPins([])}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium"
              >
                Clear All
              </button>
            )}
          </div>
        </div>
        
        {/* Keyboard shortcuts info */}
        <div className="mt-3 text-xs text-gray-500">
          <span>💡 Shortcuts: ESC (deselect) • Ctrl+C (clear pins) • Ctrl+S (toggle stats)</span>
        </div>
      </div>

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
          <svg
            ref={svgRef}
            viewBox="0 0 1000 500"
            className="w-full h-auto cursor-pointer border rounded-lg"
          >
            {/* Ocean background with gradient */}
            <defs>
              <radialGradient id="oceanGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#87CEEB" stopOpacity={1} />
                <stop offset="100%" stopColor="#4682B4" stopOpacity={1} />
              </radialGradient>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.3"/>
              </filter>
            </defs>
            
            <rect width="1000" height="500" fill="url(#oceanGradient)" />

            {/* World Countries */}
            {countries.map((country) => (
              <path
                key={country.id}
                d={country.path}
                fill={getRegionFill(country.id)}
                stroke="#374151"
                strokeWidth="1"
                className="cursor-pointer transition-colors duration-200 hover:brightness-110"
                filter="url(#shadow)"
                onMouseEnter={() => setHoveredRegion(country.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={(e) => {
                  if (selectedRegion === country.id) {
                    addPin(e, country.id, country.name)
                  } else {
                    handleRegionClick(country.id, country.name)
                  }
                }}
              >
                <title>{country.name}</title>
              </path>
            ))}

            {/* US States */}
            {usStates.map((state) => (
              <path
                key={state.id}
                d={state.path}
                fill={getRegionFill(state.id)}
                stroke="#374151"
                strokeWidth="1"
                className="cursor-pointer transition-colors duration-200 hover:brightness-110"
                filter="url(#shadow)"
                onMouseEnter={() => setHoveredRegion(state.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                onClick={(e) => {
                  if (selectedRegion === state.id) {
                    addPin(e, state.id, state.name)
                  } else {
                    handleRegionClick(state.id, state.name)
                  }
                }}
              >
                <title>{state.name}</title>
              </path>
            ))}

            {/* Render pins */}
            {pins.map((pin) => (
              <g key={pin.id}>
                <circle
                  cx={(pin.x / 100) * 1000}
                  cy={(pin.y / 100) * 500}
                  r="12"
                  fill="#FF4444"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  className="cursor-pointer hover:r-14 transition-all duration-200"
                  filter="url(#shadow)"
                  onClick={() => removePin(pin.id)}
                />
                <circle
                  cx={(pin.x / 100) * 1000}
                  cy={(pin.y / 100) * 500}
                  r="6"
                  fill="#FFFFFF"
                  className="pointer-events-none"
                />
                <text
                  x={(pin.x / 100) * 1000}
                  y={(pin.y / 100) * 500 - 18}
                  fontSize="16"
                  fill="#333"
                  textAnchor="middle"
                  className="pointer-events-none font-semibold"
                  filter="url(#shadow)"
                >
                  📍
                </text>
              </g>
            ))}

            {/* Legend */}
            <g className="pointer-events-none">
              <rect x="20" y="420" width="180" height="70" fill="rgba(255,255,255,0.95)" stroke="#ccc" strokeWidth="1" rx="5"/>
              <text x="30" y="440" fontSize="12" fill="#333" fontWeight="bold">Virtual Pin Map</text>
              <text x="30" y="455" fontSize="10" fill="#666">• Click regions to select</text>
              <text x="30" y="468" fontSize="10" fill="#666">• Click selected areas to pin</text>
              <text x="30" y="481" fontSize="10" fill="#666">• Click pins to remove</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Pin List */}
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
  )
}
