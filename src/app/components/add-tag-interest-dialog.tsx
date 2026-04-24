import { useState } from "react";
import { X, Plus, Tag, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";

interface AddTagInterestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (tags: string[], interests: string[]) => void;
  existingTags?: string[];
  existingInterests?: string[];
}

export function AddTagInterestDialog({
  isOpen,
  onClose,
  onSave,
  existingTags = [],
  existingInterests = [],
}: AddTagInterestDialogProps) {
  const [tags, setTags] = useState<string[]>(existingTags);
  const [interests, setInterests] = useState<string[]>(existingInterests);
  const [newTag, setNewTag] = useState("");
  const [newInterest, setNewInterest] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(tags, interests);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'tag' | 'interest') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'tag') {
        handleAddTag();
      } else {
        handleAddInterest();
      }
    }
  };

  // Suggested tags
  const suggestedTags = [
    "VIP Customer",
    "High Priority",
    "Enterprise",
    "Government",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Logistics",
  ];

  // Suggested interests
  const suggestedInterests = [
    "Cold Chain",
    "Warehousing",
    "Transportation",
    "Customs Clearance",
    "Air Freight",
    "Sea Freight",
    "E-commerce",
    "Cross Border",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">จัดการ Tags & Interest</DialogTitle>
        
          <DialogDescription className="sr-only">
            Dialog description
          </DialogDescription></DialogHeader>

        <div className="space-y-6">
          {/* Tags Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Tag className="h-4 w-4 text-gray-600" />
              <Label className="text-sm font-semibold text-gray-900">Tags</Label>
            </div>

            {/* Add Tag Input */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="เพิ่ม tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'tag')}
                className="flex-1 h-9 text-sm"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddTag}
                className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                เพิ่ม
              </Button>
            </div>

            {/* Current Tags */}
            {tags.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Tags ปัจจุบัน:</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs px-2.5 py-1 border border-gray-200 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Tags */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Tags ที่แนะนำ:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags
                  .filter(tag => !tags.includes(tag))
                  .map((tag, idx) => (
                    <Badge
                      key={idx}
                      className="bg-white text-gray-600 hover:bg-gray-100 text-xs px-2.5 py-1 border border-gray-300 cursor-pointer"
                      onClick={() => setTags([...tags, tag])}
                    >
                      + {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-4 w-4 text-blue-600" />
              <Label className="text-sm font-semibold text-gray-900">Interest</Label>
            </div>

            {/* Add Interest Input */}
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="เพิ่ม interest..."
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'interest')}
                className="flex-1 h-9 text-sm"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleAddInterest}
                className="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                เพิ่ม
              </Button>
            </div>

            {/* Current Interests */}
            {interests.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Interest ปัจจุบัน:</p>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, idx) => (
                    <Badge
                      key={idx}
                      className="bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs px-2.5 py-1 border border-blue-200 flex items-center gap-1"
                    >
                      {interest}
                      <button
                        onClick={() => handleRemoveInterest(interest)}
                        className="hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Interests */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Interest ที่แนะนำ:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedInterests
                  .filter(interest => !interests.includes(interest))
                  .map((interest, idx) => (
                    <Badge
                      key={idx}
                      className="bg-white text-blue-600 hover:bg-blue-50 text-xs px-2.5 py-1 border border-blue-300 cursor-pointer"
                      onClick={() => setInterests([...interests, interest])}
                    >
                      + {interest}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 px-4"
          >
            ยกเลิก
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="h-9 px-4 bg-green-600 hover:bg-green-700 text-white"
          >
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
