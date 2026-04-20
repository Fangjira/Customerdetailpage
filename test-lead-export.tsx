import { LeadDetailScreenV2 } from "./src/app/components/screens/lead-detail-screen-v2";

export default function Test() {
  return (
    <div>
      <h1>Testing Lead Detail Export</h1>
      <LeadDetailScreenV2 onBack={() => console.log("back")} leadId="test-123" />
    </div>
  );
}
