import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Mail, Phone, User, Pencil } from "lucide-react";

interface CustomerProfileCardProps {
  name: string;
  email: string;
  phone: string;
  salesOwner: string;
  onEdit?: () => void;
}

export function CustomerProfileCard({
  name,
  email,
  phone,
  salesOwner,
  onEdit,
}: CustomerProfileCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-500 text-white">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-1">{name}</h2>
              </div>
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Sales Owner: {salesOwner}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
