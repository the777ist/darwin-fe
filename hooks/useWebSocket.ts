'use client';

import { useState, useEffect } from 'react';

export interface LogEvent {
    timestamp: string;
    type: 'goalAchievement' | 'experimentEvent' | 'visitorMilestone';
    description: string;
}

export interface ExperimentData {
    experimentId: string;
    variants: {
        name: string;
        visitors: number;
        conversions: number;
        revenue: number;
    }[];
    liveUpdates: {
        timestamp: string;
        control: {
            visitors: number;
            conversions: number;
            revenue: number;
        };
        variantB: {
            visitors: number;
            conversions: number;
            revenue: number;
        };
    }[];
    logs: LogEvent[];
}

export function useWebSocket() {
    const [data, setData] = useState<ExperimentData | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3001');

        ws.onopen = () => {
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            setData(newData);
            setLastUpdated(new Date());
        };

        ws.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            ws.close();
        };
    }, []);

    return { data, isConnected, lastUpdated };
}