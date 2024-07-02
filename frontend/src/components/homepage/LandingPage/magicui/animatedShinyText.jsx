import React from 'react';
import { cn } from '../utils/cn';
import './AnimatedShinyText.css';



const AnimatedShinyText = ({ children, className, shimmerWidth = 100 }) => {
    return (
        <p
            style={{
                '--shimmer-width': `${shimmerWidth}px`,
            }}
            className={cn(
                'text-gold',
                'animate-shimmer bg-clip-text bg-no-repeat',
                className,
            )}
        >
            {children}
        </p>
    );
};

const AnimatedShinyTextDemo = () => {
    return (
        <div className="z-10 flex min-h-[16rem] items-center justify-center">
            <div>
                <AnimatedShinyText
                    className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:duration-300"
                    style={{ color: '#00F0FC' }}
                    onMouseEnter={(e) => e.target.style.color = '#00F0FC'}
                    onMouseLeave={(e) => e.target.style.color = ''}>
                    <span> Choose the best service for your entrepreneurial voyage ✨ </span>

                </AnimatedShinyText>
            </div>
        </div>
    );
};

export default AnimatedShinyTextDemo;
