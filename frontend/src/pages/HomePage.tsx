export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white px-0">
      {/* Navbar */}
      <nav className="w-full py-6 px-6 flex justify-between items-center text-sm">
  {/* Logo */}
  <div className="flex items-center gap-2">
    <div className="relative w-5 h-5 rounded-full border border-white">
      <div className="absolute -top-[4px] -right-[4px] w-[6px] h-[6px] bg-white rounded-full" />
    </div>
    <span className="text-white text-lg font-medium">Mun</span>
  </div>

  {/* Links */}
  <div className="flex gap-6 items-center">
    <a href="/home" className="text-white !text-white border-b border-white pb-0.5 hover:text-gray-300">Home</a>
    <a href="/aboutus" className="text-white hover:text-gray-300">About Us</a>
    <a href="/" className="text-white hover:text-gray-300">Back to AI Catalog</a>
  </div>

  {/* Sign in */}
  <a href="/signin" className="text-white border border-white px-4 py-1.5 rounded-md ">Sign in</a>
</nav>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center text-center px-4 mt-12">
        {/* Chain Animation Placeholder */}
        <div className="my-12">
          <div className="w-[260px] h-[260px] relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse">
                <path
                  d="M 50 100 Q 75 75, 100 100 Q 125 125, 150 100"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">AI Catalog</h1>
          <h2 className="text-lg font-semibold mb-3">
            Create your own chat with ai
          </h2>
          <p className="text-sm text-gray-300 mb-1">
            AI Catalog — home of the best neural network solutions
          </p>
          <p className="text-sm text-gray-400">
            We create user-friendly platforms for interacting with AI. Our
            flagship product, AI Catalog, allows users to find, configure, and
            launch neural network chats in one click.
          </p>
          <p className="text-sm text-gray-500 mt-3">
            We believe that artificial intelligence should be accessible to
            everyone — and we make it possible.
          </p>
        </div>
      </main>
    </div>
  );
}