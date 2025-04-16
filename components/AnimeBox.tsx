// 'use client';

// import React, { useEffect, useRef } from 'react';
// import * as anime from 'animejs';

// const AnimeBox: React.FC = () => {
//   const boxRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (boxRef.current) {
//       anime.default({
//         targets: boxRef.current,
//         translateX: 250,
//         rotate: '1turn',
//         backgroundColor: '#FF6F61',
//         duration: 2000,
//         easing: 'easeInOutQuad',
//       });
//     }
//   }, []);

//   return (
//     <div
//       ref={boxRef}
//       className="w-24 h-24 bg-blue-500 rounded-md"
//     >
//       {/* Animated Box */}
//     </div>
//   );
// };

// export default AnimeBox;

