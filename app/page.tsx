export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome to Your Virtual Pin Map
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create beautiful collages by uploading and arranging your favorite images. 
          Start small and build your perfect pin map collection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for pin items */}
        <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📌</span>
            </div>
            <p className="font-medium">Add Your First Image</p>
            <p className="text-sm">Click the "Add Images" button to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}
