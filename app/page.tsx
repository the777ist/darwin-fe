import Header from "@/components/Header";
import MetricsPanel from "@/components/MetricsPanel";
import {
  DynamicVisualizationsSection,
  DynamicEventLogPanel,
} from "@/components/ClientComponents";

export default function Home() {
  return (
    <main className="main-layout p-0">
      <Header />
      <div className="dashboard-grid layout-spacing-horizontal pt-6 pb-16">
        <div className="metrics-column">
          <h3 className="heading-black text-center lg:text-start">Metrics</h3>
          <MetricsPanel />
        </div>
        <div className="visualization-column ml-8 pl-0 lg:pl-12 lg:border-l">
          <h3 className="heading-black text-center">Trend over time</h3>
          <DynamicVisualizationsSection />
        </div>
      </div>
      <div className="mt-8 layout-spacing-horizontal">
        <h3 className="heading-black text-center lg:text-start">
          Logs and events
        </h3>
        <DynamicEventLogPanel />
      </div>
    </main>
  );
}
