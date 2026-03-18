import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const options = {
        fullScreen: {
            enable: true,
            zIndex: 0 // 🔑 FIX: Puts it OVER the blue gradient, but UNDER the dashboard
        },
        particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.4 }, // Made slightly brighter
            size: { value: 3, random: true },
            links: { // 🔑 FIX: Modern syntax for connecting lines
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.3, // Brighter connecting lines
                width: 1.5
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                outModes: "out"
            }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: "grab" }, // 🔑 FIX: Modern syntax
                resize: true
            },
            modes: {
                grab: { distance: 150, links: { opacity: 0.8 } }
            }
        },
        detectRetina: true
    };

    return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticleBackground;