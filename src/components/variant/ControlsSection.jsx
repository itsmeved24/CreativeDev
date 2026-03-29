import React, { useState } from 'react';

const ControlsSection = ({ objectRef }) => {
    const [complexity, setComplexity] = useState(70);
    const [entropy, setEntropy] = useState(20);

    const handleSlider = (val) => {
        if (objectRef?.current) {
            objectRef.current.style.transform = `scale(${1 + val / 200}) rotate(${val}deg)`;
        }
    };

    return (
        <section className="v-controls">
            {/* Left: hero text + sliders + CTA */}
            <div>
                <h1 className="v-h1">
                    Infinite<br />Recursion.
                </h1>
                <p style={{ maxWidth: 400, marginBottom: '2rem' }}>
                    Variant is not a drawing tool. It is a logic engine for design
                    systems. Define constraints, output infinity.
                </p>

                <div className="v-slider-group">
                    <div>
                        <span className="v-label">Complexity</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={complexity}
                            onChange={(e) => {
                                setComplexity(Number(e.target.value));
                                handleSlider(Number(e.target.value));
                            }}
                        />
                    </div>
                    <div>
                        <span className="v-label">Entropy</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={entropy}
                            onChange={(e) => {
                                setEntropy(Number(e.target.value));
                                handleSlider(Number(e.target.value));
                            }}
                        />
                    </div>
                </div>

                <button className="v-btn">Initialize Engine</button>
            </div>

            {/* Right: mono tagline */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <p className="v-mono" style={{ fontSize: 12, textAlign: 'right' }}>
                    Compatible with Figma, React, &amp; WebGL.<br />
                    Export to JSON/CSS.<br />
                    No drag and drop. Pure logic.
                </p>
            </div>
        </section>
    );
};

export default ControlsSection;
