import React, { useState, useEffect } from 'react';

const LABELS = ['DEVELOP', 'EXPERIENCE', 'IMPACT'];
const ANIM_MS = 5000;
const STEPS = 3;     // 3 keyframe intervals = perfect 1:1 with label cycle
const STEP_MS = ANIM_MS / STEPS; // ~2666ms each

const CELLS = Array.from({ length: 24 });

const CanvasArea = ({ objectRef }) => {
    const [labelIdx, setLabelIdx] = useState(0);

    useEffect(() => {
        // Poll the CSS animation's own currentTime — the exact same clock
        // that drives the shape morph, so label and shape can never drift apart.
        let id;

        const startPolling = () => {
            const anim = objectRef?.current?.getAnimations?.()[0];

            if (!anim) {
                // Animation not started yet — retry next frame
                id = requestAnimationFrame(startPolling);
                return;
            }

            id = setInterval(() => {
                const t = anim.currentTime % ANIM_MS;
                const step = Math.floor(t / STEP_MS);
                setLabelIdx(step % LABELS.length);
            }, 50); // poll at 20fps — plenty for a ~2.6s step
        };

        id = requestAnimationFrame(startPolling);

        return () => {
            cancelAnimationFrame(id);
            clearInterval(id);
        };
    }, [objectRef]);

    return (
        <section className="v-canvas-area">
            {/* Background grid */}
            <div className="v-engine-grid">
                {CELLS.map((_, i) => (
                    <div key={i} className="v-engine-cell" />
                ))}
            </div>

            {/* Morphing shape — label inside tracks its edges exactly like ::before */}
            <div className="v-object" ref={objectRef}>
                <span className="v-object-label">{LABELS[labelIdx]}</span>
            </div>

            {/* Debug overlay */}
            <div className="v-debug v-mono">
                BASED IN BANGALORE: YES<br />
                LATENCY: 12ms<br />
                SEED: 9938210
            </div>
        </section>
    );
};

export default CanvasArea;
