import React from 'react';

const MODULES = [
    { arrow: '↓', name: 'Generative Layouts', processing: 'Real-time GPU', output: 'Flexbox / Grid' },
    { arrow: '↓', name: 'Typographic Scala', processing: 'Modular Ratio', output: 'Fluid Clamp()' },
    { arrow: '↓', name: 'Color Permutations', processing: 'WCAG 2.1 Check', output: 'HSL Variables' },
    { arrow: '↓', name: 'Asset Synthesis', processing: 'Diffusion Model', output: 'SVG / PNG' },
    { arrow: '↓', name: 'Code Export', processing: 'Tree Shaking', output: 'React Component' },
    { arrow: '↓', name: 'Version Control', processing: 'Git Integration', output: 'Branch / Merge' },
];

const ModuleTable = () => (
    <section>
        {/* Sticky column headers */}
        <div className="v-table-header">
            <div>idx</div>
            <div>Module</div>
            <div>Processing</div>
            <div>Output Type</div>
        </div>

        {MODULES.map((mod, i) => (
            <div key={i} className="v-data-row">
                <div className="v-arrow">{mod.arrow}</div>
                <div>{mod.name}</div>
                <div>{mod.processing}</div>
                <div>{mod.output}</div>
            </div>
        ))}
    </section>
);

export default ModuleTable;
