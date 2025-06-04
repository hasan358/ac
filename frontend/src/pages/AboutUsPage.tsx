export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center text-sm mb-12">
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5 rounded-full border border-white">
            <div className="absolute -top-[4px] -right-[4px] w-[6px] h-[6px] bg-white rounded-full" />
          </div>
          <span className="text-white text-lg font-medium">Mun</span>
        </div>

        <div className="flex gap-6 items-center">
           <a href="/home" className="text-white !text-white hover:text-gray-300">Home</a>
           <a href="/aboutus" className="text-white border-b border-white pb-0.5 hover:text-gray-300">About Us</a>
           <a href="/" className="text-white hover:text-gray-300">Back to AI Catalog</a>
        </div>

        <a href="/signin" className="text-white border border-white px-4 py-1.5 rounded-md ">Sign in</a>
      </nav>

      {/* Структура в столбик */}
      <main className="max-w-3xl mx-auto text-center">
        {/* Слоган */}
        <h1 className="text-3xl font-bold mb-4 leading-snug">
          Be the center of your life,<br />not the life satellite of others.
        </h1>

        {/* Один параграф */}
        <p className="text-sm text-gray-300 mb-30">
          We want to leave an unforgettable mark in the history of mankind by creating artificial intelligence-based tools that simplify the lives of people and businesses.
        </p>

        {/* Визуальный логотип */}
        <div className="relative w-[300px] h-[300px] border-2 border-white rounded-full mx-auto mb-30">
          <div className="absolute -top-6 -right-6 w-10 h-10 bg-white rounded-full shadow-lg shadow-white/30" />
        </div>

          <p className="text-sm text-gray-400 mb-6">
            Our mission is to make interaction with AI as simple, understandable and useful as possible. We are developing a new generation of AI products, starting with the AI Catalog, a platform where everyone can find, configure and run their own AI chat without programming.
          </p>

          <h2 className="text-xl font-semibold mt-12 mb-4">What we do:</h2>
          <ul className="space-y-2 text-sm text-gray-300 mb-12">
            <li>• We develop AI platforms and tools focused on simplicity and accessibility</li>
            <li>• We are creating an ecosystem for developers, startups and ordinary users</li>
            <li>• We innovate in everyday tasks using custom AI solutions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">How to contact us</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Telegram: <a href="#" className="hover:underline">@yourcompany</a><br />
            Email: <a href="mailto:support@yourcompany.com" className="hover:underline">support@yourcompany.com</a><br />
            Instagram: <a href="#" className="hover:underline">yourcompany©</a>
          </p>
      </main>
    </div>
  );
}