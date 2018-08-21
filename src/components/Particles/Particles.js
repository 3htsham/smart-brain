import React from 'react';
import Particles from 'react-particles-js';



const ParticlesBg = () => {
      const particlesProp = {
                        particles: {
                              number: {
                                    value: 150,
                                    density: {
                                          enable: true,
                                          value_area: 800
                                    },
                              },
                              size: {
                                    value: 3,
                                    random: true
                              },
                              move: {
                                    speed: 12
                              }
                        },
                        interactivity: {
                              onhover: {
                                    enable: true,
                                    mode: 'repulse'
                              },
                              onclick: {
                                    enable: true,
                                    mode: 'bubble'
                              },
                              modes: {
                                    bubble: {
                                          distance: 700,
                                          size: 15,
                                          opacity: 0.4,
                                          duration: 2 
                                    },
                                    repulse: {
                                         distance: 100 
                                    }
                              }
                        }
                  };

	return (
		<div>
			<Particles className='particles' params={particlesProp} />
		</div>
	);
}

export default ParticlesBg;