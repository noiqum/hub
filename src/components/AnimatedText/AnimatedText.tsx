"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
    texts: string[];
    interval?: number; // Optional prop to control speed
    className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ texts, interval = 2000, className }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [texts, interval]);

    return (
        <motion.div
            key={texts[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {texts[index]}
        </motion.div>
    );
};

export default AnimatedText;
