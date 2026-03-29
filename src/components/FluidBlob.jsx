import React, { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

const FluidBlob = ({
    lerpFactor = 0.06,
    blobRadius = 200,
    haloScale = 2.2,
    noiseSpeed = 0.003,
    noiseStrength = 0.12,
    rippleInterval = 1800,
    rippleMaxCount = 4,
    rippleSpeed = 1.0,
    driftAmplitudeX = 40,
    driftAmplitudeY = 30,
    idleDelay = 2000,
    colorCore = '#A8C4F0',
    colorMid = '#6B8FD4',
    colorMidOuter = '#8AA8E8',
    colorHalo = '#B8CDE8',
    defaultX = 0.65,
    defaultY = 0.35,
    entryDuration = 1200,
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const stateRef = useRef({
        blobX: 0,
        blobY: 0,
        targetX: 0,
        targetY: 0,
        mouseX: 0,
        mouseY: 0,
        lastMouseMoveTime: 0,
        noiseOffsetX: 0,
        noiseOffsetY: 0,
        rings: [],
        lastRippleTime: 0,
        startTime: Date.now(),
        lastTimestamp: 0,
        isIdle: false,
        prefersReducedMotion: false,
    });

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const ctx = canvas.getContext('2d');
        const noise2D = createNoise2D();
        const state = stateRef.current;

        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        state.prefersReducedMotion = mediaQuery.matches;

        const handleMotionChange = (e) => {
            state.prefersReducedMotion = e.matches;
        };
        mediaQuery.addEventListener('change', handleMotionChange);

        // Setup canvas size and DPR
        const setupCanvas = () => {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            ctx.scale(dpr, dpr);

            // Initialize blob position
            if (state.blobX === 0 && state.blobY === 0) {
                state.blobX = rect.width * defaultX;
                state.blobY = rect.height * defaultY;
                state.targetX = state.blobX;
                state.targetY = state.blobY;
            }
        };

        setupCanvas();

        // Mouse/touch event handlers
        const updateMousePosition = (x, y) => {
            const rect = container.getBoundingClientRect();
            state.mouseX = x - rect.left;
            state.mouseY = y - rect.top;
            state.targetX = state.mouseX;
            state.targetY = state.mouseY;
            state.lastMouseMoveTime = Date.now();
            state.isIdle = false;
        };

        const handleMouseMove = (e) => {
            updateMousePosition(e.clientX, e.clientY);
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
            }
        };

        // Resize observer
        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(setupCanvas, 200);
        });
        resizeObserver.observe(container);

        // Calculate scaled blob radius based on viewport
        const getScaledRadius = () => {
            const rect = container.getBoundingClientRect();
            return (rect.width / 1440) * blobRadius;
        };

        // Build noise-displaced blob path
        const buildBlobPath = (cx, cy, radius) => {
            const points = 64;
            const path = new Path2D();
            const controlPoints = [];

            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const nx = Math.cos(angle) + state.noiseOffsetX;
                const ny = Math.sin(angle) + state.noiseOffsetY;
                const n = noise2D(nx, ny);
                const r = radius * (1 + n * noiseStrength);
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                controlPoints.push({ x, y });
            }

            // Draw smooth curve through points
            path.moveTo(controlPoints[0].x, controlPoints[0].y);
            for (let i = 0; i < controlPoints.length - 1; i++) {
                const curr = controlPoints[i];
                const next = controlPoints[i + 1];
                const midX = (curr.x + next.x) / 2;
                const midY = (curr.y + next.y) / 2;
                path.quadraticCurveTo(curr.x, curr.y, midX, midY);
            }
            path.closePath();
            return path;
        };

        // Draw ripple rings
        const drawRipples = (ctx, cx, cy, radius) => {
            state.rings.forEach(ring => {
                const startRadius = radius * 0.8;
                const travelDistance = ring.maxRadius - startRadius;
                const currentTravel = ring.radius - startRadius;
                const progress = currentTravel / travelDistance;

                let opacity;
                if (progress < 0.2) {
                    opacity = (progress / 0.2) * 0.07;
                } else {
                    opacity = (1 - progress) * 0.07;
                }

                ctx.beginPath();
                ctx.arc(cx, cy, ring.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(107, 143, 212, ${opacity})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();
            });
        };

        // Draw halo layer
        const drawHalo = (ctx, cx, cy, radius) => {
            const haloRadius = radius * haloScale;
            const haloGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloRadius);
            haloGrad.addColorStop(0, 'rgba(184, 205, 232, 0.08)');
            haloGrad.addColorStop(0.5, 'rgba(184, 205, 232, 0.04)');
            haloGrad.addColorStop(1, 'rgba(184, 205, 232, 0)');

            ctx.beginPath();
            ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
            ctx.fillStyle = haloGrad;
            ctx.fill();
        };

        // Draw mid body layer
        const drawMidBody = (ctx, cx, cy, radius, blobPath) => {
            ctx.save();
            ctx.clip(blobPath);

            const midGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            midGrad.addColorStop(0, 'rgba(107, 143, 212, 0.50)');
            midGrad.addColorStop(0.5, 'rgba(138, 168, 232, 0.30)');
            midGrad.addColorStop(1, 'rgba(138, 168, 232, 0)');

            ctx.fillStyle = midGrad;
            ctx.fill(blobPath);
            ctx.restore();
        };

        // Draw core highlight
        const drawCore = (ctx, cx, cy, radius) => {
            const coreRadius = radius * 0.45;
            const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
            coreGrad.addColorStop(0, 'rgba(168, 196, 240, 0.65)');
            coreGrad.addColorStop(0.6, 'rgba(168, 196, 240, 0.30)');
            coreGrad.addColorStop(1, 'rgba(168, 196, 240, 0)');

            ctx.beginPath();
            ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
            ctx.fillStyle = coreGrad;
            ctx.fill();
        };

        // Animation loop
        const animate = (timestamp) => {
            animationRef.current = requestAnimationFrame(animate);

            if (document.hidden) return;

            const dt = timestamp - state.lastTimestamp || 0;
            state.lastTimestamp = timestamp;
            const currentTime = Date.now();
            const elapsedTime = currentTime - state.startTime;

            const rect = container.getBoundingClientRect();
            const scaledRadius = getScaledRadius();

            // Entry animation
            const entryProgress = Math.min(elapsedTime / entryDuration, 1);
            const entryScale = 0.6 + (1 - 0.6) * easeOutExpo(entryProgress);
            const entryAlpha = easeOutExpo(entryProgress);

            // Reduced motion: static blob only
            if (state.prefersReducedMotion) {
                ctx.clearRect(0, 0, rect.width, rect.height);
                ctx.save();
                ctx.globalAlpha = 1;
                drawHalo(ctx, state.blobX, state.blobY, scaledRadius);
                const staticPath = buildBlobPath(state.blobX, state.blobY, scaledRadius);
                drawMidBody(ctx, state.blobX, state.blobY, scaledRadius, staticPath);
                drawCore(ctx, state.blobX, state.blobY, scaledRadius);
                ctx.restore();
                return;
            }

            // Check for idle state
            if (currentTime - state.lastMouseMoveTime > idleDelay) {
                state.isIdle = true;
            }

            // Idle drift
            let driftX = 0;
            let driftY = 0;
            let scalePulse = 1.0;

            if (state.isIdle) {
                const time = currentTime;
                driftX = Math.sin(time * 0.0008) * driftAmplitudeX;
                driftY = Math.cos(time * 0.0006) * driftAmplitudeY;
                scalePulse = 1.0 + Math.sin(time * 0.0005) * 0.06;
            }

            // Apply lerp with idle drift
            state.blobX += (state.targetX + driftX - state.blobX) * lerpFactor;
            state.blobY += (state.targetY + driftY - state.blobY) * lerpFactor;

            // Update noise offset
            state.noiseOffsetX += noiseSpeed;
            state.noiseOffsetY += noiseSpeed * 0.7;

            // Update ripples
            if (entryProgress >= 1) {
                if (currentTime - state.lastRippleTime > rippleInterval) {
                    if (state.rings.length < rippleMaxCount) {
                        state.rings.push({
                            radius: scaledRadius * 0.8,
                            maxRadius: scaledRadius * 3.0,
                        });
                        state.lastRippleTime = currentTime;
                    }
                }

                state.rings = state.rings.filter(ring => {
                    ring.radius += rippleSpeed;
                    return ring.radius < ring.maxRadius;
                });

                // Remove oldest if exceeding max count
                if (state.rings.length > rippleMaxCount) {
                    state.rings.shift();
                }
            }

            // Clear canvas
            ctx.clearRect(0, 0, rect.width, rect.height);

            // Apply entry animation transforms
            ctx.save();
            ctx.globalAlpha = entryAlpha;
            const finalRadius = scaledRadius * scalePulse * entryScale;

            // Draw all layers
            drawRipples(ctx, state.blobX, state.blobY, finalRadius);
            drawHalo(ctx, state.blobX, state.blobY, finalRadius);

            const blobPath = buildBlobPath(state.blobX, state.blobY, finalRadius);
            drawMidBody(ctx, state.blobX, state.blobY, finalRadius, blobPath);
            drawCore(ctx, state.blobX, state.blobY, finalRadius);

            ctx.restore();
        };

        // Easing function
        const easeOutExpo = (x) => {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };

        // Start animation
        document.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        animationRef.current = requestAnimationFrame(animate);

        // Cleanup
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('touchmove', handleTouchMove);
            resizeObserver.disconnect();
            mediaQuery.removeEventListener('change', handleMotionChange);
            clearTimeout(resizeTimeout);
        };
    }, [
        lerpFactor,
        blobRadius,
        haloScale,
        noiseSpeed,
        noiseStrength,
        rippleInterval,
        rippleMaxCount,
        rippleSpeed,
        driftAmplitudeX,
        driftAmplitudeY,
        idleDelay,
        defaultX,
        defaultY,
        entryDuration,
    ]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            style={{ zIndex: 0 }}
        >
            <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                aria-hidden="true"
                role="presentation"
            />
        </div>
    );
};

export default FluidBlob;
