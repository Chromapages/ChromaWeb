"use client";

import {useEffect, useRef} from "react";

import type {NeatGradient} from "@firecms/neat";

const prefersReducedMotion = "(prefers-reduced-motion: reduce)";

export function HeroGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia(prefersReducedMotion).matches || !canvasRef.current) {
      return;
    }

    let cancelled = false;
    let gradient: NeatGradient | undefined;
    let removeScrollListener: (() => void) | undefined;

    void import("@firecms/neat")
      .then(({NeatGradient}) => {
        if (cancelled || !canvasRef.current) {
          return;
        }

        gradient = new NeatGradient({
          ref: canvasRef.current,
          antialias: false,
          backgroundAlpha: 0.95,
          backgroundColor: "#202020",
          colors: [
            {color: "#2C3892", enabled: true},
            {color: "#23698C", enabled: true},
            {color: "#FFFFFF", enabled: true},
            {color: "#000000", enabled: true},
            {color: "#F9F9F9", enabled: true},
            {color: "#15AAB5", enabled: false},
          ],
          colorBlending: 3,
          colorBrightness: 1,
          colorSaturation: 0,
          domainWarpEnabled: false,
          domainWarpIntensity: 0,
          domainWarpScale: 3,
          enableProceduralTexture: true,
          flowDistortionA: 3.7,
          flowDistortionB: 1.4,
          flowEase: 0.32,
          flowEnabled: true,
          flowScale: 2.9,
          flatShading: true,
          bloomIntensity: 0,
          bloomThreshold: 0.7,
          chromaticAberration: 0,
          fresnelEnabled: false,
          fresnelColor: "#FFFFFF",
          fresnelIntensity: 0.5,
          fresnelPower: 2,
          grainIntensity: 0.575,
          grainScale: 2,
          grainSparsity: 0,
          grainSpeed: 0.1,
          highlights: 4,
          horizontalPressure: 5,
          iridescenceEnabled: false,
          iridescenceIntensity: 0.5,
          iridescenceSpeed: 1,
          cameraLock: true,
          cameraX: 0,
          cameraY: 0,
          cameraZ: 0,
          cameraRotationX: 0,
          cameraRotationY: 0,
          cameraRotationZ: 0,
          cameraZoom: 1,
          resolution: 0.7,
          shapeAutoRotateSpeedX: 0,
          shapeAutoRotateSpeedY: 0,
          shapeRotationX: 0,
          shapeRotationY: 0,
          shapeRotationZ: 0,
          shapeType: "plane",
          shadows: 4,
          silhouetteFade: 0.25,
          planeBend: 0,
          planeTwist: 0,
          sphereRadius: 15,
          torusRadius: 15,
          torusTube: 5,
          cylinderRadius: 10,
          cylinderHeight: 40,
          speed: 1.5,
          cylinderFade: 0.08,
          ribbonFade: 0.05,
          verticalPressure: 4,
          waveAmplitude: 0,
          waveFrequencyX: 4,
          waveFrequencyY: 5,
          wireframe: true,
          yOffset: 0,
          yOffsetColorMultiplier: 5.2,
          yOffsetFlowMultiplier: 6,
          yOffsetWaveMultiplier: 5.5,
          proceduralBackgroundColor: "#0E0707",
          textureBandDensity: 1.2,
          textureColorBlending: 0.06,
          textureEase: 1,
          textureSeed: 333,
          textureShapeBars: 15,
          textureShapeCircles: 15,
          textureShapeSquiggles: 10,
          textureShapeTriangles: 20,
          textureVoidLikelihood: 0.27,
          textureVoidWidthMax: 420,
          textureVoidWidthMin: 60,
        });

        const handleScroll = () => {
          if (gradient) {
            gradient.yOffset = window.scrollY;
          }
        };
        window.addEventListener("scroll", handleScroll, {passive: true});
        removeScrollListener = () => window.removeEventListener("scroll", handleScroll);

        if (cancelled) {
          removeScrollListener();
          gradient.destroy();
          gradient = undefined;
        }
      })
      .catch(() => {
        // The static ink fallback remains visible if WebGL is unavailable.
      });

    return () => {
      cancelled = true;
      removeScrollListener?.();
      gradient?.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full motion-reduce:hidden" />;
}
