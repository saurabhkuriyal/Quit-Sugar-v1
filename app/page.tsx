"use client";

import axios from "axios";
import React, { useState } from "react";

export default function Home() {
  const [days, setDays] = useState(30);
  const [image, setImage] = useState<string | null>(null);
  const [selectImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };


  async function handleSubmit() {
    console.log("got clicked");

    if (!selectImage) return;

    const formData = new FormData();
    formData.append("image", selectImage);
    formData.append("days", days.toString());
    try {
      const response = await axios.post("/api/analyzeImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("------>", response.data);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">

      {/* Background Gradients (Subtle) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gradient-to-l from-emerald-50 to-teal-50 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-2xl text-center space-y-12">

        {/* Header */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            Face the <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-500 font-medium max-w-md mx-auto leading-relaxed">
            See your face transform after 30 days of quitting sugar.
            <span className="block text-neutral-400 text-sm mt-2 font-normal">AI-Powered. Instant. Scientific.</span>
          </p>
        </div>

        {/* Studio Input Panel */}
        <div className="glass-panel rounded-3xl p-2 shadow-2xl shadow-black/5 animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden relative group">

            {/* Image Drop Zone */}
            <div className="relative aspect-[4/3] w-full flex flex-col items-center justify-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors cursor-pointer group-hover:border-neutral-200 border-b border-transparent">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-12 transition-transform group-hover:scale-105 duration-300">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">Upload Your Selfie</h3>
                  <p className="text-sm text-neutral-400 mt-2">Drag & drop or click to browse</p>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Controls Bar */}
            <div className="p-6 bg-white border-t border-neutral-100 flex flex-col md:flex-row gap-6 items-center justify-between">

              {/* Days Slider */}
              <div className="flex-1 w-full space-y-3 text-left">
                <div className="flex justify-between items-center text-xs font-bold tracking-widest uppercase text-neutral-400">
                  <span>Duration</span>
                  <span className="text-black bg-neutral-100 px-2 py-0.5 rounded text-[10px]">{days} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-black hover:accent-neutral-800 transition-all"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-neutral-100"></div>

              {/* Inputs */}
              <div className="flex gap-3 w-full md:w-auto">
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1.5 ml-1">Daily Habit</label>
                  <select className="studio-input w-full p-2.5 rounded-xl text-sm font-medium text-neutral-700 appearance-none">
                    <option>Soda / Pop</option>
                    <option>Candy / Sweets</option>
                    <option>Pastries</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[100px]">
                  <label className="block text-[10px] uppercase font-bold text-neutral-400 mb-1.5 ml-1">Calories</label>
                  <input
                    type="number"
                    placeholder="2000"
                    className="studio-input w-full p-2.5 rounded-xl text-sm font-medium text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <button className="btn-generate group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-black rounded-full hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 w-full md:w-auto min-w-[200px] shadow-xl shadow-black/10"
            onClick={handleSubmit}>
            <span className="mr-2" >Generate Transformation</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-white/40 transition-all"></div>
          </button>

          <div className="mt-8 flex justify-center gap-6 opacity-40 grayscale">
            {/* Simple Trust Logos */}
            <div className="h-4 w-20 bg-black/20 rounded"></div>
            <div className="h-4 w-20 bg-black/20 rounded"></div>
            <div className="h-4 w-20 bg-black/20 rounded"></div>
          </div>
        </div>

      </div>
    </main>
  );
}
