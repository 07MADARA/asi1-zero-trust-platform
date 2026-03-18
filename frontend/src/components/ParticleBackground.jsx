import React from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; // Use slim for better compatibility

const ParticleBackground = () => {
    // Corrected initialization function
    const particlesInit = async (engine) => {
        await loadSlim(engine);
    };

    const options = {
        fullScreen: {
            enable: true,
            zIndex: 0 // Keeps it behind your text/cards but above the blue wall
        },
        particles: {
            number: { value: 100, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            links: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                outModes: "out",
            },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" },
            },
            modes: {
                grab: { distance: 150, links: { opacity: 0.8 } },
            },
        },
        retina_detect: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={options}
        />
    );
};

export default ParticleBackground;