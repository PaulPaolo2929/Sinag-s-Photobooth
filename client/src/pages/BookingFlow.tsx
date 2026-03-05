import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Image as ImageIcon,
  Wand2,
  Printer,
  CheckCircle,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Progress } from "@/components/ui/progress";

const API_URL = "http://localhost:8000/api";

type Step = "layout" | "variety" | "shoot" | "select" | "edit" | "print";
type LayoutType = "strip" | "grid" | null;
type VarietyType = "border" | "borderless" | null;

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("layout");
  const [layout, setLayout] = useState<LayoutType>(null);
  const [variety, setVariety] = useState<VarietyType>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoIds, setPhotoIds] = useState<number[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Webcam refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const maxPhotosToSelect = layout === "strip" ? 3 : 4;
  const totalShots = layout === "strip" ? 6 : 8;

  // Cleanup webcam on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Start webcam
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      alert(
        "Could not access webcam. Please make sure camera permissions are granted.",
      );
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Capture photo and save to database
  const capturePhoto = async (shotNumber: number): Promise<string | null> => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return null;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get base64 image data
    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    try {
      const response = await fetch(`${API_URL}/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_data: imageData,
          layout_type: layout,
          variety_type: variety,
          shot_number: shotNumber,
          is_selected: false,
        }),
      });

      const data = await response.json();
      if (data.success) {
        return imageData;
      }
    } catch (err) {
      console.error("Error saving photo:", err);
    }

    return imageData;
  };

  // Update photo selection in database
  const updatePhotoSelection = async (photoId: number, isSelected: boolean) => {
    try {
      await fetch(`${API_URL}/photos/${photoId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_selected: isSelected }),
      });
    } catch (err) {
      console.error("Error updating photo:", err);
    }
  };

  // Clear all photos from database
  const clearAllPhotos = async () => {
    try {
      await fetch(`${API_URL}/photos`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error("Error clearing photos:", err);
    }
  };

  const handleNext = async () => {
    switch (currentStep) {
      case "layout":
        if (layout) setCurrentStep("variety");
        break;
      case "variety":
        if (variety) {
          setCurrentStep("shoot");
          await startWebcam();
        }
        break;
      case "shoot":
        setCurrentStep("select");
        break;
      case "select":
        if (selectedPhotos.length === maxPhotosToSelect) setCurrentStep("edit");
        break;
      case "edit":
        setCurrentStep("print");
        triggerConfetti();
        break;
      case "print":
        await clearAllPhotos();
        stopWebcam();
        window.location.href = "/";
        break;
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff6b4a", "#ffd166", "#72ddf7"],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff6b4a", "#ffd166", "#72ddf7"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const startShooting = () => {
    setPhotos([]);
    setPhotoIds([]);
    let shotCount = 0;

    const takeShot = () => {
      setCountdown(3);
      const timer = setInterval(async () => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            // Capture the photo
            capturePhoto(shotCount + 1).then((imageData) => {
              if (imageData) {
                setPhotos((prev) => [...prev, imageData]);
                // Get the latest photo ID (we'll fetch from API)
                fetch(`${API_URL}/photos`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.photos && data.photos.length > 0) {
                      setPhotoIds((prev) => [
                        ...prev,
                        data.photos[data.photos.length - 1].id,
                      ]);
                    }
                  });
              }
            });
            shotCount++;
            setCountdown(null);
            if (shotCount < totalShots) setTimeout(takeShot, 1500);
            else
              setTimeout(() => {
                setCurrentStep("select");
                stopWebcam();
              }, 1000);
            return null;
          }
          return prev ? prev - 1 : null;
        });
      }, 1000);
    };
    takeShot();
  };

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: "layout", label: "Layout", icon: ImageIcon },
    { id: "variety", label: "Style", icon: Wand2 },
    { id: "shoot", label: "Shoot", icon: Camera },
    { id: "select", label: "Select", icon: CheckCircle },
    { id: "edit", label: "Decorate", icon: Wand2 },
    { id: "print", label: "Print", icon: Printer },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div
      className="min-h-screen pt-12 pb-12 px-4 max-w-7xl mx-auto flex flex-col overflow-hidden"
      data-testid="page-booking-flow"
    >
      <div className="mb-8 glass-card p-4 rounded-3xl sticky top-4 z-40 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-top-4 duration-1000">
        <Progress
          value={progress}
          className="h-2 mb-4 bg-muted overflow-hidden"
        />
        <div className="flex justify-between items-center px-2">
          {steps.map((s, i) => {
            const isActive = i === currentStepIndex;
            const isPast = i < currentStepIndex;
            return (
              <div
                key={s.id}
                className={`flex flex-col items-center gap-1 transition-all duration-500 ${isActive ? "text-primary scale-110" : isPast ? "text-foreground" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 ${isActive ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-[360deg]" : isPast ? "bg-foreground/10" : "bg-muted"}`}
                >
                  <s.icon size={16} />
                </div>
                <span
                  className={`text-[10px] font-black hidden md:block uppercase tracking-wider transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40"}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative">
        {currentStep === "layout" && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-4xl mx-auto w-full stagger-in">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-center tracking-tight">
              Step 1: Choose Layout
            </h2>
            <p className="text-center text-foreground/60 mb-12 text-lg">
              Select your preferred canvas format
            </p>
            <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
              <button
                onClick={() => setLayout("strip")}
                className={`group p-8 rounded-[3rem] border-4 transition-all duration-500 flex flex-col items-center gap-6 ${layout === "strip" ? "border-primary bg-primary/5 scale-105 shadow-2xl shadow-primary/10" : "border-transparent bg-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-2"}`}
              >
                <div className="w-20 h-40 bg-gray-100 rounded-lg flex flex-col gap-1 p-1.5 border-2 shadow-inner group-hover:rotate-2 transition-transform duration-500">
                  <div className="flex-1 bg-white rounded shadow-sm" />
                  <div className="flex-1 bg-white rounded shadow-sm" />
                  <div className="flex-1 bg-white rounded shadow-sm" />
                </div>
                <div className="text-center">
                  <h3 className="font-black text-2xl mb-1">Classic Strip</h3>
                  <p className="text-base font-bold text-primary">
                    ₱50 • 2 Prints • 3 Shots
                  </p>
                </div>
              </button>
              <button
                onClick={() => setLayout("grid")}
                className={`group p-8 rounded-[3rem] border-4 transition-all duration-500 flex flex-col items-center gap-6 ${layout === "grid" ? "border-primary bg-primary/5 scale-105 shadow-2xl shadow-primary/10" : "border-transparent bg-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-2"}`}
              >
                <div className="w-32 h-40 bg-gray-100 rounded-lg grid grid-cols-2 grid-rows-2 gap-1.5 p-1.5 border-2 shadow-inner group-hover:-rotate-2 transition-transform duration-500">
                  <div className="bg-white rounded shadow-sm" />
                  <div className="bg-white rounded shadow-sm" />
                  <div className="bg-white rounded shadow-sm" />
                  <div className="bg-white rounded shadow-sm" />
                </div>
                <div className="text-center">
                  <h3 className="font-black text-2xl mb-1">4-Up Grid</h3>
                  <p className="text-base font-bold text-primary">
                    ₱100 • 1 Print • 4 Shots
                  </p>
                </div>
              </button>
            </div>
            <div className="mt-auto flex justify-center pb-8">
              <Button
                size="lg"
                disabled={!layout}
                onClick={handleNext}
                className="rounded-full px-12 h-16 text-xl font-black bg-foreground text-background hover:scale-110 transition-all duration-300 shadow-xl active:scale-95"
              >
                Next: Choose Style{" "}
                <ChevronRight className="ml-2 animate-bounce-x" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === "variety" && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-4xl mx-auto w-full stagger-in">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-center tracking-tight">
              Step 2: Choose Style
            </h2>
            <p className="text-center text-foreground/60 mb-12 text-lg">
              Border or Borderless?
            </p>
            <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
              <button
                onClick={() => setVariety("border")}
                className={`group p-10 rounded-[3rem] border-4 transition-all duration-500 flex flex-col items-center gap-6 ${variety === "border" ? "border-secondary bg-secondary/5 scale-105 shadow-2xl shadow-secondary/10" : "border-transparent bg-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-2"}`}
              >
                <div className="w-40 h-40 bg-gray-200 rounded-2xl p-4 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full bg-blue-300 rounded-lg border-8 border-white shadow-md" />
                </div>
                <h3 className="font-black text-2xl">With Borders</h3>
              </button>
              <button
                onClick={() => setVariety("borderless")}
                className={`group p-10 rounded-[3rem] border-4 transition-all duration-500 flex flex-col items-center gap-6 ${variety === "borderless" ? "border-secondary bg-secondary/5 scale-105 shadow-2xl shadow-secondary/10" : "border-transparent bg-white/60 hover:bg-white/80 hover:shadow-xl hover:-translate-y-2"}`}
              >
                <div className="w-40 h-40 bg-blue-300 rounded-2xl overflow-hidden shadow-inner group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-black text-2xl">Borderless</h3>
              </button>
            </div>
            <div className="mt-auto flex justify-between gap-4 pb-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep("layout")}
                className="rounded-full px-8 h-16 font-bold hover:bg-white/40"
              >
                Back
              </Button>
              <Button
                size="lg"
                disabled={!variety}
                onClick={handleNext}
                className="rounded-full px-12 h-16 text-xl font-black bg-foreground text-background hover:scale-110 transition-all duration-300 shadow-xl active:scale-95"
              >
                Ready to Shoot{" "}
                <ChevronRight className="ml-2 animate-bounce-x" />
              </Button>
            </div>
          </div>
        )}

        {currentStep === "shoot" && (
          <div className="fixed inset-0 z-[100] bg-black flex animate-in fade-in duration-700 overflow-hidden">
            <div className="w-24 md:w-40 bg-zinc-950 border-r border-white/5 p-4 flex flex-col gap-3 overflow-y-auto animate-in slide-in-from-left duration-1000">
              <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] text-center mb-2">
                Captured
              </div>
              {Array.from({ length: totalShots }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-[3/4] rounded-xl border-2 transition-all duration-500 ${photos[i] ? "border-primary shadow-[0_0_15px_rgba(255,107,74,0.3)] scale-95" : "bg-white/5 border-white/5"}`}
                  style={
                    photos[i]
                      ? {
                          backgroundImage: `url(${photos[i]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : undefined
                  }
                >
                  {photos[i] ? (
                    <CheckCircle
                      size={20}
                      className="text-white drop-shadow-lg mx-auto mt-[40%] animate-in zoom-in"
                    />
                  ) : (
                    <Camera
                      size={20}
                      className="text-white/10 mx-auto mt-[40%]"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex-1 relative flex items-center justify-center">
              {/* Hidden video element for webcam stream */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Hidden canvas for capturing */}
              <canvas ref={canvasRef} className="hidden" />

              {photos.length === 0 && countdown === null ? (
                <div className="text-center z-10 px-8 stagger-in">
                  <div className="w-32 h-32 bg-primary/20 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-xl border border-primary/30 shadow-2xl animate-float">
                    <Camera size={64} />
                  </div>
                  <h2 className="text-5xl md:text-8xl font-black mb-6 text-white tracking-tighter">
                    Strike a Pose!
                  </h2>
                  <p className="text-2xl text-white/60 mb-12 max-w-xl mx-auto font-medium">
                    Capture {totalShots} moments of joy. Ready?
                  </p>
                  <Button
                    size="lg"
                    className="h-28 px-20 text-4xl rounded-full bg-primary text-white hover:scale-110 transition-all shadow-[0_0_80px_rgba(255,107,74,0.5)] font-black"
                    onClick={startShooting}
                  >
                    START NOW
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-zinc-900 animate-pulse opacity-40" />
                  {countdown !== null ? (
                    <div className="text-[20rem] md:text-[35rem] font-black text-white z-10 drop-shadow-[0_0_60px_rgba(0,0,0,1)] animate-in zoom-in spin-in-3 duration-300">
                      {countdown}
                    </div>
                  ) : (
                    <div className="absolute top-12 right-12 bg-red-600 text-white px-8 py-4 rounded-full font-black animate-pulse flex items-center gap-4 text-2xl shadow-2xl z-20">
                      <div className="w-5 h-5 bg-white rounded-full" /> LIVE
                      FEED
                    </div>
                  )}
                  {countdown === null && photos.length > 0 && (
                    <div
                      className="absolute inset-0 bg-white z-50 animate-out fade-out duration-700 pointer-events-none"
                      key={photos.length}
                    />
                  )}
                </div>
              )}
              <button
                onClick={() => setCurrentStep("layout")}
                className="absolute top-10 left-10 md:left-52 text-white/40 hover:text-white transition-colors font-black uppercase tracking-widest text-sm z-50 hover:scale-110"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {currentStep === "select" && (
          <div className="flex-1 flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-6xl mx-auto w-full stagger-in">
            <h2 className="text-4xl md:text-6xl font-black mb-4 text-center tracking-tight">
              Step 4: Pick Your Best
            </h2>
            <p className="text-center text-foreground/60 mb-12 text-lg">
              Choose {maxPhotosToSelect} for your layout (
              {selectedPhotos.length}/{maxPhotosToSelect})
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {photos.map((photo, i) => {
                const isSelected = selectedPhotos.includes(i.toString());
                const isDisabled =
                  !isSelected && selectedPhotos.length >= maxPhotosToSelect;
                return (
                  <button
                    key={i}
                    disabled={isDisabled}
                    onClick={() =>
                      isSelected
                        ? setSelectedPhotos((prev) =>
                            prev.filter((id) => id !== i.toString()),
                          )
                        : setSelectedPhotos((prev) => [...prev, i.toString()])
                    }
                    className={`relative aspect-[3/4] rounded-3xl overflow-hidden transition-all duration-500 ${isSelected ? "ring-8 ring-primary scale-95 shadow-2xl z-10" : isDisabled ? "opacity-30 grayscale" : "hover:scale-105 hover:shadow-xl"}`}
                    style={{
                      backgroundImage: `url(${photo})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center animate-in zoom-in">
                        <CheckCircle
                          size={64}
                          className="text-white drop-shadow-xl"
                        />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-auto flex justify-center pb-8">
              <Button
                size="lg"
                disabled={selectedPhotos.length !== maxPhotosToSelect}
                onClick={handleNext}
                className="rounded-full px-16 h-20 text-2xl font-black bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-110 transition-all active:scale-95"
              >
                Confirm Selection
              </Button>
            </div>
          </div>
        )}

        {currentStep === "edit" && (
          <div className="flex-1 flex flex-col lg:flex-row gap-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 items-start max-w-7xl mx-auto w-full stagger-in">
            <div className="flex-1 w-full bg-white/40 rounded-[3.5rem] border border-white p-8 md:p-16 flex items-center justify-center min-h-[600px] lg:min-h-[850px] shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-secondary)_0%,_transparent_80%)] opacity-20" />
              {layout === "strip" ? (
                <div
                  className={`bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col relative transition-all duration-700 hover:scale-[1.05] hover:rotate-1 ${variety === "borderless" ? "p-0" : "p-4 gap-4"}`}
                  style={{ width: "240px", height: "720px" }}
                >
                  {selectedPhotos.map((id) => (
                    <div
                      key={id}
                      className="flex-1 w-full relative overflow-hidden shadow-inner animate-in fade-in slide-in-from-bottom-4 duration-1000"
                      style={{
                        backgroundImage: `url(${photos[parseInt(id)]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                  <div className="h-24 flex flex-col items-center justify-center bg-white border-t border-gray-50">
                    <span className="text-xs font-black text-gray-300 tracking-[0.5em] animate-pulse">
                      SINAG
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className={`bg-white shadow-[0_40px_100px_rgba(0,0,0,0.2)] flex flex-col relative transition-all duration-700 hover:scale-[1.05] hover:-rotate-1 ${variety === "borderless" ? "p-0" : "p-5 gap-5"}`}
                  style={{ width: "480px", height: "720px" }}
                >
                  <div
                    className={`grid grid-cols-2 grid-rows-2 flex-1 ${variety === "borderless" ? "gap-0" : "gap-5"}`}
                  >
                    {selectedPhotos.map((id) => (
                      <div
                        key={id}
                        className="w-full h-full relative overflow-hidden shadow-inner animate-in fade-in zoom-in duration-1000"
                        style={{
                          backgroundImage: `url(${photos[parseInt(id)]})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    ))}
                  </div>
                  <div className="h-32 flex flex-col items-center justify-center bg-white border-t border-gray-100">
                    <span className="text-2xl font-black text-gray-300 tracking-[0.6em] animate-pulse">
                      SINAG PHOTOBOOTH
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-[450px] flex flex-col gap-10 sticky top-32">
              <div className="space-y-3 stagger-in">
                <h2 className="text-5xl font-black tracking-tight">
                  Personalize
                </h2>
                <p className="text-xl text-foreground/60 font-medium leading-relaxed">
                  Add your signature touch to the moment.
                </p>
              </div>
              <div className="space-y-8 stagger-in">
                <div className="glass-card p-8 rounded-[2.5rem] border-white shadow-xl hover:shadow-2xl transition-all duration-500">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-3 text-primary">
                    <Wand2 size={18} /> Artistic Filters
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      "Normal",
                      "Sunshine",
                      "Vintage",
                      "Noir",
                      "Vibrant",
                      "Dreamy",
                    ].map((f) => (
                      <button
                        key={f}
                        className="flex flex-col items-center gap-3 group transition-all duration-300 hover:-translate-y-1"
                      >
                        <div
                          className={`w-full aspect-square rounded-2xl bg-gray-100 border-2 border-transparent group-hover:border-primary transition-all relative overflow-hidden shadow-sm`}
                        >
                          <div
                            className={`absolute inset-0 ${f === "Sunshine" ? "bg-orange-200/30" : f === "Vintage" ? "bg-amber-900/20 sepia" : f === "Noir" ? "grayscale" : ""}`}
                          />
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-foreground/50 group-hover:text-primary transition-colors">
                          {f}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-8 rounded-[2.5rem] border-white shadow-xl hover:shadow-2xl transition-all duration-500">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-6 text-secondary">
                    Frame Style
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { n: "Pure", c: "bg-white border" },
                      { n: "Night", c: "bg-zinc-900" },
                      { n: "Coral", c: "bg-primary" },
                      { n: "Sun", c: "bg-secondary" },
                      { n: "Sky", c: "bg-accent" },
                      { n: "Blush", c: "bg-rose-200" },
                    ].map((color) => (
                      <button
                        key={color.n}
                        className="group flex flex-col items-center gap-2 hover:scale-110 transition-all duration-300"
                      >
                        <div
                          className={`w-12 h-12 rounded-full ${color.c} ring-4 ring-offset-4 ring-transparent hover:ring-primary/30 transition-all shadow-md`}
                        />
                        <span className="text-[10px] font-bold text-foreground/40">
                          {color.n}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pt-6 stagger-in">
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient text-white font-black h-20 text-2xl shadow-2xl shadow-primary/30 hover:scale-110 transition-all active:scale-95"
                >
                  Ready to Print
                </Button>
                <p className="text-center text-[11px] font-black text-foreground/30 mt-6 uppercase tracking-[0.4em]">
                  Final step before physical print
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === "print" && (
          <div className="flex-1 flex flex-col items-center justify-center animate-in zoom-in duration-1000 max-w-4xl mx-auto w-full stagger-in">
            <div className="w-40 h-40 bg-green-100 text-green-500 rounded-[3rem] flex items-center justify-center mb-10 relative animate-float">
              <div className="absolute inset-0 bg-green-400/20 rounded-[3rem] animate-ping" />
              <Printer size={80} className="relative z-10" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black mb-6 text-center gradient-text tracking-tighter">
              Memories Incoming!
            </h2>
            <p className="text-2xl text-foreground/60 mb-12 text-center max-w-xl font-medium leading-relaxed">
              Please wait while we bring your sunshine to life. Collect your
              prints at the tray below.
            </p>
            <div className="glass-card p-10 rounded-[3rem] text-center mb-12 w-full max-w-md border-green-500/20 shadow-2xl shadow-green-500/10 hover:scale-105 transition-transform duration-500">
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-2">
                Amount Due
              </p>
              <p className="text-6xl font-black text-foreground">
                ₱{layout === "grid" ? "100" : "50"}
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={handleNext}
              className="rounded-full px-12 h-16 font-black text-xl hover:bg-white transition-all hover:scale-110 active:scale-95"
            >
              Start New Session
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
