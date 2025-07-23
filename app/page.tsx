"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/lib/auth";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo with subtle animation */}
          {/* <div className="mb-8 animate-pulse">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2H9V5z"
                />
              </svg>
            </div>
          </div> */}

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
            Task Manager
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
            A Task Management App that keeps things simple. Stay focused on what
            matters—no clutter, no distractions.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-5xl">
            {[
              {
                icon: "📝",
                title: "Simple task creation",
                desc: "Add tasks quickly without jumping through hoops",
              },
              {
                icon: "⏰",
                title: "See what's due",
                desc: "Your deadlines, laid out clearly so nothing slips by",
              },
              {
                icon: "📱",
                title: "Works everywhere",
                desc: "Check your tasks on your phone, laptop, wherever",
              },
              {
                icon: "✅",
                title: "Actually get things done",
                desc: "Less time organizing, more time finishing what you started",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/20">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/signin"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Sign In
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/signup"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
              Sign Up
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Link>
          </div>

          {/* Social Proof / Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">2,847</div>
              <div className="text-sm text-gray-600">People using it</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                18,392
              </div>
              <div className="text-sm text-gray-600">Tasks checked off</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">Free</div>
              <div className="text-sm text-gray-600">To use</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Task Manager. All rights
              reserved.
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-blue-600 transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
