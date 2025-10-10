'use client';

import { useState, useEffect } from 'react';
import { FloatingNavbar } from "../components/ui/floating-dock";
import { Play, Sparkles, Zap, Target, ArrowRight, Youtube, BookOpen, Code, Brain } from 'lucide-react';
import ScrollEffect from '../components/ScroolEffect/scroll';
import LoadingCreation from '../components/ui/model/LoadingCreation';
import { ProcessUrl } from './compiler/hooks/ProcessUrl';

function DEVlabs() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  // Validate YouTube URL
  useEffect(() => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    setIsValidUrl(youtubeRegex.test(videoUrl));
  }, [videoUrl]);



  const handleStartLearning = async () => {
    if (!isValidUrl) return;
    setIsLoading(true);
  
    const response = await ProcessUrl(videoUrl);
  
    // ✅ parse once
    const data = await response.json();
    console.log('Parsed response:', data);
  
    if (response.ok) {
      console.log('Here is your backend');
      console.log(data); // reuse parsed data
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to learning session
        window.location.href = `/DEV-labs/compiler?video=${encodeURIComponent(videoUrl)}`;
      }, 50000);
    } else {
      console.error('Error from backend:', data);
    }
  };


  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Our AI understands video content and creates personalized learning paths"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Interactive Practice",
      description: "Hands-on coding challenges and exercises tailored to your video"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Adaptive Learning",
      description: "Difficulty adjusts based on your progress and understanding"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Instant Feedback",
      description: "Get immediate guidance and explanations as you learn"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-800/20 via-slate-900 to-slate-700 relative overflow-x-hidden">
      {/* Background Effects */}
      {isLoading && <LoadingCreation />}
      <ScrollEffect />
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse pointer-events-none z-0"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000 pointer-events-none z-0"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000 pointer-events-none z-0"></div>

      <div className="relative z-10 container mx-auto px-4 py-20 pb-30">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-fade-in-up">
              Transform Any Video
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up delay-200">
              Into Interactive Learning
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Paste any educational video and instantly get a personalized, hands-on learning experience. 
              No more passive watching—dive into practice, challenges, and real understanding.
            </p>
          </div>

          {/* Video Input Section */}
          <div className="max-w-3xl mx-auto mb-12 animate-fade-in-up delay-600">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/20 rounded-2xl p-2">
                <div className="flex items-center space-x-4 p-4">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <input
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste YouTube URL (e.g., https://youtube.com/watch?v=...)"
                    className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg focus:outline-none"
                  />
                  <button
                    onClick={handleStartLearning}
                    disabled={!isValidUrl || isLoading}
                    className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 ${
                      isValidUrl && !isLoading
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button for Features */}
          <button
            onClick={() => setShowFeatures(!showFeatures)}
            className="inline-flex items-center space-x-2 text-purple-300 hover:text-white transition-colors duration-300 animate-fade-in-up delay-1000"
          >
            <Sparkles className="w-5 h-5" />
            <span>See how it works</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showFeatures ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Features Section */}
        {showFeatures && (
          <div className="transition-opacity duration-500 opacity-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up delay-1200">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl px-8 py-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-white font-semibold">Ready to revolutionize your learning?</span>
          </div>
        </div>
      </div>

    </main>
  );
}


export default function dev_labs(){
  return(
    <main>
      <DEVlabs />
      <FloatingNavbar />
    </main>
  );
}