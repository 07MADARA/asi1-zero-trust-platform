import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticleBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    const options = {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } }
            }
        },
        retina_detect: true,
        fullScreen: {
            enable: true,
            zIndex: -1 // This ensures the lines stay behind your existing cards
        }
    };

    return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticleBackground;