import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import thTranslations from "./locales/th.json";
import newFeaturesTranslations from "./locales/new-features.json";
import customerInsightsEn from "./locales/customer-insights-en.json";
import customerInsightsTh from "./locales/customer-insights-th.json";
import comprehensiveEn from "./locales/comprehensive-en.json";
import comprehensiveTh from "./locales/comprehensive-th.json";

// Deep merge function to properly merge nested objects
function deepMerge(target: any, source: any): any {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

// Merge English translations with proper deep merging
const mergedEnTranslations = deepMerge(
  deepMerge(
    deepMerge(enTranslations, comprehensiveEn),
    customerInsightsEn
  ),
  {
    ...comprehensiveEn, // Preserve root-level keys from comprehensive translations
    nav: {
      ...enTranslations.nav,
      ...newFeaturesTranslations.nav,
    },
    notifications: {
      ...newFeaturesTranslations.notifications
    },
    search: {
      ...newFeaturesTranslations.search
    },
    documents: {
      ...newFeaturesTranslations.documents
    },
    deals: {
      ...enTranslations.deals,
      ...newFeaturesTranslations.deals,
      ...comprehensiveEn.deals
    },
    admin: {
      ...comprehensiveEn.admin
    }
  }
);

// Merge Thai translations with proper deep merging
const mergedThTranslations = deepMerge(
  deepMerge(
    deepMerge(thTranslations, comprehensiveTh),
    customerInsightsTh
  ),
  {
    ...comprehensiveTh, // Preserve root-level keys from comprehensive translations
    nav: {
      ...thTranslations.nav
    },
    status: {
      ...thTranslations.status,
      ...comprehensiveTh.status
    },
    notifications: {
      title: "การแจ้งเตือน",
      unread: "ยังไม่ได้อ่าน",
      mark_all_read: "ทำเครื่องหมายว่าอ่านทั้งหมด",
      no_notifications: "ไม่มีการแจ้งเตือน",
      all_caught_up: "คุณติดตามข่าวสารทั้งหมดแล้ว!",
      approval_pending: "รอการอนุมัติ",
      deal_won: "ดีลสำเร็จ",
      task_overdue: "To Do เลยกำหนด",
      new_customer: "เพิ่มลูกค้าใหม่",
      task_assigned: "มอบหมาย To Do",
      approval_approved: "อนุมัติแล้ว",
      deal_stale: "ดีลค้างนาน",
      view_all: "ดูการแจ้งเตือนทั้งหมด"
    },
    search: {
      placeholder: "ค้นหา...",
      title: "ค้นหาทั่วระบบ",
      search_everything: "ค้นหาดีล, ลูกค้า, ใบเสนอราคา, สัญญา, To Do...",
      start_typing: "เริ่มพิมพ์เพื่อค้นหา",
      search_hint: "ค้นหาข้ามดีล, ลูกค้า, ใบเสนอราคา และอื่นๆ",
      no_results: "ไม่พบผลลัพธ์",
      try_different: "ลองใช้คำค้นหาอื่น",
      type_deal: "ดีล",
      type_customer: "ลูกค้า",
      type_quotation: "ใบเสนอราคา",
      type_contract: "สัญญา",
      type_task: "To Do",
      navigate: "นำทาง",
      select: "เลือก",
      close: "ปิด"
    },
    documents: {
      title: "การจัดการเอกสาร",
      files: "ไฟล์",
      upload: "อัปโหลดไฟล์",
      search: "ค้นหาเอกสาร...",
      all_categories: "ทุกหมวดหมู่",
      category_invoice: "ใบแจ้งหนี้",
      category_contract: "สัญญา",
      category_quotation: "ใบเสนอราคา",
      category_bol: "ใบตราส่ง",
      category_certificate: "ใบรับรอง",
      category_other: "อื่นๆ",
      no_documents: "ไม่พบเอกสาร",
      upload_first: "อัปโหลดเอกสารแรกของคุณ"
    },
    deals: {
      ...thTranslations.deals,
      ...comprehensiveTh.deals,
      pipeline_view: "Sales Pipeline",
      drag_drop_hint: "ลากและวางดีลเพื่อย้ายระหว่างขั้นตอน",
      total_pipeline: "มูลค่า Pipeline ทั้งหมด",
      weighted_value: "มูลค่าถ่วงน้ำหนัก",
      stage_lead: "ลีด",
      stage_contact: "ติดต่อแล้ว",
      stage_needs_analysis: "วิเคราะห์ความต้องการ",
      stage_proposal: "ส่งข้อเสนอแล้ว",
      stage_negotiation: "เจรจา",
      stage_closed_won: "ปิดการขายสำเร็จ",
      no_deals: "ไม่มีดีลในขั้นตอนนี้",
      probability: "โอกาสสำเร็จ",
      deal_value: "มูลค่าดีล",
      deals: "ดีล"
    },
    admin: {
      ...comprehensiveTh.admin
    }
  }
);

// Debug log to verify status is included
if (typeof window !== 'undefined') {
  console.log('Thai translations status:', mergedThTranslations.status);
}

// Get initial language from localStorage or default to Thai
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("language") || "th";
  }
  return "th";
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: mergedEnTranslations,
      },
      th: {
        translation: mergedThTranslations,
      },
    },
    lng: getInitialLanguage(),
    fallbackLng: "th",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Disable suspense mode for better compatibility
    },
  });

// Listen for language changes and update localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("language", lng);
  }
});

export default i18n;