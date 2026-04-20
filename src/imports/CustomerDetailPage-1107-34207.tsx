import svgPaths from "./svg-a7iweihyjj";

function Icon() {
  return (
    <div className="absolute left-[40.84px] size-[15.988px] top-[5.27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34256)" id="Icon">
          <path d={svgPaths.p3f362200} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p34611600} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.6617 5.99553H5.32936" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 8.66022H5.32936" id="Vector_4" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 11.3249H5.32936" id="Vector_5" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34256">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white border-[1.223px] border-[rgba(0,0,0,0)] border-solid h-[28.977px] left-[3px] rounded-[18px] top-[3.5px] w-[166.223px]" data-name="Primitive.button">
      <Icon />
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] left-[94.82px] text-[#1a1a2e] text-[12px] text-center top-[4.27px]">รายละเอียด</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[48.94px] size-[15.988px] top-[5.27px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34294)" id="Icon">
          <path d={svgPaths.p288d7e00} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 10.6587V7.99405" id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 5.32936H8.00071" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34294">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid h-[28.977px] left-[169.22px] rounded-[18px] top-[3.5px] w-[166.223px]" data-name="Primitive.button">
      <Icon1 />
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] left-[94.92px] text-[#1a1a2e] text-[12px] text-center top-[4.27px]">ภาพรวม</p>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[#e6f0ff] h-[35.988px] relative rounded-[18px] shrink-0 w-[338.443px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p3542f400} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[72.357px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#101828] text-[14px]">รายละเอียด</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[19.999px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon2 />
      <Heading2 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[97.418px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#4a5565] text-[12px] top-[-1.78px] w-[312px] whitespace-pre-wrap">Global Freight Solutions is looking to establish a long-term partnership for international air freight services. They require reliable transportation of high-value electronics from Asia to North America, with monthly volumes averaging 500kg.</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[335.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.984px] items-start pt-[11.996px] px-[11.996px] relative size-full">
        <Container2 />
        <Paragraph />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[163.835px] items-start p-[1.223px] relative rounded-[18px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <Container1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34263)" id="Icon">
          <path d={svgPaths.p2dbf7f00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M9.99256 11.9911H5.99553" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p3a9e4b00} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p1047e200} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p38574600} id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34263">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[51.613px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#101828] text-[14px]">Services</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[19.999px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon3 />
      <Heading3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="flex-[1_0_0] h-[15.988px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[8px] relative size-full">
        <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Air Freight - International</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[51.555px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#101828] text-[12px]">$225,000</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#4a5565] text-[12px] whitespace-pre-wrap">500 kg/month • $450/unit</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#f9fafb] h-[54.382px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[3.992px] items-start pb-[1.223px] pt-[9.207px] px-[9.207px] relative size-full">
        <Container8 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="flex-[1_0_0] h-[15.988px] min-h-px min-w-px relative" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[8px] relative size-full">
        <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Customs Clearance</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[44.641px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#101828] text-[12px]">$24,000</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#4a5565] text-[12px] whitespace-pre-wrap">Monthly • $2,000/unit</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#f9fafb] h-[54.382px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[3.992px] items-start pb-[1.223px] pt-[9.207px] px-[9.207px] relative size-full">
        <Container10 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 pr-[8px] top-0 w-[255.848px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Insurance Coverage</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[255.85px] top-0 w-[37.745px]" data-name="Paragraph">
      <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#101828] text-[12px]">$5,000</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#4a5565] text-[12px] whitespace-pre-wrap">Annual • $5,000/unit</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#f9fafb] h-[54.382px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[3.992px] items-start pb-[1.223px] pt-[9.207px] px-[9.207px] relative size-full">
        <Container12 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[83.092px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#101828] text-[14px]">Annual Total</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24.011px] relative shrink-0 w-[68.728px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#1c398e] text-[16px] top-[-1.78px]">$254,000</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex h-[24.011px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[#eff6ff] h-[42.425px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.223px] pt-[9.207px] px-[9.207px] relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col gap-[7.984px] h-[229.526px] items-start relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container9 />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[293.497px] relative shrink-0 w-[335.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.985px] items-start pt-[11.996px] px-[11.996px] relative size-full">
        <Container5 />
        <Container6 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[295.942px] items-start p-[1.223px] relative rounded-[18px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <Container4 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34274)" id="Icon">
          <path d={svgPaths.p3f362200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p34611600} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.6617 5.99553H5.32936" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 8.66022H5.32936" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 11.3249H5.32936" id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34274">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[73.618px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#101828] text-[14px]">Project Info</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[19.999px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <Heading4 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[50.123px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px]">Task Type</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[25.73px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#101828] text-[12px]">Lead</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[15.988px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function PrimitiveDiv1() {
  return <div className="bg-[rgba(123,201,166,0.15)] h-[0.993px] shrink-0 w-full" data-name="Primitive.div" />;
}

function Text4() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[64.736px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px]">Project Type</p>
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[86.263px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#101828] text-[12px]">Solution Design</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text4 />
          <Text5 />
        </div>
      </div>
    </div>
  );
}

function PrimitiveDiv2() {
  return <div className="bg-[rgba(123,201,166,0.15)] h-[0.993px] shrink-0 w-full" data-name="Primitive.div" />;
}

function Text6() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[42.96px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#6a7282] text-[12px]">Industry</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[58.126px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#101828] text-[12px]">Electronics</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Text6 />
          <Text7 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col gap-[7.985px] h-[81.889px] items-start relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <PrimitiveDiv1 />
      <Container20 />
      <PrimitiveDiv2 />
      <Container21 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[145.86px] relative shrink-0 w-[335.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.985px] items-start pt-[11.996px] px-[11.996px] relative size-full">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[148.305px] items-start p-[1.223px] relative rounded-[18px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <Container16 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34274)" id="Icon">
          <path d={svgPaths.p3f362200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p34611600} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.6617 5.99553H5.32936" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 8.66022H5.32936" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 11.3249H5.32936" id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34274">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-[46.971px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[20px] relative shrink-0 text-[#101828] text-[14px]">เอกสาร</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[19.999px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <Heading5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[13.982px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9824 13.9824">
        <g clipPath="url(#clip0_1107_34249)" id="Icon">
          <path d={svgPaths.p2951b600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d={svgPaths.p1719b180} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M5.82601 5.24341H4.66081" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 7.57381H4.66081" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 9.90421H4.66081" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34249">
            <rect fill="white" height="13.9824" width="13.9824" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[4px] shrink-0 size-[27.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.019px] relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Service_Proposal_v2.pdf</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">2.4 MB</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph10 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p18968b80} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p27a57b40} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 9.99256V1.99851" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[27.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#f9fafb] h-[50.39px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[9.207px] py-[1.223px] relative size-full">
          <Container27 />
          <Button />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[13.982px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9824 13.9824">
        <g clipPath="url(#clip0_1107_34249)" id="Icon">
          <path d={svgPaths.p2951b600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d={svgPaths.p1719b180} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M5.82601 5.24341H4.66081" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 7.57381H4.66081" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 9.90421H4.66081" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34249">
            <rect fill="white" height="13.9824" width="13.9824" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[4px] shrink-0 size-[27.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.019px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 overflow-clip top-0 w-[229.64px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Company_Profile.pdf</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-[15.99px] w-[229.64px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">1.8 MB</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p18968b80} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p27a57b40} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 9.99256V1.99851" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[27.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#f9fafb] h-[50.39px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[9.207px] py-[1.223px] relative size-full">
          <Container31 />
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[13.982px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9824 13.9824">
        <g clipPath="url(#clip0_1107_34249)" id="Icon">
          <path d={svgPaths.p2951b600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d={svgPaths.p1719b180} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M5.82601 5.24341H4.66081" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 7.57381H4.66081" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
          <path d="M9.32161 9.90421H4.66081" id="Vector_5" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1652" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34249">
            <rect fill="white" height="13.9824" width="13.9824" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="bg-[#dbeafe] relative rounded-[4px] shrink-0 size-[27.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.019px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Route_Analysis.xlsx</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">856 KB</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[1_0_0] h-[31.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p18968b80} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p27a57b40} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 9.99256V1.99851" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[27.984px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#f9fafb] h-[50.39px] relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[9.207px] py-[1.223px] relative size-full">
          <Container35 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[5.998px] h-[163.166px] items-start relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container30 />
      <Container34 />
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[227.138px] relative shrink-0 w-[335.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.985px] items-start pt-[11.996px] px-[11.996px] relative size-full">
        <Container24 />
        <Container25 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[229.583px] items-start p-[1.223px] relative rounded-[18px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <Container23 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[338.443px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[11.996px] items-start relative size-full">
        <Container />
        <Container3 />
        <Container15 />
        <Container22 />
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col gap-[19.98px] h-[929.621px] items-start left-[15.99px] top-[288.4px] w-[338.443px]" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d="M2.66468 7.99405H13.3234" id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M2.66468 3.99702H13.3234" id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M2.66468 11.9911H13.3234" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p7026000} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p23d72c80} id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f9fafb] h-[30.429px] relative rounded-[14px] shrink-0 w-[34.402px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[9.207px] pr-[1.223px] py-[1.223px] relative size-full">
        <Icon13 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[31.995px] relative shrink-0 w-[74.382px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Button3 />
        <Button4 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[13.581px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-center text-white">TC</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="flex-[1_0_0] h-[31.995px] min-h-px min-w-px relative rounded-[41020500px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(74, 222, 128) 0%, rgb(0, 188, 125) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
          <Text8 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="flex-[1_0_0] h-[31.995px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button5 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="relative shrink-0 size-[31.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.996px] relative size-full">
          <Container39 />
          <Container40 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[57.209px] items-start left-0 pb-[1.223px] top-0 w-[370.419px]" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container38 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[72.968px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#9810fa] text-[12px]">DL-2024-001</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="bg-[#f3e8ff] h-[22.406px] relative rounded-[12px] shrink-0 w-[127.943px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.223px] py-[3.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#8200db] text-[12px]">Negotiating Process</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="bg-[#dcfce7] h-[22.406px] relative rounded-[12px] shrink-0 w-[37.611px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[7.223px] py-[3.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#008236] text-[12px]">75%</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[22.406px] items-center relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
      <Text11 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[24.011px] overflow-clip relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arimo:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] top-[-1.78px]">International Freight Contract</p>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[6px] size-[11.996px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9958 11.9958">
        <g clipPath="url(#clip0_1107_34270)" id="Icon">
          <path d="M5.99792 0.999654V10.9962" id="Vector" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.p1c7136c0} id="Vector_2" stroke="var(--stroke-0, #00A63E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34270">
            <rect fill="white" height="11.9958" width="11.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[6px] top-[19.98px] w-[65.672px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">$254,000</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[1.223px] border-solid h-[44.411px] left-0 rounded-[4px] top-0 w-[80.112px]" data-name="Container">
      <Icon14 />
      <Paragraph16 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[6px] size-[11.996px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9958 11.9958">
        <g clipPath="url(#clip0_1107_34243)" id="Icon">
          <path d="M3.99861 0.999654V2.99896" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d="M7.99723 0.999654V2.99896" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.pf369920} id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d="M1.49948 4.99827H10.4964" id="Vector_4" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34243">
            <rect fill="white" height="11.9958" width="11.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[6px] top-[19.98px] w-[65.672px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">Jan 15</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[#eff6ff] border-[#bedbff] border-[1.223px] border-solid h-[44.411px] left-[86.11px] rounded-[4px] top-0 w-[80.112px]" data-name="Container">
      <Icon15 />
      <Paragraph17 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[6px] size-[11.996px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9958 11.9958">
        <g clipPath="url(#clip0_1107_34233)" id="Icon">
          <path d={svgPaths.p713e000} id="Vector" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.pbe0dc00} id="Vector_2" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.p31b29f00} id="Vector_3" stroke="var(--stroke-0, #E17100)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34233">
            <rect fill="white" height="11.9958" width="11.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[6px] top-[19.98px] w-[65.672px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">75%</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[#fffbeb] border-[#fee685] border-[1.223px] border-solid h-[44.411px] left-[172.22px] rounded-[4px] top-0 w-[80.112px]" data-name="Container">
      <Icon16 />
      <Paragraph18 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[6px] size-[11.996px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9958 11.9958">
        <g clipPath="url(#clip0_1107_34226)" id="Icon">
          <path d={svgPaths.p2526ad00} id="Vector" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d="M7.4974 8.99688H4.49844" id="Vector_2" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.pc144480} id="Vector_3" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.pb5b4600} id="Vector_4" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
          <path d={svgPaths.p27658af0} id="Vector_5" stroke="var(--stroke-0, #9810FA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.999654" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34226">
            <rect fill="white" height="11.9958" width="11.9958" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[6px] top-[19.98px] w-[65.672px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#faf5ff] border-[#e9d4ff] border-[1.223px] border-solid h-[44.411px] left-[258.33px] rounded-[4px] top-0 w-[80.112px]" data-name="Container">
      <Icon17 />
      <Paragraph19 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[44.411px] relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <Container47 />
      <Container48 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="bg-gradient-to-r from-[#155dfc] h-[5.998px] rounded-[41020500px] shrink-0 to-[#9810fa] w-full" data-name="Container" />;
}

function Container50() {
  return (
    <div className="bg-[#e5e7eb] h-[5.998px] relative rounded-[41020500px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pr-[101.544px] relative size-full">
        <Container51 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[156.767px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[7.984px] items-start pt-[15.988px] px-[15.988px] relative size-full">
        <Container44 />
        <Heading1 />
        <Container45 />
        <Container50 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[157.99px] items-start left-0 pb-[1.223px] top-[114.42px] w-[370.419px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <Container43 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p393a8580} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon18 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[24.011px] min-h-px min-w-px relative" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] top-[-1.78px]">รายละเอียดดีล</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34214)" id="Icon">
          <path d={svgPaths.p288d7e00} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p55fd780} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34214">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34281)" id="Icon">
          <path d={svgPaths.p1542d180} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p3e624480} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34281">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon20 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[31.995px] relative shrink-0 w-[71.975px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.996px] items-center px-[15.988px] relative size-full">
          <Button6 />
          <Heading />
          <Container54 />
        </div>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[57.209px] items-start left-0 pb-[1.223px] top-[57.21px] w-[370.419px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container53 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] h-[853.309px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <PrimitiveDiv />
        <Header />
        <Container42 />
        <Container52 />
      </div>
    </div>
  );
}

function PQ() {
  return (
    <div className="absolute bg-[#f5f9ff] content-stretch flex h-[853.309px] items-start left-0 top-0 w-[393.647px]" data-name="pQ">
      <MainContent />
    </div>
  );
}

function Icon21() {
  return (
    <div className="absolute left-[33.58px] size-[15.988px] top-[12.78px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_34256)" id="Icon">
          <path d={svgPaths.p3f362200} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p34611600} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.6617 5.99553H5.32936" id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 8.66022H5.32936" id="Vector_4" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M10.6587 11.3249H5.32936" id="Vector_5" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_34256">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid h-[43.991px] left-0 rounded-[12px] top-0 w-[174.838px]" data-name="Button">
      <Icon21 />
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[102.54px] text-[#1a1a2e] text-[14px] text-center top-[8.77px]">ใบเสนอราคา</p>
    </div>
  );
}

function Icon22() {
  return (
    <div className="absolute left-[43.74px] size-[15.988px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.p18968b80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p27a57b40} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 9.99256V1.99851" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute bg-[#9810fa] h-[43.991px] left-[186.83px] rounded-[12px] top-0 w-[174.838px]" data-name="Button">
      <Icon22 />
      <p className="-translate-x-1/2 absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-[103.7px] text-[14px] text-center text-white top-[10px]">Proposal</p>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[43.991px] relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[77.19px] items-start left-0 pt-[17.211px] px-[15.988px] top-[776.12px] w-[393.647px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.223px] inset-0 pointer-events-none" />
      <Container56 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="absolute left-[20px] size-[15.988px] top-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d="M3.33085 7.99405H12.6572" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 3.33085V12.6572" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute left-[313.67px] rounded-[41020500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[55.987px] top-[746.34px]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(16, 214, 143) 100%)" }}>
      <Icon23 />
    </div>
  );
}

export default function CustomerDetailPage() {
  return (
    <div className="bg-white relative size-full" data-name="Customer Detail Page">
      <PQ />
      <Container55 />
      <Button11 />
    </div>
  );
}