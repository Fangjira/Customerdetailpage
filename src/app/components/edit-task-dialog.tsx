import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar, X, UserCheck, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  dueTime: string;
  assignee: string;
  completed: boolean;
  customer?: string;
  relatedTo?: string;
  approvers?: string[];
}

interface EditTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (taskId: string, updatedTask: Partial<Task>) => void;
}

export function EditTaskDialog({ isOpen, onClose, task, onSave }: EditTaskDialogProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    assignee: "",
    relatedTo: "",
    status: "",
    customer: "",
    approvers: [] as string[],
  });

  // Update form when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        assignee: task.assignee,
        relatedTo: task.relatedTo || "",
        status: task.status,
        customer: task.customer || "",
        approvers: task.approvers || [],
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;
    
    onSave(task.id, {
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority as "high" | "medium" | "low",
      assignee: formData.assignee,
      relatedTo: formData.relatedTo,
      status: formData.status as "todo" | "in-progress" | "completed",
      customer: formData.customer,
      approvers: formData.approvers,
    });
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  
    </Dialog>
  );
}