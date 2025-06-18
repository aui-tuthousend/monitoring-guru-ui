import { createFileRoute, Link } from '@tanstack/react-router'
import NerdGirl from '/IMG_9570.jpeg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content - Left Side */}
          <div className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Monitor Guru</span>
                <span className="block text-blue-500">
                  with Real-Time Data
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Monitor Guru is a web-based application that allows you to
                monitor your teachers' activities in real-time. It provides a
                simple and easy-to-use interface to track your teachers'
                attendance, tasks, and grades.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/login-guru"
                  className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="px-6 py-3 text-base font-medium text-blue-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Image - Right Side */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              className="w-full max-w-lg rounded-lg shadow-xl"
              src={NerdGirl}
              alt="Nerd girl using Monitor Guru"
            />
          </div>
        </div>
      </div>
    </div>
  );
}