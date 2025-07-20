# Virtual Pin Map 🗺️ 📸

A **vibe code project** that transforms your photo memories into an interactive world map experience. Create a visual journey of your travels and experiences by combining location data with your personal photo collection.

## 🎯 Vision

The goal is to create a **Memory Map** - an interactive world visualization that brings your photos to life through geographic storytelling. By extracting EXIF location data from your images, the application will automatically organize and display photo collages based on where they were taken, creating a living map of your memories.

## ✨ Project Concept

### Current Features
- 🌍 **Interactive World Map**: Click to select countries and regions
- 📍 **Pin Placement**: Mark locations of interest with visual pins
- 📊 **Statistics Dashboard**: Track your pinned locations and regional activity
- ⌨️ **Keyboard Shortcuts**: Quick navigation and control
- 🎨 **Beautiful UI**: Clean, modern interface with smooth animations

### Future Vision: Photo Memory Integration
- 📷 **EXIF Data Processing**: Automatically extract GPS coordinates from photo metadata
- 🖼️ **Photo Collages**: Display grouped photos per geographic region
- 🏞️ **Memory Clustering**: Organize photos by location proximity and time
- 🎞️ **Visual Timeline**: Show photo memories chronologically by location
- 🔍 **Smart Filtering**: Filter memories by date ranges, locations, or themes
- 💾 **Memory Preservation**: Store and organize your travel photography collection

## 🌟 The Memory Map Experience

Imagine opening your memory map and seeing:
- **Photo clusters** scattered across continents where you've traveled
- **Visual stories** that unfold as you click on different regions
- **Automatic organization** of thousands of photos by their geographic footprint
- **Interactive exploration** of your personal journey through life

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS for responsive, beautiful design
- **Map Visualization**: Custom SVG world map with interactive regions
- **Image Processing**: Future integration with EXIF.js for metadata extraction
- **State Management**: React hooks for smooth user interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PinMap
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start exploring!

## 🎮 How to Use

### Current Functionality
- **Select Regions**: Click on any country or region to highlight it
- **Place Pins**: Click on selected areas to place memory pins
- **View Statistics**: Use `Ctrl+S` to toggle the statistics panel
- **Clear Pins**: Use `Ctrl+C` to clear all pins, or click individual pins to remove them
- **Deselect**: Press `ESC` to deselect the current region

### Keyboard Shortcuts
- `ESC` - Deselect current region
- `Ctrl+C` - Clear all pins
- `Ctrl+S` - Toggle statistics panel

## 🗺️ Map Data

The world map is powered by a comprehensive SVG with detailed country boundaries and accurate geographic representations. Map source: [SVG World Map with Labels](https://ahuseyn.github.io/SVG-World-Map-with-labels/)

## 🎨 Project Philosophy

This is a **vibe code project** - built with passion for:
- 🌍 **Geographic storytelling** through personal memories
- 📸 **Visual preservation** of life experiences  
- 🎯 **Intuitive interaction** with meaningful data
- ✨ **Beautiful design** that enhances the emotional connection to memories

## 🔮 Future Roadmap

### Phase 1: Photo Integration
- [ ] EXIF GPS data extraction
- [ ] Photo upload and processing
- [ ] Basic photo-to-location mapping

### Phase 2: Memory Visualization
- [ ] Photo collage generation per region
- [ ] Timeline integration
- [ ] Memory clustering algorithms

### Phase 3: Advanced Features
- [ ] Photo sharing capabilities
- [ ] Export/import memory collections
- [ ] Advanced filtering and search
- [ ] Mobile responsiveness improvements

### Phase 4: Community Features
- [ ] Shared memory maps
- [ ] Collaborative travel planning
- [ ] Memory map templates

## 🤝 Contributing

This is a personal vibe project, but contributions that align with the vision are welcome! Feel free to:
- Report bugs or suggest improvements
- Propose new features for the memory map concept
- Contribute to the photo processing pipeline
- Enhance the visual design and user experience

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 💫 Inspiration

Created for anyone who believes that:
> Every photo tells a story, and every location holds a memory. The world is not just a map - it's a canvas of our experiences waiting to be explored and remembered.

---

**Happy memory mapping!** 🌍✨

*Start placing your pins today, and tomorrow add your photos to bring those locations to life.*
