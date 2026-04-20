import { Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";

interface PageDescriptionProps {
  pageKey: string;
  className?: string;
}

export function PageDescription({ pageKey, className = "" }: PageDescriptionProps) {
  const { t } = useTranslation();

  // Check if page description exists
  const whatKey = `page_desc.${pageKey}.what`;
  const useKey = `page_desc.${pageKey}.use`;
  const benefitKey = `page_desc.${pageKey}.benefit`;

  const whatText = t(whatKey);
  const useText = t(useKey);
  const benefitText = t(benefitKey);

  // If no translation found, don't render
  if (whatText === whatKey) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 w-8 p-0 text-muted-foreground hover:text-foreground ${className}`}
        >
          <Info className="h-4 w-4" />
          <span className="sr-only">Page information</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px]" align="start">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm mb-1 text-foreground">
              {t("page_desc_labels.what", "What is this page?")}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {whatText}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1 text-foreground">
              {t("page_desc_labels.use", "What is it used for?")}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {useText}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1 text-foreground">
              {t("page_desc_labels.benefit", "Benefits")}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {benefitText}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
