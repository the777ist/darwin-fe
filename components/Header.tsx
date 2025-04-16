"use client";

import Image from "next/image";
import { useWebSocket } from "@/hooks/useWebSocket";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/Card";

export default function Header() {
  const { lastUpdated, isConnected } = useWebSocket();

  if (!lastUpdated) {
    return (
      <Card>
        <CardContent className="header-container">
          <div className="header-logo-section">
            <div className="skeleton-circle w-10 h-10" />
            <div className="flex flex-col">
              <div className="skeleton-text w-48 h-6 mb-1" />
              <div className="skeleton-text w-32 h-3" />
            </div>
          </div>
          <div className="header-status-section">
            <div className="skeleton-text w-24 h-4" />
            <div className="skeleton-text w-32 h-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="header-container">
        <div className="header-logo-section">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Image
              src="/galileo.svg"
              alt="Evolv AI Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="header-title">Darwin AI</h1>
            <span className="header-subtitle">
              &quot;The love for all living creatures is the most noble attribute of
              man&quot;
            </span>
          </div>
        </div>
        <div className="header-status-section">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          {lastUpdated && (
            <span className="text-sm text-gray-600">
              Last updated: {format(lastUpdated, "HH:mm:ss")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
