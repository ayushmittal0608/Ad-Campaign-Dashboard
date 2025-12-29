export default function Loading() {
  return (
    <div className="min-h-screen bg-white text-white p-6">
   
      <div className="h-12 w-full rounded-xl bg-white-800 animate-pulse mb-6" />

      <div className="flex gap-6">
        
        <div className="hidden md:block w-64 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-lg bg-gray-800 animate-pulse"
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl bg-gray-800 animate-pulse"
              />
            ))}
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-72 rounded-2xl bg-gray-800 animate-pulse" />
            <div className="h-72 rounded-2xl bg-gray-800 animate-pulse" />
          </div>

          
          <div className="h-80 rounded-2xl bg-gray-800 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
