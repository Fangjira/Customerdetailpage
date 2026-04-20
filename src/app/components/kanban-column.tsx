import { useDrop } from "react-dnd";
import { JobCardKanbanCard, KanbanJobCard, ITEM_TYPE } from "./job-card-kanban-card";
import { Badge } from "./ui/badge";

interface KanbanColumnProps {
  title: string;
  jobCards: KanbanJobCard[];
  onDrop: (jobCardId: string, newStage: string) => void;
  onCardClick?: (id: string) => void;
  stage: string;
  color?: string;
}

export function KanbanColumn({
  title,
  jobCards,
  onDrop,
  onCardClick,
  stage,
  color = "bg-muted",
}: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: string; stage: string }) => {
      if (item.stage !== stage) {
        onDrop(item.id, stage);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div className="flex flex-col h-full min-w-[300px] w-[300px]">
      <div className={`rounded-t-lg p-3 ${color}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm">{title}</h3>
          <Badge variant="secondary" className="h-6 px-2">
            {jobCards.length}
          </Badge>
        </div>
      </div>
      <div
        ref={drop}
        className={`flex-1 p-3 space-y-3 bg-muted/30 rounded-b-lg min-h-[500px] transition-colors ${
          isOver ? "bg-blue-50 border-2 border-blue-300 border-dashed" : "border-2 border-transparent"
        }`}
      >
        {jobCards.map((jobCard) => (
          <JobCardKanbanCard
            key={jobCard.id}
            jobCard={jobCard}
            onClick={onCardClick}
          />
        ))}
        {jobCards.length === 0 && (
          <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
            No job cards
          </div>
        )}
      </div>
    </div>
  );
}
