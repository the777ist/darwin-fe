'use client';

import dynamic from 'next/dynamic';

const VisualizationsSection = dynamic(() => import('./VisualizationsSection'), { ssr: false });
const EventLogPanel = dynamic(() => import('./EventLogPanel'), { ssr: false });

export function DynamicVisualizationsSection() {
    return <VisualizationsSection />;
}

export function DynamicEventLogPanel() {
    return <EventLogPanel />;
}