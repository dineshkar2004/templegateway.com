
import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once visible
                }
            },
            {
                threshold: threshold,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return (
        <div
            ref={ref}
            className={`${className} transition-opacity duration-700 ${isVisible ? "animate-slide-up opacity-100" : "opacity-0 translate-y-4"
                }`}
        >
            {children}
        </div>
    );
};

export default RevealOnScroll;
