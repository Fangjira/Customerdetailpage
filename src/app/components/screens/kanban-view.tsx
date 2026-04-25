import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  DollarSign,
  Calendar,
  User,
  Building2,
  TrendingUp,
  Plus,
  MoreVertical,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  probability: number;
  owner: string;
  ownerAvatar: string;
  expectedCloseDate: string;
  stage: string;
  priority: "high" | "medium" | "low";
}

interface DealCardProps {
  deal: Deal;
  onMove: (dealId: string, newStage: string) => void;
}

const DealCard = ({ deal, onMove }: DealCardProps) => {
  const { t } = useTranslation();
  const [{ isDragging }, drag] = useDrag({
    type: "deal",
    item: { id: deal.id, stage: deal.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-[#dc2626]";
      case "medium":
        return "border-l-[#f59e0b]";
      default:
        return "border-l-[#3b82f6]";
    }
  };

  return (
    <div
      ref={drag as any}
      className={`mb-3 ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      <Card
        className={`border-2 border-[#ede9fe] border-l-4 ${getPriorityColor(
          deal.priority
        )} hover:border-[#a78bfa] hover:shadow-lg transition-all rounded-xl cursor-move`}
      >
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="font-bold text-[#4c1d95] text-sm mb-1 leading-tight">
                {deal.title}
              </h4>
              <div className="flex items-center gap-1 text-xs text-[#9333ea]">
                <Building2 className="h-3 w-3" />
                <span>{deal.company}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-1">
              <MoreVertical className="h-4 w-4 text-[#9333ea]" />
            </Button>
          </div>

          {/* Value */}
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-lg flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-[#166534]" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[#9333ea]">{t("deals.deal_value")}</p>
              <p className="font-bold text-[#4c1d95]">
                ${deal.value.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Probability */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#9333ea]">{t("deals.probability")}</span>
              <span className="font-bold text-[#705add]">{deal.probability}%</span>
            </div>
            <div className="h-2 bg-[#ede9fe] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#a78bfa] to-[#705add] rounded-full"
                style={{ width: `${deal.probability}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#ede9fe]">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-gradient-to-br from-[#a78bfa] to-[#705add] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">
                  {deal.ownerAvatar}
                </span>
              </div>
              <span className="text-xs text-[#9333ea]">{deal.owner}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#9333ea]">
              <Calendar className="h-3 w-3" />
              <span>{deal.expectedCloseDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ColumnProps {
  stage: string;
  title: string;
  deals: Deal[];
  totalValue: number;
  onMove: (dealId: string, newStage: string) => void;
}

const Column = ({ stage, title, deals, totalValue, onMove }: ColumnProps) => {
  const { t } = useTranslation();
  const [{ isOver }, drop] = useDrop({
    accept: "deal",
    drop: (item: { id: string; stage: string }) => {
      if (item.stage !== stage) {
        onMove(item.id, stage);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getStageColor = (stage: string) => {
    const colors: Record<string, string> = {
      lead: "from-[#fee2e2] to-[#fecaca]",
      contact: "from-[#fef3c7] to-[#fde68a]",
      needs_analysis: "from-[#dbeafe] to-[#bfdbfe]",
      proposal: "from-[#ede9fe] to-[#ddd6fe]",
      negotiation: "from-[#fce7f3] to-[#fbcfe8]",
      closed_won: "from-[#dcfce7] to-[#bbf7d0]",
    };
    return colors[stage] || "from-[#f3f4f6] to-[#e5e7eb]";
  };

  return (
    <div
      ref={drop as any}
      className={`flex-shrink-0 w-80 ${
        isOver ? "bg-[#f5f3ff] border-2 border-dashed border-[#a78bfa]" : ""
      } rounded-2xl transition-all p-2`}
    >
      <Card className="border-2 border-[#ede9fe] shadow-md rounded-2xl h-full">
        <CardHeader
          className={`bg-gradient-to-r ${getStageColor(
            stage
          )} border-b-2 border-[#ede9fe] rounded-t-2xl`}
        >
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#4c1d95] text-base">{title}</CardTitle>
              <p className="text-xs text-[#9333ea] font-medium mt-1">
                {deals.length} {t("deals.deals")} • $
                {totalValue.toLocaleString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/50 hover:bg-white rounded-lg"
            >
              <Plus className="h-4 w-4 text-[#705add]" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <ScrollArea className="h-[calc(100vh-300px)]">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} onMove={onMove} />
            ))}
            {deals.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 bg-[#f5f3ff] rounded-full flex items-center justify-center mb-3">
                  <DollarSign className="h-6 w-6 text-[#ddd6fe]" />
                </div>
                <p className="text-sm text-[#9333ea]">{t("deals.no_deals")}</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export function KanbanView() {
  const { t } = useTranslation();
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: "D-001",
      title: "Air Freight Service - 500kg",
      company: "Global Freight Solutions",
      value: 125000,
      probability: 75,
      owner: "Sarah Chen",
      ownerAvatar: "SC",
      expectedCloseDate: "Jan 15",
      stage: "proposal",
      priority: "high",
    },
    {
      id: "D-002",
      title: "Contract Renewal",
      company: "Pacific Logistics",
      value: 89500,
      probability: 90,
      owner: "Michael Park",
      ownerAvatar: "MP",
      expectedCloseDate: "Jan 10",
      stage: "negotiation",
      priority: "high",
    },
    {
      id: "D-003",
      title: "Warehouse Management",
      company: "Asian Trade Corp",
      value: 67000,
      probability: 60,
      owner: "Emily Rodriguez",
      ownerAvatar: "ER",
      expectedCloseDate: "Feb 01",
      stage: "needs_analysis",
      priority: "medium",
    },
    {
      id: "D-004",
      title: "Ocean Freight - Container",
      company: "Euro Shipping Solutions",
      value: 145000,
      probability: 85,
      owner: "David Kim",
      ownerAvatar: "DK",
      expectedCloseDate: "Jan 20",
      stage: "proposal",
      priority: "high",
    },
    {
      id: "D-005",
      title: "Distribution Services",
      company: "Thai Manufacturing Co.",
      value: 52000,
      probability: 40,
      owner: "Lisa Anderson",
      ownerAvatar: "LA",
      expectedCloseDate: "Feb 15",
      stage: "contact",
      priority: "medium",
    },
    {
      id: "D-006",
      title: "Cold Chain Logistics",
      company: "Vietnam Import Export",
      value: 98000,
      probability: 50,
      owner: "Sarah Chen",
      ownerAvatar: "SC",
      expectedCloseDate: "Jan 30",
      stage: "needs_analysis",
      priority: "medium",
    },
    {
      id: "D-007",
      title: "Express Delivery Service",
      company: "Singapore Shipping Ltd",
      value: 34000,
      probability: 30,
      owner: "Michael Park",
      ownerAvatar: "MP",
      expectedCloseDate: "Feb 20",
      stage: "lead",
      priority: "low",
    },
    {
      id: "D-008",
      title: "Customs Clearance",
      company: "Maritime Logistics",
      value: 78000,
      probability: 95,
      owner: "Emily Rodriguez",
      ownerAvatar: "ER",
      expectedCloseDate: "Jan 05",
      stage: "closed_won",
      priority: "high",
    },
  ]);

  const stages = useMemo(() => [
    { key: "lead", title: t("deals.stage_lead") },
    { key: "contact", title: t("deals.stage_contact") },
    { key: "needs_analysis", title: t("deals.stage_needs_analysis") },
    { key: "proposal", title: t("deals.stage_proposal") },
    { key: "negotiation", title: t("deals.stage_negotiation") },
    { key: "closed_won", title: t("deals.stage_closed_won") },
  ], [t]);

  const handleMove = (dealId: string, newStage: string) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId
          ? {
              ...deal,
              stage: newStage,
              probability: getProbabilityByStage(newStage),
            }
          : deal
      )
    );
  };

  const getProbabilityByStage = (stage: string): number => {
    const probabilities: Record<string, number> = {
      lead: 10,
      contact: 25,
      needs_analysis: 50,
      proposal: 75,
      negotiation: 90,
      closed_won: 100,
    };
    return probabilities[stage] || 50;
  };

  const stageMetrics = useMemo(() => {
    const buckets: Record<string, { deals: Deal[]; totalValue: number }> = {};
    deals.forEach((deal) => {
      if (!buckets[deal.stage]) buckets[deal.stage] = { deals: [], totalValue: 0 };
      buckets[deal.stage].deals.push(deal);
      buckets[deal.stage].totalValue += deal.value;
    });
    return buckets;
  }, [deals]);

  const { totalPipelineValue, weightedValue } = useMemo(() => {
    return deals.reduce(
      (acc, deal) => {
        acc.totalPipelineValue += deal.value;
        acc.weightedValue += (deal.value * deal.probability) / 100;
        return acc;
      },
      { totalPipelineValue: 0, weightedValue: 0 }
    );
  }, [deals]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 bg-gradient-to-br from-[#faf8ff] to-white min-h-screen">
        <div className="max-w-full mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-[#4c1d95] font-semibold">
                {t("deals.pipeline_view")}
              </h1>
              <p className="text-[#9333ea] mt-1">
                {t("deals.drag_drop_hint")}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              <Card className="border-2 border-[#ede9fe] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-[#dbeafe] to-[#bfdbfe] rounded-xl flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-[#1e40af]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9333ea]">
                        {t("deals.total_pipeline")}
                      </p>
                      <p className="font-bold text-[#4c1d95]">
                        ${(totalPipelineValue / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#ede9fe] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-[#166534]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#9333ea]">
                        {t("deals.weighted_value")}
                      </p>
                      <p className="font-bold text-[#4c1d95]">
                        ${(weightedValue / 1000000).toFixed(2)}M
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-4 min-w-max">
              {stages.map((stage) => (
                <Column
                  key={stage.key}
                  stage={stage.key}
                  title={stage.title}
                  deals={stageMetrics[stage.key]?.deals || []}
                  totalValue={stageMetrics[stage.key]?.totalValue || 0}
                  onMove={handleMove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
