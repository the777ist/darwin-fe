"use client";

import { useState } from "react";
import { useWebSocket, LogEvent } from "@/hooks/useWebSocket";
import { format } from "date-fns";
import { Card, CardHeader, CardContent } from "./ui/Card";

const getEventColor = (type: LogEvent["type"]) => {
  switch (type) {
    case "goalAchievement":
      return "bg-green-500";
    case "experimentEvent":
      return "bg-blue-500";
    case "visitorMilestone":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};

const getEventLabel = (type: LogEvent["type"]) => {
  switch (type) {
    case "goalAchievement":
      return "Goal";
    case "experimentEvent":
      return "Experiment";
    case "visitorMilestone":
      return "Milestone";
    default:
      return "Event";
  }
};

export default function EventLogPanel() {
  const { data } = useWebSocket();
  const [filterType, setFilterType] = useState<LogEvent["type"] | "all">("all");

  if (!data?.logs) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          {/* <CardTitle className="subheading">Event Log</CardTitle> */}
          <div className="skeleton w-24 h-8" />
        </CardHeader>
        <CardContent className="event-log">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="event-item">
              <div className="skeleton-circle w-2 h-2 mt-2" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="skeleton-text w-16" />
                  <div className="skeleton-text w-20" />
                </div>
                <div className="skeleton-text w-4/5" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const filteredEvents =
    filterType === "all"
      ? data.logs
      : data.logs.filter((event) => event.type === filterType);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="heading">Events Log</h3>
        <select
          className="border rounded-md px-2 py-1"
          value={filterType}
          onChange={(e) =>
            setFilterType(e.target.value as LogEvent["type"] | "all")
          }
        >
          <option value="all">All Events</option>
          <option value="goalAchievement">Goals</option>
          <option value="experimentEvent">Experiments</option>
          <option value="visitorMilestone">Milestones</option>
        </select>
      </div>

      <Card className="pt-0">
        <CardHeader className="flex flex-row items-center justify-between mb-0">
          {/* <CardTitle className="subheading">Conversion Rates</CardTitle> */}
        </CardHeader>
        <CardContent className="event-log">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <div key={`${event.timestamp}-${index}`} className="event-item">
                <div
                  className={`event-indicator ${getEventColor(event.type)}`}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${getEventColor(
                        event.type
                      )} text-white`}
                    >
                      {getEventLabel(event.type)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {format(new Date(event.timestamp), "HH:mm:ss")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              No events to display
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
