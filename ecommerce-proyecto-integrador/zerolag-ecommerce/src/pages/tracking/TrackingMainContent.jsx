import ActionsSecurityLocationInfo from "./trackingmaincontent/ActionsSecurityLocationInfo";
import TimelineAndHardware from "./trackingmaincontent/TimelineAndHardware";

function TrackingMainContent({ order }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
      {/* Left Column: Timeline & Hardware Serials (8 cols) */}
      <TimelineAndHardware order={order} />
      {/* Right Column: Actions, Security & Location Info (4 cols) */}
      <ActionsSecurityLocationInfo />
    </div>
  );
}

export default TrackingMainContent;
