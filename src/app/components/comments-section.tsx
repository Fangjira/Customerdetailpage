import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import {
  MessageSquare,
  Send,
  AtSign,
  Paperclip,
  ThumbsUp,
  Reply,
  MoreVertical,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Comment {
  id: string;
  user: string;
  userRole: string;
  content: string;
  timestamp: string;
  mentions?: string[];
  attachments?: string[];
  likes: number;
  likedByCurrentUser: boolean;
  replies?: Comment[];
}

interface CommentsSectionProps {
  entityType: "deal" | "customer" | "quotation" | "contract";
  entityId: string;
}

export function CommentsSection({
  entityType,
  entityId,
}: CommentsSectionProps) {
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "Sarah Chen",
      userRole: "Sales Manager",
      content:
        "Great progress on this deal! @Michael Park please review the pricing before we send the final quotation.",
      timestamp: "2024-12-26 10:30",
      mentions: ["Michael Park"],
      likes: 3,
      likedByCurrentUser: true,
      replies: [
        {
          id: "1-1",
          user: "Michael Park",
          userRole: "Account Executive",
          content:
            "Will do! I'll review it today and get back to you by EOD.",
          timestamp: "2024-12-26 11:15",
          likes: 1,
          likedByCurrentUser: false,
        },
      ],
    },
    {
      id: "2",
      user: "Emily Rodriguez",
      userRole: "Operations Manager",
      content:
        "Customer has confirmed availability for site visit next Tuesday. Attaching the confirmation email.",
      timestamp: "2024-12-25 16:45",
      attachments: ["confirmation_email.pdf"],
      likes: 2,
      likedByCurrentUser: false,
    },
    {
      id: "3",
      user: "David Kim",
      userRole: "Finance Analyst",
      content:
        "Payment terms have been approved. We can proceed with the contract signing.",
      timestamp: "2024-12-25 14:20",
      likes: 5,
      likedByCurrentUser: true,
    },
  ]);

  const teamMembers = [
    "Sarah Chen",
    "Michael Park",
    "Emily Rodriguez",
    "David Kim",
    "Lisa Anderson",
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: "Sarah Chen",
      userRole: "Sales Manager",
      content: newComment,
      timestamp: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      likes: 0,
      likedByCurrentUser: false,
    };

    if (replyingTo) {
      setComments(
        comments.map((c) => {
          if (c.id === replyingTo) {
            return {
              ...c,
              replies: [...(c.replies || []), comment],
            };
          }
          return c;
        })
      );
      setReplyingTo(null);
    } else {
      setComments([comment, ...comments]);
    }

    setNewComment("");
  };

  const handleLike = (commentId: string, isReply: boolean = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(
        comments.map((c) => {
          if (c.id === parentId) {
            return {
              ...c,
              replies: c.replies?.map((r) =>
                r.id === commentId
                  ? {
                      ...r,
                      likes: r.likedByCurrentUser ? r.likes - 1 : r.likes + 1,
                      likedByCurrentUser: !r.likedByCurrentUser,
                    }
                  : r
              ),
            };
          }
          return c;
        })
      );
    } else {
      setComments(
        comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likes: c.likedByCurrentUser ? c.likes - 1 : c.likes + 1,
                likedByCurrentUser: !c.likedByCurrentUser,
              }
            : c
        )
      );
    }
  };

  const handleMention = (member: string) => {
    setNewComment(newComment + `@${member} `);
    setShowMentions(false);
  };

  const renderComment = (comment: Comment, isReply: boolean = false, parentId?: string) => (
    <div
      key={comment.id}
      className={`${isReply ? "ml-12 mt-3" : ""}`}
    >
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border-2 border-[#ede9fe] flex-shrink-0">
          <AvatarFallback className="bg-[#705add] text-white">
            {getInitials(comment.user)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-[#faf8ff] border border-[#ede9fe] rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-semibold text-[#4c1d95] text-sm">
                  {comment.user}
                </p>
                <p className="text-xs text-[#9333ea]">{comment.userRole}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#a78bfa]">
                  {comment.timestamp}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-[#9333ea] hover:bg-white"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-[#4c1d95] mb-2">{comment.content}</p>
            {comment.mentions && comment.mentions.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                {comment.mentions.map((mention, idx) => (
                  <Badge
                    key={idx}
                    className="bg-[#dbeafe] text-[#1e40af] border-[#93c5fd] text-xs"
                  >
                    @{mention}
                  </Badge>
                ))}
              </div>
            )}
            {comment.attachments && comment.attachments.length > 0 && (
              <div className="flex items-center gap-2 mt-2">
                {comment.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1 px-2 py-1 bg-white border border-[#ede9fe] rounded-lg text-xs text-[#705add]"
                  >
                    <Paperclip className="h-3 w-3" />
                    {attachment}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleLike(comment.id, isReply, parentId)}
              className={`h-7 text-xs gap-1 ${
                comment.likedByCurrentUser
                  ? "text-[#705add] hover:text-[#5b21b6]"
                  : "text-[#9333ea] hover:text-[#705add]"
              }`}
            >
              <ThumbsUp
                className={`h-3 w-3 ${
                  comment.likedByCurrentUser ? "fill-[#705add]" : ""
                }`}
              />
              {comment.likes > 0 && comment.likes}
            </Button>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
                className="h-7 text-xs text-[#9333ea] hover:text-[#705add] gap-1"
              >
                <Reply className="h-3 w-3" />
                {t("comments.reply")}
              </Button>
            )}
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 space-y-3">
              {comment.replies.map((reply) => renderComment(reply, true, comment.id))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-2 border-[#ede9fe] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-[#4c1d95] flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[#705add]" />
            {t("comments.title")}
          </CardTitle>
          <Badge className="bg-[#f5f3ff] text-[#705add] border-[#ede9fe]">
            {comments.reduce(
              (total, c) => total + 1 + (c.replies?.length || 0),
              0
            )}{" "}
            {t("comments.comments")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* New Comment Input */}
        <div className="space-y-2">
          {replyingTo && (
            <div className="flex items-center justify-between p-2 bg-[#dbeafe] border border-[#93c5fd] rounded-lg">
              <span className="text-sm text-[#1e40af]">
                {t("comments.replying_to")}{" "}
                {comments.find((c) => c.id === replyingTo)?.user}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setReplyingTo(null)}
                className="h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div className="relative">
            <Textarea
              placeholder={t("comments.add_comment_placeholder")}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="border-2 border-[#ede9fe] rounded-xl min-h-[100px] pr-24"
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setShowMentions(!showMentions)}
                className="h-8 w-8 text-[#9333ea] hover:bg-[#f5f3ff]"
              >
                <AtSign className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-[#9333ea] hover:bg-[#f5f3ff]"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-[#705add] text-white hover:bg-[#5b21b6] rounded-lg gap-1 h-8"
              >
                <Send className="h-3 w-3" />
                {t("comments.post")}
              </Button>
            </div>
          </div>
          {showMentions && (
            <div className="p-2 bg-white border-2 border-[#ede9fe] rounded-xl shadow-lg">
              <p className="text-xs text-[#9333ea] mb-2 px-2">
                {t("comments.mention_someone")}
              </p>
              <div className="space-y-1">
                {teamMembers.map((member) => (
                  <button
                    key={member}
                    onClick={() => handleMention(member)}
                    className="w-full flex items-center gap-2 p-2 hover:bg-[#f5f3ff] rounded-lg text-left"
                  >
                    <Avatar className="h-6 w-6 border border-[#ede9fe]">
                      <AvatarFallback className="bg-[#705add] text-white text-xs">
                        {getInitials(member)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-[#4c1d95]">{member}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments List */}
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {comments.map((comment) => renderComment(comment))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}