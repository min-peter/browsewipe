export default function Home() {
  const features = ['Browser Security', 'Wipe the data out', 'Save people'];

  return (
    <div>
      <header className="text-center mb-10 bg-gradient-to-r from-green-200 to-indigo-500 py-20 rounded-sm text-white">
        <h1 className="text-4xl font-extrabold mb-3">Browsewipe</h1>
        <p className="text-lg">Hello, Welcome! Login to manage your accounts. 🚀</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Get Browsestrike in 3 Easy Steps</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">Install the extension in your browser</li>
          <li className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">Register and log in to your account in the extension</li>
          <li className="bg-white p-3 rounded-lg shadow hover:shadow-md transition">Download and log in to the mobile/web app</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Features ✨</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(feature => (
            <li key={feature} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-xl shadow hover:scale-105 transform transition">
              {feature}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
