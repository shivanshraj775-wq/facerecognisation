"use client";

import * as faceapi from "face-api.js";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import LiveCameraRecognition from "./LiveCameraRecognition";


export default function LiveCameraRecognition({ suspects }: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    // Load face-api models
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    if (!modelsLoaded) return alert("Models not loaded yet");
    setRunning(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      setRunning(false);
    }
  };

  const runDetection = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors();

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    };

    faceapi.matchDimensions(canvasRef.current, displaySize);
    const resized = faceapi.resizeResults(detections, displaySize);

    canvasRef.current.getContext("2d")?.clearRect(0, 0, displaySize.width, displaySize.height);
    faceapi.draw.drawDetections(canvasRef.current, resized);

    // Compare with known suspects
    if (suspects.length && detections.length) {
      const labeled = new faceapi.LabeledFaceDescriptors(
        "Suspects",
        suspects.map((s: any) => new Float32Array(s.facialEmbedding))
      );
      const matcher = new faceapi.FaceMatcher(labeled, 0.45);

      resized.forEach((detection) => {
        const best = matcher.findBestMatch(detection.descriptor);
        const box = detection.detection.box;
        const ctx = canvasRef.current!.getContext("2d")!;
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText(best.toString(), box.x, box.y - 10);
      });
    }

    requestAnimationFrame(runDetection);
  };

  useEffect(() => {
    if (running) {
      videoRef.current?.addEventListener("play", () => runDetection());
    }
  }, [running, modelsLoaded]);

  return (
    <div className="flex flex-col items-center space-y-3">
      <video ref={videoRef} autoPlay muted width={640} height={480} className="rounded-md border" />
      <canvas ref={canvasRef} width={640} height={480} className="absolute" />
      <div className="space-x-3 mt-2">
        <Button onClick={startCamera} disabled={running}>Start Camera</Button>
        <Button onClick={stopCamera} variant="outline">Stop</Button>
      </div>
      <div className="mt-8">
  <h2 className="text-lg font-semibold mb-4">Live Camera Face Detection</h2>
  <LiveCameraRecognition suspects={suspects} />
</div>

    </div>
  );
}
