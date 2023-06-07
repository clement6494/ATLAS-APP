import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';

const CameraControls = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const touchStartRef = useRef(null);

  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStartRef.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      if (!touchStartRef.current) return;

      const touchEnd = event.touches[0].clientX;
      const sensitivity = 0.01; // Adjust this value to control the camera movement speed

      const deltaX = touchEnd - touchStartRef.current;
      const rotationAngle = deltaX * sensitivity;

      camera.rotation.y -= rotationAngle;

      touchStartRef.current = touchEnd;
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [camera]);

  useFrame((state) => {
    if (isMobileDevice()) {
      // Custom camera movement for smartphones
      const offset = 1 - scroll.offset;

      state.camera.position.set(
        20,
        (Math.atan(offset * Math.PI * 10 - 30) +
          Math.atan(offset * Math.PI * 10 - 25) +
          Math.atan(offset * Math.PI * 10 - 20) +
          Math.atan(offset * Math.PI * 10 - 2)) *
          5,
        0
      );

      state.camera.lookAt(
        0,
        (Math.atan(offset * Math.PI * 10 - 30) +
          Math.atan(offset * Math.PI * 10 - 25) +
          Math.atan(offset * Math.PI * 10 - 20) +
          Math.atan(offset * Math.PI * 10 - 2)) *
          5,
        0
      );
    } else {
      // Camera movement using useScroll for computers
      const offset = 1 - scroll.offset;

      state.camera.position.set(
        Math.sin(offset) * -10,
        Math.atan(offset * Math.PI * 2) * 5,
        Math.cos((offset * Math.PI) / 3) * -10
      );

      state.camera.lookAt(0, 0, 0);
    }

    console.log(state.camera.position);
  });

  return null;
};

export default CameraControls;

// Helper function to check if the device is a mobile device
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


