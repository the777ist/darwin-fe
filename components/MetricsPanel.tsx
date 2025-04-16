"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

interface MetricCardProps {
  title?: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

const MetricCard = ({ title, value, subtitle, className }: MetricCardProps) => (
  <Card className={className}>
    {title && (
      <CardHeader>
        <CardTitle className="metrics-text-sm">{title}</CardTitle>
      </CardHeader>
    )}
    <CardContent>
      <p className="metrics-text-lg">{value}</p>
      {subtitle && <p className="metrics-subtitle">{subtitle}</p>}
    </CardContent>
  </Card>
);

export default function MetricsPanel() {
  const { data } = useWebSocket();

  if (!data) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    );
  }

  const totalVisitors = data.variants.reduce(
    (sum, variant) => sum + variant.visitors,
    0
  );
  const totalRevenue = data.variants.reduce(
    (sum, variant) => sum + variant.revenue,
    0
  );

  const variantStats = data.variants.map((variant) => ({
    name: variant.name,
    conversionRate: ((variant.conversions / variant.visitors) * 100).toFixed(1),
    revenue: variant.revenue,
    sessionDuration: "15:30", // Hardcoded for now
  }));

  return (
    <div className="space-y-4">
      <h3 className="heading">Total Visitors</h3>
      <MetricCard value={totalVisitors.toLocaleString()} className="pt-3" />

      <div className="space-y-2">
        <h3 className="heading">Conversion Rates</h3>
        {variantStats.map((variant) => (
          <MetricCard
            key={`${variant.name}-conversion`}
            title={variant.name}
            value={`${variant.conversionRate}%`}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="heading">Revenue per Variant</h3>
        {variantStats.map((variant) => (
          <MetricCard
            key={`${variant.name}-revenue`}
            title={variant.name}
            value={`$${variant.revenue.toLocaleString()}`}
            subtitle={`$${((variant.revenue / totalRevenue) * 100).toFixed(
              1
            )}% of total`}
          />
        ))}
      </div>

      <div className="space-y-2">
        <h3 className="heading">Session Duration</h3>
        {variantStats.map((variant) => (
          <MetricCard
            key={`${variant.name}-duration`}
            title={variant.name}
            value={variant.sessionDuration}
          />
        ))}
      </div>

      <h3 className="heading">Total Revenue</h3>
      <MetricCard
        value={`$${totalRevenue.toLocaleString()}`}
        subtitle={`$${(totalRevenue / totalVisitors).toFixed(2)} per visitor`}
        className="pt-3"
      />
    </div>
  );
}
