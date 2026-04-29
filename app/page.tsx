"use client";

import type { FaceLandmarker } from "@mediapipe/tasks-vision";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

interface Landmark {
  x: number;
  y: number;
  z: number;
}

export default function Home() {
  const imageRef = useRef(null);
  const [landmarker, setLandmarker] = useState<FaceLandmarker | null>(null);
  const [days, setDays] = useState(30);
  const [image, setImage] = useState<string | null>(null);
  const [selectImage, setSelectedImage] = useState<File | null>(null);
  const [faceResults, setFaceResults] = useState({});
  let [metrics, setMetrics] = useState({
    puffinessRatio: "",
    faceWidth: "",
    faceHeight: ""
  });

  // 1. Initialize MediaPipe Face Landmarker for IMAGES
  useEffect(() => {
    const initializeMediaPipe = async () => {
      // Bypass Next.js/Turbopack completely by natively importing the pure JS module straight from the CDN!
      // @ts-ignore - Webpack will ignore this, but TypeScript might complain about absolute URLs.
      const visionTasks = await import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs");
      const { FilesetResolver, FaceLandmarker } = visionTasks;

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "IMAGE", // Changed from VIDEO to IMAGE
        numFaces: 1
      });

      setLandmarker(faceLandmarker);
    };

    initializeMediaPipe();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const analyzeImage = async () => {
    if (!landmarker || !imageRef.current) return;

    // setIsProcessing(true);

    try {
      // Run detection on the static image element
      const results = landmarker.detect(imageRef.current);

      console.log("results", results);

      setFaceResults(results); // Save it for later!

      if (results.faceLandmarks.length > 0) {
        const landmarks = results.faceLandmarks[0];

        const position = await validateHeadPose(landmarks)

        console.log("-------->", position);

        //Calculate puffiness (Face Width to Height Ratio)
        const faceWidth = calculateDistance(landmarks[234], landmarks[454]);
        const faceHeight = calculateDistance(landmarks[10], landmarks[152]);
        const puffinessRatio = faceWidth / faceHeight;

        setMetrics({
          puffinessRatio: puffinessRatio.toFixed(4),
          faceWidth: faceWidth.toFixed(4),
          faceHeight: faceHeight.toFixed(4)
        });



        //At this point, you can send 'metrics' to your Next.js API route to save it!
        //await fetch('/api/save-metrics', { method: 'POST', body: JSON.stringify(metrics) });

      } else {
        alert("No face detected in this image. Please try another one.");
      }
    } catch (error) {
      console.error("Error analyzing face:", error);
    } finally {
      // setIsProcessing(false);
      console.log('DONE');

    }
  };

  //function for validating pose
  const validateHeadPose = (landmarks: Landmark[]) => {
    const nose = landmarks[1];
    const leftEdge = landmarks[234];
    const rightEdge = landmarks[454];
    const top = landmarks[10];
    const bottom = landmarks[152];
    const leftEye = landmarks[33];
    const rightEye = landmarks[263];

    // 1. Calculate YAW (Turning Left/Right)
    // We see where the nose is relative to the total width of the face.
    const faceWidth = rightEdge.x - leftEdge.x;
    const noseRatioX = (nose.x - leftEdge.x) / faceWidth;
    // Ideal: 0.5 (Nose is exactly in the middle)

    // 2. Calculate PITCH (Looking Up/Down)
    // We see where the nose is relative to the total height of the face.
    const faceHeight = bottom.y - top.y;
    const noseRatioY = (nose.y - top.y) / faceHeight;
    // Ideal: ~0.5 (varies slightly by face length, usually between 0.45 and 0.55)

    // 3. Calculate ROLL (Head Tilt Ear-to-Shoulder)
    // The Y-coordinates of both eyes should be almost identical.
    const eyeTilt = rightEye.y - leftEye.y;
    // Ideal: 0.0 (Eyes are perfectly level)

    // --- Define the Validation Thresholds ---
    // You can tighten or loosen these numbers based on how strict you want to be
    const isYawCentered = noseRatioX > 0.45 && noseRatioX < 0.55;
    const isPitchCentered = noseRatioY > 0.45 && noseRatioY < 0.55;
    const isRollCentered = Math.abs(eyeTilt) < 0.02;

    const isLookingStraight = isYawCentered && isPitchCentered && isRollCentered;

    // Generate a helpful UI message
    let message = "Perfect! Hold still.";
    if (!isLookingStraight) {
      if (!isYawCentered) {
        message = noseRatioX < 0.45 ? "Turn your head slightly to the right." : "Turn your head slightly to the left.";
      } else if (!isPitchCentered) {
        message = noseRatioY < 0.45 ? "Tilt your chin down a bit." : "Lift your chin up a bit.";
      } else if (!isRollCentered) {
        message = eyeTilt > 0 ? "Tilt your head to the left to level your eyes." : "Tilt your head to the right to level your eyes.";
      }
    }

    return {
      isValid: isLookingStraight,
      feedbackMessage: message,
      metrics: { noseRatioX, noseRatioY, eyeTilt }
    };
  };

  // Helper for 3D distance
  const calculateDistance = (point1: any, point2: any) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) +
      Math.pow(point2.y - point1.y, 2) +
      Math.pow(point2.z - point1.z, 2)
    );
  };

  async function handleSubmit() {
    console.log("got clicked");

    if (!selectImage) return;

    console.log("faceResults", faceResults);


    const formData = new FormData();
    formData.append("image", selectImage);
    formData.append("days", days.toString());
    formData.append("results", JSON.stringify(faceResults));
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
      <h1> Here is that {metrics.faceHeight}</h1>
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
                <img
                  src={image}
                  ref={imageRef}
                  onLoad={analyzeImage}
                  alt="Preview"
                  className="w-full h-full object-cover" />
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
