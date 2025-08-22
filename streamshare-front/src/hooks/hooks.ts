import { useEffect, useRef } from "react";

export function useReRenderCount(componentName: string): number {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;

        console.log(`${componentName} has re-rendered ${renderCount.current} times`);
    });

    return renderCount.current;
} 