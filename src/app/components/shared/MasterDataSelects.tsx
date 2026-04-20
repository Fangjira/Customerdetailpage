import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
  LEAD_TYPES,
  CUSTOMER_TYPES,
  SALES_CHANNELS,
  INDUSTRIES,
  SUPPLY_CHAIN_ROLES,
  BUSINESS_GROUPS,
  SUBSIDIARIES,
  TASK_TYPES,
  PROJECT_TYPES,
  getSubBusinessGroups,
  getProductGroups,
} from "../../../config/masterData";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function LeadTypeSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectLeadType")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectLeadType")} />
        </SelectTrigger>
        <SelectContent>
          {LEAD_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {t(type.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function CustomerTypeSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectCustomerType")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectCustomerType")} />
        </SelectTrigger>
        <SelectContent>
          {CUSTOMER_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {t(type.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SalesChannelSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectSalesChannel")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectSalesChannel")} />
        </SelectTrigger>
        <SelectContent>
          {SALES_CHANNELS.map((channel) => (
            <SelectItem key={channel.value} value={channel.value}>
              {t(channel.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function IndustrySelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectIndustry")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectIndustry")} />
        </SelectTrigger>
        <SelectContent>
          {INDUSTRIES.map((industry) => (
            <SelectItem key={industry.value} value={industry.value}>
              {t(industry.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SupplyChainRoleSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectSupplyChainRole")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectSupplyChainRole")} />
        </SelectTrigger>
        <SelectContent>
          {SUPPLY_CHAIN_ROLES.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {t(role.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs text-[#9333ea] mt-1">
        <InfoCircledIcon className="inline h-3 w-3 mr-1" />
        {t("masterData.supplyChainRoleInfo")}
      </p>
    </div>
  );
}

interface BusinessHierarchySelectProps {
  businessGroup: string;
  subBusinessGroup: string;
  productGroup: string;
  onBusinessGroupChange: (value: string) => void;
  onSubBusinessGroupChange: (value: string) => void;
  onProductGroupChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export function BusinessHierarchySelect({
  businessGroup,
  subBusinessGroup,
  productGroup,
  onBusinessGroupChange,
  onSubBusinessGroupChange,
  onProductGroupChange,
  required,
  disabled,
}: BusinessHierarchySelectProps) {
  const { t } = useTranslation();
  
  const subBusinessGroups = getSubBusinessGroups(businessGroup);
  const productGroups = getProductGroups(subBusinessGroup);
  
  const handleBusinessGroupChange = (value: string) => {
    onBusinessGroupChange(value);
    onSubBusinessGroupChange("");
    onProductGroupChange("");
  };
  
  const handleSubBusinessGroupChange = (value: string) => {
    onSubBusinessGroupChange(value);
    onProductGroupChange("");
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label>
          {t("masterData.selectBusinessGroup")} {required && <span className="text-red-500">*</span>}
        </Label>
        <Select value={businessGroup} onValueChange={handleBusinessGroupChange} disabled={disabled}>
          <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
            <SelectValue placeholder={t("masterData.selectBusinessGroup")} />
          </SelectTrigger>
          <SelectContent>
            {BUSINESS_GROUPS.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {t(group.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-[#9333ea] mt-1">
          <InfoCircledIcon className="inline h-3 w-3 mr-1" />
          {t("masterData.businessGroupInfo")}
        </p>
      </div>
      
      <div>
        <Label>
          {t("masterData.selectSubBusinessGroup")}
        </Label>
        <Select
          value={subBusinessGroup}
          onValueChange={handleSubBusinessGroupChange}
          disabled={disabled || !businessGroup || subBusinessGroups.length === 0}
        >
          <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
            <SelectValue placeholder={t("masterData.selectSubBusinessGroup")} />
          </SelectTrigger>
          <SelectContent>
            {subBusinessGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {t(group.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-[#9333ea] mt-1">
          <InfoCircledIcon className="inline h-3 w-3 mr-1" />
          {t("masterData.subBusinessGroupInfo")}
        </p>
      </div>
      
      <div>
        <Label>
          {t("masterData.selectProductGroup")}
        </Label>
        <Select
          value={productGroup}
          onValueChange={onProductGroupChange}
          disabled={disabled || !subBusinessGroup || productGroups.length === 0}
        >
          <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
            <SelectValue placeholder={t("masterData.selectProductGroup")} />
          </SelectTrigger>
          <SelectContent>
            {productGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {t(group.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-[#9333ea] mt-1">
          <InfoCircledIcon className="inline h-3 w-3 mr-1" />
          {t("masterData.productGroupInfo")}
        </p>
      </div>
    </div>
  );
}

export function SubsidiarySelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        {t("masterData.selectSubsidiary")} {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder={t("masterData.selectSubsidiary")} />
        </SelectTrigger>
        <SelectContent>
          {SUBSIDIARIES.map((subsidiary) => (
            <SelectItem key={subsidiary.value} value={subsidiary.value}>
              <span className="flex items-center gap-2">
                <span className="text-xs bg-[#ede9fe] text-[#705add] px-2 py-0.5 rounded">
                  {subsidiary.country}
                </span>
                {t(subsidiary.labelKey)}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function TaskTypeSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        Task Type {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder="Select Task Type" />
        </SelectTrigger>
        <SelectContent>
          {TASK_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {t(type.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProjectTypeSelect({ value, onValueChange, required, disabled, className }: SelectProps) {
  const { t } = useTranslation();
  
  return (
    <div className={className}>
      <Label>
        Project Type {required && <span className="text-red-500">*</span>}
      </Label>
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger className="border-2 border-[#ede9fe] rounded-xl focus:border-[#705add] mt-1">
          <SelectValue placeholder="Select Project Type" />
        </SelectTrigger>
        <SelectContent>
          {PROJECT_TYPES.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {t(type.labelKey)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
