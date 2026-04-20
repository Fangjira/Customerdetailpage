declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';

  interface UserOptions {
    head?: any[][];
    body?: any[][];
    foot?: any[][];
    startY?: number;
    margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
    pageBreak?: string;
    rowPageBreak?: string;
    tableWidth?: string | number;
    showHead?: string | boolean;
    showFoot?: string | boolean;
    tableLineWidth?: number;
    tableLineColor?: number | number[];
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: any;
    bodyStyles?: any;
    footStyles?: any;
    alternateRowStyles?: any;
    columnStyles?: any;
    styles?: any;
    didDrawPage?: (data: any) => void;
    didDrawCell?: (data: any) => void;
    willDrawCell?: (data: any) => void;
    didParseCell?: (data: any) => void;
    [key: string]: any;
  }

  export default function autoTable(doc: jsPDF, options: UserOptions): jsPDF;
}
