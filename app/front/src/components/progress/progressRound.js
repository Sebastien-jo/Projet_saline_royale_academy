import React,{useState, useEffect} from 'react';
import "../../styles/components/progress.css";

const ProgressRound = ({ progress }) => {

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const progressOffset = (100 - progress) * 314 / 100;
        setOffset(progressOffset);
    }, [progress]);

    return (
        <svg className="round-progress" width="80" height="80"> {/* Update width and height */}
            <circle
                className="round-progress-background"
                cx="40" // Update the center X coordinate
                cy="40" // Update the center Y coordinate
                r="36" // Update the radius
            />
            <circle
                className="round-progress-circle"
                cx="40" // Update the center X coordinate
                cy="40" // Update the center Y coordinate
                r="36" // Update the radius
                style={{
                    strokeDasharray: 251.2, // Update the strokeDasharray value
                    strokeDashoffset: offset
                }}
            />
            <text
                className="progress-text"
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
            >
                {progress}
            </text>
        </svg>
    );
}

export default ProgressRound;