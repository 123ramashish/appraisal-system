// Define the Home component
export default function Home() {
  return (
    // Main container with a gray background that takes up the full height of the screen
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center">
      {/* Main heading for the application */}
      <h1 className="text-4xl font-bold mb-4">ABC Company Appraisal System</h1>
      {/* Subheading describing the purpose of the application */}
      <p className="text-lg mb-6">
        A comprehensive system for managing employee appraisals.
      </p>
      {/* Container for functionalities section with a white background */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Subheading for the functionalities offered by the application */}
        <h2 className="text-2xl mb-2">Functionalities</h2>
        {/* Unordered list of functionalities available for different user roles */}
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Admin:</strong> Create appraisal questions, map
            participants, view all submissions.
          </li>
          <li>
            <strong>Supervisor:</strong> Fill out appraisals for participants,
            view self-appraisals.
          </li>
          <li>
            <strong>Peer:</strong> Fill out appraisals for colleagues, view own
            submissions.
          </li>
          <li>
            <strong>Junior:</strong> Fill out appraisals for supervisors, view
            own submissions.
          </li>
        </ul>
        {/* Subheading for getting started section */}
        <h2 className="text-2xl mb-2">Get Started</h2>
        {/* Container for login buttons for different user roles */}
        <div className="flex flex-col space-y-2">
          {/* Button for Admin login that links to the admin page */}
          <a href="/admin" className="bg-blue-500 text-white p-2 rounded">
            Admin Login
          </a>
          {/* Button for Supervisor login that links to the supervisor page */}
          <a href="/supervisor" className="bg-green-500 text-white p-2 rounded">
            Supervisor Login
          </a>
          {/* Button for Peer login that links to the peer page */}
          <a href="/peer" className="bg-yellow-500 text-white p-2 rounded">
            Peer Login
          </a>
          {/* Button for Junior login that links to the junior page */}
          <a href="/junior" className="bg-red-500 text-white p-2 rounded">
            Junior Login
          </a>
        </div>
      </div>
    </div>
  );
}
