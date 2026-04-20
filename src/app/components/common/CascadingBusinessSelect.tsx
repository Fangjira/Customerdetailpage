import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { masterData, getSubGroups, getProductGroups } from "../../../data/masterData";

interface CascadingBusinessSelectProps {
  businessGroup?: string;
  subBusinessGroup?: string;
  productGroup?: string;
  onBusinessGroupChange: (value: string) => void;
  onSubBusinessGroupChange: (value: string) => void;
  onProductGroupChange: (value: string) => void;
  disabled?: boolean;
}

export function CascadingBusinessSelect({
  businessGroup,
  subBusinessGroup,
  productGroup,
  onBusinessGroupChange,
  onSubBusinessGroupChange,
  onProductGroupChange,
  disabled = false,
}: CascadingBusinessSelectProps) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language as 'th' | 'en';
  
  const [subGroups, setSubGroups] = useState<Array<{ value: string; label: { en: string; th: string } }>>([]);
  const [productGroups, setProductGroups] = useState<Array<{ value: string; label: { en: string; th: string } }>>([]);

  // Update sub groups when business group changes
  useEffect(() => {
    if (businessGroup) {
      const groups = getSubGroups(businessGroup);
      setSubGroups(groups);
      
      // Reset child selections
      if (subBusinessGroup && !groups.find(g => g.value === subBusinessGroup)) {
        onSubBusinessGroupChange('');
        onProductGroupChange('');
      }
    } else {
      setSubGroups([]);
      setProductGroups([]);
    }
  }, [businessGroup]);

  // Update product groups when sub business group changes
  useEffect(() => {
    if (businessGroup && subBusinessGroup) {
      const groups = getProductGroups(businessGroup, subBusinessGroup);
      setProductGroups(groups);
      
      // Reset child selection
      if (productGroup && !groups.find(g => g.value === productGroup)) {
        onProductGroupChange('');
      }
    } else {
      setProductGroups([]);
    }
  }, [businessGroup, subBusinessGroup]);

  const businessGroups = Object.entries(masterData.businessHierarchy).map(([key, value]) => ({
    value: key,
    label: value.label,
  }));

  return (
    <div className="space-y-4">
      {/* Business Group */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t('common.business_group')}
        </label>
        <Select
          value={businessGroup}
          onValueChange={(value) => {
            onBusinessGroupChange(value);
            onSubBusinessGroupChange('');
            onProductGroupChange('');
          }}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('common.select_business_group')} />
          </SelectTrigger>
          {/* อัปเกรด: ใส่ Z-index ให้ทะลุ Modal และบังคับพื้นหลังสีขาว */}
          <SelectContent className="z-[100000] pointer-events-auto bg-white border border-[#ede9fe] shadow-lg">
            {businessGroups.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label[locale]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sub Business Group */}
      {businessGroup && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('common.sub_business_group')}
          </label>
          <Select
            value={subBusinessGroup}
            onValueChange={(value) => {
              onSubBusinessGroupChange(value);
              onProductGroupChange('');
            }}
            disabled={disabled || !businessGroup}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('common.select_sub_business_group')} />
            </SelectTrigger>
            {/* อัปเกรด: ใส่ Z-index ให้ทะลุ Modal และบังคับพื้นหลังสีขาว */}
            <SelectContent className="z-[100000] pointer-events-auto bg-white border border-[#ede9fe] shadow-lg">
              {subGroups.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Product Group */}
      {subBusinessGroup && (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {t('common.product_group')}
          </label>
          <Select
            value={productGroup}
            onValueChange={onProductGroupChange}
            disabled={disabled || !subBusinessGroup}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('common.select_product_group')} />
            </SelectTrigger>
            {/* อัปเกรด: ใส่ Z-index ให้ทะลุ Modal และบังคับพื้นหลังสีขาว */}
            <SelectContent className="z-[100000] pointer-events-auto bg-white border border-[#ede9fe] shadow-lg">
              {productGroups.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.label[locale]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}