import { ApprovalListScreen } from "./approval-list-screen";

export function ApprovalsScreen({
  onApprovalClick,
}: {
  onApprovalClick: (approvalId: string) => void;
}) {
  return <ApprovalListScreen onApprovalClick={onApprovalClick} />;
}
