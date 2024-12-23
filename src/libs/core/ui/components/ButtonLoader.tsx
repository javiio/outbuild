import React from 'react';
import { motion } from 'framer-motion';

export const ButtonLoader = () => {
	const pathVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "circOut",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div role="status">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 42 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 my-0.5"
      >
        <motion.path
          d="M29.585 20.0017H40.2974C41.0912 17.7388 41.3337 15.3177 41.0046 12.9412C40.6755 10.5647 39.7844 8.3021 38.406 6.34312C37.0276 4.38414 35.202 2.78583 33.0824 1.68217C30.9627 0.578514 28.6107 0.00167293 26.2235 0H11.5692V9.9982H29.585V20.0017Z"
          fill="currentColor"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          style={{ transformOrigin: "center left" }}
        />
        <motion.path
          d="M29.5836 20.0015H11.5678V9.99805H0.860694C0.0607553 12.2605 -0.186547 14.683 0.13961 17.0616C0.465767 19.4401 1.35583 21.7051 2.73484 23.6657C4.11385 25.6263 5.94142 27.225 8.06361 28.3273C10.1858 29.4297 12.5405 30.0032 14.9293 29.9997H29.5836V20.0015Z"
          fill="currentColor"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          style={{ transformOrigin: "center right" }}
        />
				<span className="sr-only">Loading...</span>
      </motion.svg>
    </div>
  );
}