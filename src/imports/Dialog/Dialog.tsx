import svgPaths from "./svg-pe927xbd7z";

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[28px] left-[-0.19px] not-italic text-[#101828] text-[20px] top-[-0.8px] tracking-[-0.5px] whitespace-nowrap">เข้าพบลูกค้า - Visit customer: SCGJWD Bangsue</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#eff6ff] h-[21px] relative rounded-[4px] shrink-0 w-[48px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.2px] py-[3.2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[15px] not-italic relative shrink-0 text-[#1447e6] text-[10px] whitespace-nowrap">TODO</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#dbeafe] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#fef2f2] h-[21px] relative rounded-[4px] shrink-0 w-[44px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.2px] py-[3.2px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[15px] not-italic relative shrink-0 text-[#c10007] text-[10px] whitespace-nowrap">HIGH</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#ffe2e2] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[7.662px] h-[21px] items-center pl-[-0.369px] relative shrink-0 w-full" data-name="Container">
      <Badge />
      <Badge1 />
    </div>
  );
}

function Container() {
  return (
    <div className="h-[55px] relative shrink-0 w-[443px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[6.175px] items-start pt-[-0.178px] relative size-full">
        <Heading />
        <Container1 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f5f9ff] h-[32px] relative rounded-[12px] shrink-0 w-[42px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#fccac8] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_0px_0px_0px_rgba(123,201,166,0.02)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[13.2px] py-[1.2px] relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#e7000b] text-[12px] text-center whitespace-nowrap">ลบ</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon">
          <path d={svgPaths.p15da2270} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p108aee80} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white relative rounded-[40265300px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[40265300px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[8.013px] pr-[7.994px] py-[1.2px] relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[82px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8.131px] items-start pl-[0.013px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function TaskDetailDialog() {
  return (
    <div className="absolute bg-white content-stretch flex h-[97px] items-start justify-between left-[-0.2px] pb-[21.2px] pl-[20.078px] pr-[20.025px] pt-[20.219px] top-[0.2px] w-[982px]" data-name="TaskDetailDialog">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.2px] border-solid inset-0 pointer-events-none" />
      <Container />
      <Container2 />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-white flex-[204_0_0] h-[31px] min-w-px relative rounded-[18px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[1.2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[41.2px] py-[5.2px] relative size-full">
          <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1a1a2e] text-[12px] text-center whitespace-nowrap">รายละเอียด</p>
        </div>
      </div>
    </div>
  );
}

function Tab1() {
  return (
    <div className="flex-[204_0_0] h-[31px] min-w-px relative rounded-[18px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[1.2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[41.2px] py-[5.2px] relative size-full">
          <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1a1a2e] text-[12px] text-center whitespace-nowrap">กิจกรรม</p>
        </div>
      </div>
    </div>
  );
}

function Tab2() {
  return (
    <div className="flex-[204_0_0] h-[31px] min-w-px relative rounded-[18px]" data-name="Tab">
      <div aria-hidden="true" className="absolute border-[1.2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[18px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[41.2px] py-[5.2px] relative size-full">
          <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1a1a2e] text-[12px] text-center whitespace-nowrap">เกี่ยวข้อง</p>
        </div>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[rgba(229,231,235,0.6)] h-[40px] relative rounded-[14px] shrink-0 w-[620px]" data-name="Tab List">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[0.047px] items-center justify-center pl-[3.944px] pr-[3.953px] py-[4px] relative size-full">
        <Tab />
        <Tab1 />
        <Tab2 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[-0.22px] size-[15.994px] top-[2px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_364)" id="Icon">
          <path d={svgPaths.p30ddcd80} id="Vector" stroke="var(--stroke-0, #1C398E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pdb2b5b0} id="Vector_2" stroke="var(--stroke-0, #1C398E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_364">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[231px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[23.76px] not-italic text-[#1c398e] text-[14px] top-[0.1px] uppercase whitespace-nowrap">{` Activity Full Information`}</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[rgba(239,246,255,0.2)] h-[53px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[1.2px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pb-[17.2px] pl-[16.35px] pr-[370.65px] pt-[16px] relative size-full">
          <Heading1 />
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[0.06px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_330)" id="Icon">
          <path d={svgPaths.p30ddcd80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pdb2b5b0} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_330">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[15px] relative shrink-0 w-[72px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[0.01px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">หัวข้อ TO-DO</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.05px] pr-[168.95px] relative size-full">
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] left-[0.06px] not-italic text-[#1e2939] text-[12px] top-[0.35px] whitespace-nowrap">customer_visit</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[241px]" data-name="Container">
      <Container10 />
      <Container11 />
    </div>
  );
}

function TitleTypeCombobox() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="TitleTypeCombobox">
      <Icon2 />
      <Container9 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[0.06px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_349)" id="Icon">
          <path d={svgPaths.p15eaac00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p2c7c2b00} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p9bee470} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.66404 3.99842H9.32966" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.66404 6.66404H9.32966" id="Vector_5" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.66404 9.32966H9.32966" id="Vector_6" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.66404 11.9953H9.32966" id="Vector_7" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_349">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[56px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.12px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">ลูกค้า / ลีด</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.184px] pr-[184.816px] relative size-full">
          <Paragraph1 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] left-[0.06px] not-italic text-[#1e2939] text-[12px] top-[0.35px] whitespace-nowrap">Pacific Distribution Co.</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[241px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function CustomerCombobox() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="CustomerCombobox">
      <Icon3 />
      <Container12 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[-0.22px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_345)" id="Icon">
          <path d={svgPaths.p32fd8e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p32908000} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_345">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[70px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[-0.06px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">START TIME</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[-0.166px] pr-[28.166px] relative size-full">
          <Paragraph2 />
        </div>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] left-[-0.23px] not-italic text-[#1e2939] text-[12px] top-[0.35px] whitespace-nowrap">10:00 AM</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[98px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function TimeSelector() {
  return (
    <div className="absolute h-[36px] left-[0.29px] top-0 w-[126px]" data-name="TimeSelector">
      <Icon4 />
      <Container16 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[-0.22px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_345)" id="Icon">
          <path d={svgPaths.p32fd8e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p32908000} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_345">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[56px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[15px] left-[0.09px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">END TIME</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[-0.309px] pr-[42.309px] relative size-full">
          <Paragraph3 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] left-[-0.22px] not-italic text-[#1e2939] text-[12px] top-[0.35px] whitespace-nowrap">12:00</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[98px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function TimeSelector1() {
  return (
    <div className="absolute h-[36px] left-[142.72px] top-0 w-[126px]" data-name="TimeSelector">
      <Icon5 />
      <Container19 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <TimeSelector />
      <TimeSelector1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24.469px] h-[177px] items-start left-[0.07px] pt-[0.281px] top-0 w-[269px]" data-name="Container">
      <TitleTypeCombobox />
      <CustomerCombobox />
      <Container15 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[4px] size-[15.994px] top-[-0.03px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_341)" id="Icon">
          <path d={svgPaths.p3edb4e80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pfaa7300} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_341">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[15px] relative shrink-0 w-[107px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[0.02px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">สถานที่ / ห้องประชุม</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[15px] mb-[-10px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.044px] pr-[133.956px] relative size-full">
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[39px] items-center mb-[-10px] relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">{`789 ถนนพระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10330 `}</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex flex-col h-[56px] items-start left-[28px] pb-[10px] pt-[0.006px] top-[-4.03px] w-[241px]" data-name="Container">
      <Container24 />
      <Container25 />
    </div>
  );
}

function Editable() {
  return (
    <div className="absolute h-[56px] left-0 top-[0.03px] w-[269px]" data-name="Editable">
      <Icon6 />
      <Container23 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[5px] size-[15.994px] top-0" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon">
          <path d={svgPaths.p32adaf00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M9.99606 3.84115V13.8372" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M5.99764 2.15648V12.1525" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[15px] relative shrink-0 w-[83px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[0.04px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">สาขา / ไซด์งาน</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.016px] pr-[157.984px] relative size-full">
          <Paragraph5 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">{`สำนักงานใหญ่ (HQ) `}</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[241px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Editable1() {
  return (
    <div className="absolute h-[36px] left-0 right-0 top-[56px]" data-name="Editable">
      <Icon7 />
      <Container26 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[6px] size-[15.994px] top-[-1px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon">
          <path d={svgPaths.p1228fd80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pd5b9360} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[0.8px] size-[13px] top-[0.8px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M2.70833 6.5H10.2917" id="Vector" stroke="var(--stroke-0, #67BB98)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.5 2.70833V10.2917" id="Vector_2" stroke="var(--stroke-0, #67BB98)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[#f0edff] border-[1.2px] border-dashed h-[17px] left-[123.96px] rounded-[12px] top-[-0.25px] w-[18px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[15px] relative shrink-0 w-[119px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.17px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">รายชื่อผู้ติดต่อฝั่งลูกค้า</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-center justify-between left-[-0.04px] pl-[0.231px] pr-[121.769px] right-[0.04px] top-[-0.25px]" data-name="Container">
      <Paragraph6 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-center left-[-0.04px] right-[0.04px] top-[15.75px]" data-name="Container">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">{`คุณเดวิด ลี - Logistics Manager `}</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute h-[36px] left-[28px] top-0 w-[241px]" data-name="Container">
      <Button2 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Editable2() {
  return (
    <div className="absolute h-[36px] left-0 right-0 top-[119px]" data-name="Editable">
      <Icon8 />
      <Container29 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[177px] left-[258.04px] top-[-0.17px] w-[312px]" data-name="Container">
      <Editable />
      <Editable1 />
      <Editable2 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[177px] mb-[-12px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container22 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[15px] left-0 right-0 top-[25.11px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[0.13px] not-italic text-[#99a1af] text-[10px] top-[0.21px] uppercase whitespace-nowrap">หัวข้อบริการที่เกี่ยวข้อง</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[24px] items-center justify-center left-[-0.01px] overflow-clip px-[8px] py-[2px] rounded-[12px] top-0 w-[51px]" data-name="Badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[15px] not-italic relative shrink-0 text-[#364153] text-[10px] whitespace-nowrap">Freight</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[24px] items-center justify-center left-[58.6px] overflow-clip px-[8px] py-[2px] rounded-[12px] top-0 w-[72px]" data-name="Badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[15px] not-italic relative shrink-0 text-[#364153] text-[10px] whitespace-nowrap">Warehouse</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute h-[24px] left-0 right-0 top-[48.08px]" data-name="Container">
      <Badge2 />
      <Badge3 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[0.8px] size-[13px] top-[0.8px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M2.70833 6.5H10.2917" id="Vector" stroke="var(--stroke-0, #67BB98)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M6.5 2.70833V10.2917" id="Vector_2" stroke="var(--stroke-0, #67BB98)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[#f0edff] border-[1.2px] border-dashed h-[17px] left-[102px] rounded-[12px] top-[23.58px] w-[18px]" data-name="Button">
      <Icon10 />
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[78px] mb-[-12px] relative shrink-0 w-[269px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f9fafb] border-solid border-t-[1.2px] inset-0 pointer-events-none" />
      <Paragraph7 />
      <Container33 />
      <Button3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[410px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col items-start pb-[12px] pt-[23.837px] px-[24px] relative size-full">
        <Container7 />
        <Container32 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white h-[335px] relative rounded-[18px] shrink-0 w-[620px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[0.212px] items-start overflow-clip pb-[1.2px] pt-[1.384px] px-px relative rounded-[inherit] size-full">
        <Container5 />
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[27.884px] h-[403px] items-start left-[19.8px] pt-[0.1px] top-[117.2px] w-[620px]" data-name="Container">
      <TabList />
      <Container4 />
    </div>
  );
}

function TaskDetailDialog1() {
  return (
    <div className="absolute border-[#f9fafb] border-b-[1.2px] border-solid h-[26px] left-[21px] top-[21.01px] w-[256px]" data-name="TaskDetailDialog">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16.5px] left-[0.15px] not-italic text-[#101828] text-[11px] top-[-0.04px] tracking-[1.1px] uppercase whitespace-nowrap">ข้อมูลสรุป</p>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[0.15px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_358)" id="Icon">
          <path d="M5.33123 1.33281V3.99842" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M10.6625 1.33281V3.99842" id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p28780600} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d="M1.99921 6.66404H13.9945" id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_358">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[59px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.12px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">วันที่กำหนด</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.275px] pr-[168.725px] relative size-full">
          <Paragraph8 />
        </div>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">{`2026-04-21 `}</p>
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[228px]" data-name="Container">
      <Container36 />
      <Container37 />
    </div>
  );
}

function Editable3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Editable">
      <Icon11 />
      <Container35 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[0.15px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_345)" id="Icon">
          <path d={svgPaths.p32fd8e00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p32908000} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_345">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[15px] relative shrink-0 w-[24px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.23px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">เวลา</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.384px] pr-[203.616px] relative size-full">
          <Paragraph9 />
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">{`10:00 AM `}</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[228px]" data-name="Container">
      <Container39 />
      <Container40 />
    </div>
  );
}

function Editable4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Editable">
      <Icon12 />
      <Container38 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[0.15px] size-[15.994px] top-[3.76px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon">
          <path d={svgPaths.p1228fd80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pd5b9360} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[62px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.05px] not-italic text-[#99a1af] text-[10px] top-[0.21px] tracking-[1px] uppercase whitespace-nowrap">ผู้รับผิดชอบ</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[0.2px] pr-[165.8px] relative size-full">
          <Paragraph10 />
        </div>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full" data-name="Container">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#1e2939] text-[12px] whitespace-nowrap">คุณ (You)</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.728px] h-[36px] items-start left-[28px] pt-[-0.244px] top-0 w-[228px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Editable5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Editable">
      <Icon13 />
      <Container41 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[19.987px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9875 19.9875">
        <g id="Icon">
          <path d="M4.16406 9.99375H15.8234" id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66562" />
          <path d="M9.99375 4.16406V15.8234" id="Vector_2" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66562" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="absolute h-[15px] left-0 top-0 w-[55px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[-0.37px] not-italic text-[#99a1af] text-[10px] top-[0.67px] tracking-[1px] uppercase w-[88px]">{`ผู้สร้าง `}</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute h-[16px] left-[-0.37px] top-[14.67px] w-[55px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] left-[-0.17px] not-italic text-[#1e2939] text-[12px] top-[-0.3px] whitespace-nowrap">คุณ (You)</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[31px] relative shrink-0 w-[55px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[31px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16.169px] items-center pl-[0.153px] relative size-full">
          <Icon14 />
          <Container45 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[0.15px] size-[12px] top-[1.49px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p38fdee00} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13058e80} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3b81ea80} id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3b3a5000} id="Vector_4" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <Icon15 />
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[20.14px] not-italic text-[#99a1af] text-[10px] top-[0.21px] uppercase whitespace-nowrap">{` ผู้ที่ต้องเข้าร่วม`}</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[17px] items-center justify-center left-[0.12px] overflow-clip px-[8px] py-[2px] rounded-[12px] top-0 w-[67px]" data-name="Badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[#1447e6] text-[9px] whitespace-nowrap">Sarah Chen</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[17px] items-center justify-center left-[73.25px] overflow-clip px-[8px] py-[2px] rounded-[12px] top-0 w-[78px]" data-name="Badge">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[#1447e6] text-[9px] whitespace-nowrap">Michael Wong</p>
    </div>
  );
}

function Badge6() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex h-[17px] items-center justify-center left-[157.2px] overflow-clip px-[8px] py-[2px] rounded-[12px] top-0 w-[92px]" data-name="Badge">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[#1447e6] text-[9px] whitespace-nowrap">คุณอุ้ย (Manager)</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[17px] relative shrink-0 w-full" data-name="Container">
      <Badge4 />
      <Badge5 />
      <Badge6 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[8.216px] h-[54px] items-start pt-[13.369px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f9fafb] border-solid border-t-[1.2px] inset-0 pointer-events-none" />
      <Paragraph13 />
      <Container47 />
    </div>
  );
}

function TaskDetailDialog2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[274px] items-start left-[21px] pt-[0.247px] top-[47.01px] w-[256px]" data-name="TaskDetailDialog">
      <Editable3 />
      <Editable4 />
      <Editable5 />
      <Container44 />
      <Container46 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-white h-[283px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <TaskDetailDialog1 />
        <TaskDetailDialog2 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function TaskDetailDialog3() {
  return (
    <div className="absolute border-[#e5e7eb] border-b-[1.2px] border-solid h-[23px] left-[12px] top-[12.17px] w-[272px]" data-name="TaskDetailDialog">
      <p className="absolute font-['Inter:Semi_Bold','Noto_Sans_Thai:SemiBold',sans-serif] font-semibold leading-[16px] left-[0.17px] not-italic text-[#101828] text-[12px] top-[-0.4px] whitespace-nowrap">การดำเนินการ</p>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16px] relative shrink-0 w-[74px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[37.46px] not-italic text-[#364153] text-[12px] text-center top-[-0.3px] whitespace-nowrap">TO-DO TASK</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p1c2f5b00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function TaskDetailDialog4() {
  return (
    <div className="absolute bg-white content-stretch flex h-[32px] items-center justify-between left-[12px] pl-[13.406px] pr-[13.366px] py-[9.2px] rounded-[12px] top-[43.24px] w-[272px]" data-name="TaskDetailDialog">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Text />
      <Icon16 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[10.16px] size-[15.994px] top-[6.79px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_368)" id="Icon">
          <path d={svgPaths.p3edb4e80} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.pfaa7300} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_368">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[1.2px] border-[rgba(123,201,166,0.15)] border-solid h-[32px] left-[12px] rounded-[12px] top-[83.22px] w-[272px]" data-name="Button">
      <Icon17 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[64.15px] not-italic text-[#1a1a2e] text-[12px] text-center top-[6.49px] whitespace-nowrap">Check-in</p>
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-[10.16px] size-[15.994px] top-[6.79px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g clipPath="url(#clip0_2966_323)" id="Icon">
          <path d={svgPaths.p35759300} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
          <path d={svgPaths.p14a213a8} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
        <defs>
          <clipPath id="clip0_2966_323">
            <rect fill="white" height="15.9937" width="15.9937" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[1.2px] border-[rgba(123,201,166,0.15)] border-solid h-[32px] left-[12px] rounded-[12px] top-[119.2px] w-[272px]" data-name="Button">
      <Icon18 />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[16px] left-[60.65px] not-italic text-[#1a1a2e] text-[12px] text-center top-[6.49px] whitespace-nowrap">แนบไฟล์</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-[12.12px] w-[272px]" data-name="Paragraph">
      <p className="font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] not-italic relative shrink-0 text-[#99a1af] text-[10px] uppercase whitespace-nowrap">การแชร์งาน</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16px] relative shrink-0 w-[151px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[16px] left-[75.82px] not-italic text-[#364153] text-[12px] text-center top-[-0.3px] whitespace-nowrap">🔒 Private (แชร์เฉพาะในทีม)</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[15.994px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9937 15.9937">
        <g id="Icon" opacity="0.5">
          <path d={svgPaths.p1c2f5b00} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33281" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white content-stretch flex h-[32px] items-center justify-between left-0 pl-[13.55px] pr-[13.366px] py-[9.2px] rounded-[12px] top-[39.1px] w-[272px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Text1 />
      <Icon19 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[15px] left-[0.17px] not-italic text-[#6a7282] text-[10px] top-[0.21px] whitespace-nowrap">แชร์ให้คนในทีม</p>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[74px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_Thai:Medium',sans-serif] font-medium leading-[16px] left-[36.78px] not-italic text-[#6a7282] text-[12px] text-center top-[-0.3px] whitespace-nowrap">เลือกแล้ว 2 คน</p>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[13.988px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9875 13.9875">
        <g id="Icon">
          <path d={svgPaths.p1cc72240} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16562" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white h-[32px] relative rounded-[12px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[13.584px] pr-[13.366px] py-[1.2px] relative size-full">
          <Text2 />
          <Icon20 />
        </div>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[7.972px] h-[55px] items-start left-0 pt-[0.013px] top-[87.07px] w-[272px]" data-name="Container">
      <Paragraph15 />
      <Button7 />
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[13px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[13.5px] left-[0.17px] not-italic text-[#99a1af] text-[9px] top-[-0.15px] uppercase whitespace-nowrap">ที่เลือก (2)</p>
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[9.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82969 5.82969">
            <path d={svgPaths.p30418640} id="Vector" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.832812" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82969 5.82969">
            <path d={svgPaths.p27628380} id="Vector" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.832812" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TaskDetailDialog6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[62.98px] pt-[2.003px] px-[2.003px] rounded-[40265300px] size-[14px] top-[2px]" data-name="TaskDetailDialog">
      <Icon21 />
    </div>
  );
}

function Badge7() {
  return (
    <div className="absolute bg-[#f3e8ff] h-[18px] left-[0.12px] overflow-clip rounded-[12px] top-0 w-[85px]" data-name="Badge">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] left-[8.04px] not-italic text-[#8200db] text-[9px] top-[2.34px] whitespace-nowrap">Sarah Chen</p>
      <TaskDetailDialog6 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="h-[9.994px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82969 5.82969">
            <path d={svgPaths.p30418640} id="Vector" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.832812" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.82969 5.82969">
            <path d={svgPaths.p27628380} id="Vector" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.832812" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TaskDetailDialog7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[74.17px] pt-[2.003px] px-[2.003px] rounded-[40265300px] size-[14px] top-[2px]" data-name="TaskDetailDialog">
      <Icon22 />
    </div>
  );
}

function Badge8() {
  return (
    <div className="absolute bg-[#f3e8ff] h-[18px] left-[91.21px] overflow-clip rounded-[12px] top-0 w-[96px]" data-name="Badge">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] left-[7.85px] not-italic text-[#8200db] text-[9px] top-[2.34px] whitespace-nowrap">Michael Wong</p>
      <TaskDetailDialog7 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Container">
      <Badge7 />
      <Badge8 />
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8.209px] h-[69px] items-start left-0 pt-[13.634px] top-[141.8px] w-[272px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t-[1.2px] inset-0 pointer-events-none" />
      <Paragraph16 />
      <Container50 />
    </div>
  );
}

function TaskDetailDialog5() {
  return (
    <div className="absolute border-[#f3f4f6] border-solid border-t-[1.2px] h-[234px] left-[11.94px] top-[150.98px] w-[272px]" data-name="TaskDetailDialog">
      <Paragraph14 />
      <Button6 />
      <Container48 />
      <Container49 />
    </div>
  );
}

function CardContent() {
  return (
    <div className="h-[409px] relative shrink-0 w-[296px]" data-name="CardContent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TaskDetailDialog3 />
        <TaskDetailDialog4 />
        <Button4 />
        <Button5 />
        <TaskDetailDialog5 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[364px] items-start pb-[1.2px] pl-px pr-[1.2px] pt-px relative rounded-[18px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.2px] border-solid inset-0 pointer-events-none rounded-[18px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <CardContent />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16.144px] h-[817px] items-start left-[663.86px] pt-[-0.128px] top-[117.2px] w-[298px]" data-name="Container">
      <Card />
      <Card1 />
    </div>
  );
}

function Button8() {
  return <div className="absolute left-[950.11px] opacity-70 rounded-[12px] size-[16px] top-[16.1px]" data-name="Button" />;
}

export default function Dialog() {
  return (
    <div className="bg-[#f9fafb] relative rounded-[18px] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)] size-full" data-name="Dialog">
      <TaskDetailDialog />
      <Container3 />
      <Container34 />
      <Button8 />
    </div>
  );
}