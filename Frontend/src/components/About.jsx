import { Github, Linkedin, Mail, Code, Users, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Us
          </h1>
          <div className="w-24 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A simple blogging platform designed to provide excellent user
            experience and help authors share their thoughts with customized,
            easy-to-use tools.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Built with a focus on providing an intuitive and seamless
              experience for both readers and writers.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Customization
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Authors can personalize their content with our flexible and
              powerful editing tools.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Simplicity
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Clean, straightforward design that lets content shine without
              unnecessary complexity.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Meet the Developer
          </h2>

          <div className="max-w-sm mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/30 transition-all duration-300">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">SW</span>
              </div>

              {/* Name and Role */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Sarvesh Wani
              </h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                Full Stack Developer
              </p>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                Passionate about creating user-friendly web applications and
                helping content creators share their ideas effectively.
              </p>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                <a
                  href="https://github.com/sarveshwani0501"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 group"
                >
                  <Github className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                </a>

                <a
                  href="https://www.linkedin.com/in/sarvesh-wani-205104297/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200 group"
                >
                  <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
