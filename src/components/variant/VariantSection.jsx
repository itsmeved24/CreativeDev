import React, { useRef } from 'react';
import './variant.css';
import VariantHeader from './VariantHeader';
import CanvasArea from './CanvasArea';
import ControlsSection from './ControlsSection';
import ModuleTable from './ModuleTable';
import ManifestoFooter from './ManifestoFooter';

const VariantSection = () => {
    const objectRef = useRef(null);

    return (
        <div className="variant-section">
            <VariantHeader />
            <CanvasArea objectRef={objectRef} />
            <ControlsSection objectRef={objectRef} />
            <ModuleTable />
            <ManifestoFooter />
        </div>
    );
};

export default VariantSection;
