import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Node {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

interface Connection {
    node1: number;
    node2: number;
    opacity: number;
}

interface LoadingAnimationProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showText?: boolean;
}

export const LoadingAnimation = ({ className, size = 'md', showText = true }: LoadingAnimationProps) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    // Generate plexus network data
    useEffect(() => {
        const nodeCount = size === 'lg' ? 25 : size === 'md' ? 20 : 15;
        const dimensions = {
            sm: { width: 300, height: 200 },
            md: { width: 400, height: 250 },
            lg: { width: 500, height: 300 }
        };

        const { width, height } = dimensions[size];

        // Initialize nodes
        const initialNodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 2
        }));

        setNodes(initialNodes);

        const updateAnimation = () => {
            let updatedNodes: Node[] = [];

            setNodes(prevNodes => {
                updatedNodes = prevNodes.map(node => {
                    let newX = node.x + node.vx;
                    let newY = node.y + node.vy;
                    let newVx = node.vx;
                    let newVy = node.vy;

                    // Bounce off edges
                    if (newX <= 0 || newX >= width) {
                        newVx = -node.vx;
                        newX = Math.max(0, Math.min(width, newX));
                    }
                    if (newY <= 0 || newY >= height) {
                        newVy = -node.vy;
                        newY = Math.max(0, Math.min(height, newY));
                    }

                    return {
                        ...node,
                        x: newX,
                        y: newY,
                        vx: newVx,
                        vy: newVy
                    };
                });
                return updatedNodes;
            });

            // Update connections based on distance
            setTimeout(() => {
                const newConnections: Connection[] = [];
                const maxDistance = size === 'lg' ? 120 : size === 'md' ? 100 : 80;

                for (let i = 0; i < updatedNodes.length; i++) {
                    for (let j = i + 1; j < updatedNodes.length; j++) {
                        const node1 = updatedNodes[i];
                        const node2 = updatedNodes[j];
                        const distance = Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));

                        if (distance < maxDistance) {
                            const opacity = Math.max(0.1, (maxDistance - distance) / maxDistance);
                            newConnections.push({
                                node1: i,
                                node2: j,
                                opacity
                            });
                        }
                    }
                }
                setConnections(newConnections);
            }, 0);
        };

        const interval = setInterval(updateAnimation, 50);
        return () => clearInterval(interval);
    }, [size]);

    const containerSizes = {
        sm: 'w-[300px] h-[200px]',
        md: 'w-[400px] h-[250px]',
        lg: 'w-[500px] h-[300px]'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-xl'
    };

    return (
        <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
            {/* Plexus Network Visualization */}
            <div className={cn('relative bg-black rounded-lg overflow-hidden', containerSizes[size])}>
                <svg className='absolute inset-0 w-full h-full'>
                    {/* Connections */}
                    {connections.map((connection, index) => {
                        const node1 = nodes[connection.node1];
                        const node2 = nodes[connection.node2];

                        if (!node1 || !node2) return null;

                        return (
                            <line
                                key={`connection-${index}`}
                                x1={node1.x}
                                y1={node1.y}
                                x2={node2.x}
                                y2={node2.y}
                                stroke='#eb0028'
                                strokeWidth='1'
                                opacity={connection.opacity * 0.6}
                                style={{
                                    filter: `drop-shadow(0 0 2px rgba(235, 0, 40, ${connection.opacity * 0.5}))`,
                                    animation: `plexusGlow 2s ease-in-out infinite ${index * 0.1}s`
                                }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes */}
                {nodes.map((node, index) => (
                    <div
                        key={`node-${node.id}`}
                        className='absolute bg-white rounded-full'
                        style={{
                            left: `${node.x}px`,
                            top: `${node.y}px`,
                            width: `${node.size}px`,
                            height: `${node.size}px`,
                            transform: 'translate(-50%, -50%)',
                            boxShadow: `0 0 ${node.size * 2}px rgba(255, 255, 255, 0.8), 0 0 ${node.size * 4}px rgba(235, 0, 40, 0.3)`,
                            animation: `nodePulse 3s ease-in-out infinite ${index * 0.2}s`
                        }}
                    />
                ))}

                {/* Central glow effect */}
                <div
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full'
                    style={{
                        width: '150px',
                        height: '150px',
                        background: 'radial-gradient(circle, rgba(235, 0, 40, 0.1) 0%, transparent 70%)',
                        animation: 'centralPulse 4s ease-in-out infinite'
                    }}
                />
            </div>

            {/* Loading text with network style */}
            {showText && (
                <div className='flex flex-col items-center gap-3'>
                    <div
                        className={cn('font-bold text-white tracking-wider', textSizeClasses[size])}
                        style={{
                            textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(235, 0, 40, 0.3)',
                            animation: 'networkTextGlow 2s ease-in-out infinite alternate'
                        }}
                    >
                        CONNECTING
                    </div>
                    <div className='flex gap-1'>
                        {[0, 1, 2, 3, 4].map(index => (
                            <div
                                key={index}
                                className='w-2 h-2 bg-[#eb0028] rounded-full'
                                style={{
                                    animation: `networkDotPulse 1.2s ease-in-out infinite ${index * 0.15}s`,
                                    boxShadow: '0 0 4px rgba(235, 0, 40, 0.8)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// Full screen loading overlay
export const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
    if (!isLoading) return null;

    return (
        <div className='fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center'>
            <LoadingAnimation size='lg' />
        </div>
    );
};

// Inline loading spinner
export const LoadingSpinner = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => {
    return (
        <LoadingAnimation
            size={size}
            showText={false}
            className='p-2'
        />
    );
};
