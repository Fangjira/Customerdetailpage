import svgPaths from "./svg-ax3g7n456f";

function Icon() {
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

function Button() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Icon1() {
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

function Button1() {
  return (
    <div className="bg-[#f9fafb] h-[30.429px] relative rounded-[14px] shrink-0 w-[34.402px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[9.207px] pr-[1.223px] py-[1.223px] relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[31.995px] relative shrink-0 w-[74.382px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[13.581px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[12px] text-center text-white">TC</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[31.995px] min-h-px min-w-px relative rounded-[41020500px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(74, 222, 128) 0%, rgb(0, 188, 125) 100%)" }}>
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[31.995px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 size-[31.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container3 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[11.996px] relative size-full">
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[57.209px] items-start pb-[1.223px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}

function Icon2() {
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

function Button3() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon2 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[24.011px] min-h-px min-w-px relative" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[24px] left-0 text-[#101828] text-[16px] top-[-1.78px]">รายละเอียดลูกค้า</p>
      </div>
    </div>
  );
}

function Icon3() {
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

function Button4() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[31.995px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[55.987px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.996px] items-center px-[15.988px] relative size-full">
          <Button3 />
          <Heading />
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[57.209px] items-start pb-[1.223px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container5 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[45.214px] relative shrink-0 w-[65.901px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#155dfc] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[33.49px] text-[#155dfc] text-[14px] text-center top-[10px]">ข้อมูล</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[45.214px] relative shrink-0 w-[100.819px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[50.49px] text-[#6a7282] text-[14px] text-center top-[10px]">บุคคลติดต่อ</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[45.214px] relative shrink-0 w-[49.225px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[25.49px] text-[#6a7282] text-[14px] text-center top-[10px]">ดีล</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[45.214px] relative shrink-0 w-[99.52px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[50.49px] text-[#6a7282] text-[14px] text-center top-[10px]">การเยี่ยมชม</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[45.214px] relative shrink-0 w-[80.475px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0)] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] left-[40.49px] text-[#6a7282] text-[14px] text-center top-[10px]">วิเคราะห์</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex h-[45.214px] items-center overflow-clip relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[46.436px] items-start pb-[1.223px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <Container7 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[19.999px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#00a63e] text-[16px] top-[-2.22px]">องค์การเภสัชกรรม</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[39.999px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#4a5565] text-[14px] top-[-2px] w-[175px] whitespace-pre-wrap">Government Pharmaceutical Organization</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="flex-[1_0_0] h-[63.991px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.992px] items-start relative size-full">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#dcfce7] h-[19.999px] relative rounded-[12px] shrink-0 w-[46.341px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.223px] py-[3.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#008236] text-[10px]">Active</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#b9f8cf] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[63.991px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[#eff6ff] h-[26.418px] relative rounded-[12px] shrink-0 w-[90.083px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]">Government</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[4.89px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#99a1af] text-[12px]">•</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[110.408px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#4a5565] text-[12px]">รหัส: 0994000165891</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[7.985px] h-[26.418px] items-center relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[7.985px] h-[111.611px] items-start pb-[1.223px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <Container11 />
      <Container13 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#364153] text-[12px] tracking-[0.3px] uppercase whitespace-pre-wrap">ข้อมูลนิติบุคคล</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">Tax ID</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#101828] text-[14px] whitespace-pre-wrap">0994000165891</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.998px] h-[41.985px] items-start left-0 top-0 w-[144.007px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">ประเภทธุรกิจ</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#101828] text-[14px] whitespace-pre-wrap">องค์กรของรัฐ</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.998px] h-[41.985px] items-start left-[160px] top-0 w-[144.027px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[41.985px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-0 w-[144.007px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">สถานะนิติบุคคล</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f0fdf4] border-[#b9f8cf] border-[1.223px] border-solid h-[26.418px] left-0 overflow-clip rounded-[12px] top-[21.99px] w-[99.31px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] left-[9.99px] text-[#008236] text-[12px] top-[2.99px]">ยังดำเนินการอยู่</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[48.404px] left-0 top-0 w-[144.007px]" data-name="Container">
      <Paragraph5 />
      <Text5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">ทุนจดทะเบียน</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px relative text-[#101828] text-[14px] whitespace-pre-wrap">฿500</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.998px] h-[48.404px] items-start left-[160px] top-0 w-[144.027px]" data-name="Container">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[48.404px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[130.369px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container15 />
      <Container18 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#364153] text-[12px] tracking-[0.3px] uppercase whitespace-pre-wrap">การจัดการบัญชี</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-0 w-[144.007px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">Business Unit</p>
    </div>
  );
}

function Text6() {
  return <div className="absolute bg-[#faf5ff] border-[#e9d4ff] border-[1.223px] border-solid h-[26.418px] left-0 rounded-[12px] top-[21.99px] w-[225.782px]" data-name="Text" />;
}

function Container23() {
  return (
    <div className="absolute h-[48.404px] left-0 top-0 w-[144.007px]" data-name="Container">
      <Paragraph8 />
      <Text6 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#6a7282] text-[12px] whitespace-pre-wrap">Person in Charge</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#101828] text-[14px]">ทะมากัท รัฐเจริญ</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[5.998px] h-[48.404px] items-start left-[160px] top-0 w-[144.027px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[48.404px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[89.606px] items-start pt-[13.218px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.223px] inset-0 pointer-events-none" />
      <Heading3 />
      <Container22 />
    </div>
  );
}

function Heading4() {
  return <div className="h-[15.988px] shrink-0 w-[25.214px]" data-name="Heading 4" />;
}

function Button10() {
  return (
    <div className="h-[27.984px] relative rounded-[12px] shrink-0 w-[51.269px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#00a63e] text-[12px] text-center">+ เพิ่ม</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[27.984px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Heading4 />
          <Button10 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39271)" id="Icon">
          <path d={svgPaths.pc571c80} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p26ea28f0} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39271">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[77.19px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#101828] text-[12px]">สำนักงานใหญ่</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#155dfc] h-[19.999px] relative rounded-[12px] shrink-0 w-[37.21px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9.223px] py-[3.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-white">หลัก</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[7.984px] h-[19.999px] items-center relative shrink-0 w-full" data-name="Container">
      <Paragraph11 />
      <Text7 />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[38.967px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[19.5px] left-0 text-[#364153] text-[12px] top-[-1.78px] w-[238px] whitespace-pre-wrap">123 Logistics Park, Sukhumvit Road, Bangkok 10110</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[1_0_0] h-[62.959px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.992px] items-start relative size-full">
        <Container30 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex gap-[9.99px] h-[62.959px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon4 />
      <Container29 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[#eff6ff] h-[89.396px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dbeafe] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col items-start pb-[1.223px] pt-[13.218px] px-[13.218px] relative size-full">
        <Container28 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[142.594px] items-start pt-[13.218px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.223px] inset-0 pointer-events-none" />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[100.57px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#364153] text-[12px] tracking-[0.3px] uppercase">{`Tags & Interest`}</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[27.984px] relative rounded-[12px] shrink-0 w-[51.269px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[10px] relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#00a63e] text-[12px] text-center">+ เพิ่ม</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[27.984px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Heading5 />
          <Button11 />
        </div>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[26.418px] left-0 rounded-[12px] top-0 w-[81.526px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px]">Cold Chain</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[26.418px] left-[89.51px] rounded-[12px] top-0 w-[90.083px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px]">Government</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[26.418px] left-[187.58px] rounded-[12px] top-0 w-[105.518px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px]">Pharmaceutical</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[26.418px] left-0 rounded-[12px] top-[34.4px] w-[94.229px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#364153] text-[12px]">{`Track & Trace`}</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#eff6ff] h-[26.418px] left-[102.21px] rounded-[12px] top-[34.4px] w-[66.378px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]">Director</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Text13() {
  return (
    <div className="absolute bg-[#eff6ff] h-[26.418px] left-0 rounded-[12px] top-[68.8px] w-[144.542px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[11.223px] py-[5.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#1447e6] text-[12px]">Procurement Manager</p>
      </div>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[95.222px] relative shrink-0 w-full" data-name="Container">
      <Text8 />
      <Text9 />
      <Text10 />
      <Text11 />
      <Text12 />
      <Text13 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[148.42px] items-start pt-[13.218px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t-[1.223px] inset-0 pointer-events-none" />
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-white h-[720.973px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[15.988px] items-start pb-[1.223px] pt-[17.211px] px-[17.211px] relative size-full">
        <Container10 />
        <Container14 />
        <Container21 />
        <Container25 />
        <Container31 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[131.63px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#364153] text-[12px] uppercase">Organization Group</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[23.992px] relative rounded-[12px] shrink-0 w-[117.59px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center">Show organization</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex h-[23.992px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph13 />
      <Button12 />
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">Headquarter</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39275)" id="Icon">
          <path d={svgPaths.p1ae1fe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p362a0000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p523d280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 3.99702H9.32639" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 6.66171H9.32639" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 9.32639H9.32639" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 11.9911H9.32639" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39275">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#2b7fff] relative rounded-[41020500px] shrink-0 size-[31.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px relative text-[#101828] text-[12px] whitespace-pre-wrap">กระทรวงสาธารณสุข</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">HQ-GOV-001</p>
    </div>
  );
}

function Container39() {
  return (
    <div className="flex-[1_0_0] h-[31.002px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph15 />
        <Paragraph16 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[#eff6ff] h-[50.409px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dbeafe] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.984px] items-center px-[9.207px] py-[1.223px] relative size-full">
          <Container38 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col gap-[5.998px] h-[71.421px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph14 />
      <Container37 />
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">Subsidiary</p>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39275)" id="Icon">
          <path d={svgPaths.p1ae1fe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p362a0000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p523d280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 3.99702H9.32639" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 6.66171H9.32639" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 9.32639H9.32639" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 11.9911H9.32639" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39275">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container43() {
  return (
    <div className="bg-[#00bba7] relative rounded-[41020500px] shrink-0 size-[31.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-0 w-[253.613px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#101828] text-[12px]">องค์การเภสัชกรรม สำนักงานใหญ่</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="absolute content-stretch flex h-[15.014px] items-start left-0 top-[15.99px] w-[253.613px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">นพ.สมชาย วงศ์ใหญ่</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="flex-[1_0_0] h-[31.002px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="bg-[#f0fdfa] h-[50.409px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#cbfbf1] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.984px] items-center px-[9.207px] py-[1.223px] relative size-full">
          <Container43 />
          <Container44 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.988px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39275)" id="Icon">
          <path d={svgPaths.p1ae1fe00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p362a0000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p523d280} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 3.99702H9.32639" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 6.66171H9.32639" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 9.32639H9.32639" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 11.9911H9.32639" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39275">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-[#00bba7] relative rounded-[41020500px] shrink-0 size-[31.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-0 top-0 w-[253.613px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#101828] text-[12px]">องค์การเภสัชกรรม ศูนย์กระจายสินค้า</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="absolute content-stretch flex h-[15.014px] items-start left-0 top-[15.99px] w-[253.613px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">คุณเทพพิทักษ์ รักษ์สุข</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="flex-[1_0_0] h-[31.002px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="bg-[#f0fdfa] h-[50.409px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#cbfbf1] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[7.984px] items-center px-[9.207px] py-[1.223px] relative size-full">
          <Container46 />
          <Container47 />
        </div>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[7.985px] h-[108.803px] items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container45 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col gap-[5.998px] h-[129.815px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph17 />
      <Container41 />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-white h-[271.645px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.985px] items-start pb-[1.223px] pt-[13.218px] px-[13.218px] relative size-full">
        <Container35 />
        <Container36 />
        <Container40 />
      </div>
    </div>
  );
}

function Paragraph22() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[118.583px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#364153] text-[12px] uppercase">ยอดขายแยก SERVICE</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[23.992px] relative rounded-[12px] shrink-0 w-[92.452px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#00a63e] text-[12px] text-center">+ Add Service</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex h-[23.992px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph22 />
      <Button13 />
    </div>
  );
}

function Paragraph23() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[31.995px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Freight</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[106.568px] relative size-full">
        <Paragraph23 />
      </div>
    </div>
  );
}

function Paragraph24() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.986px] h-[46.455px] items-start left-0 pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-0 w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container52 />
      <Paragraph24 />
    </div>
  );
}

function Paragraph25() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[39.006px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Customs</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[99.558px] relative size-full">
        <Paragraph25 />
      </div>
    </div>
  );
}

function Paragraph26() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.986px] h-[46.455px] items-start left-[159px] pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-0 w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container54 />
      <Paragraph26 />
    </div>
  );
}

function Paragraph27() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[50.619px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Warehouse</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[87.944px] relative size-full">
        <Paragraph27 />
      </div>
    </div>
  );
}

function Paragraph28() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container55() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.987px] h-[46.455px] items-start left-0 pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-[52.45px] w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container56 />
      <Paragraph28 />
    </div>
  );
}

function Paragraph29() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[66.55px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Transportation</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[72.013px] relative size-full">
        <Paragraph29 />
      </div>
    </div>
  );
}

function Paragraph30() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.987px] h-[46.455px] items-start left-[159px] pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-[52.45px] w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container58 />
      <Paragraph30 />
    </div>
  );
}

function Paragraph31() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[57.763px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Cross Border</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[80.8px] relative size-full">
        <Paragraph31 />
      </div>
    </div>
  );
}

function Paragraph32() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.987px] h-[46.455px] items-start left-0 pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-[104.91px] w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container60 />
      <Paragraph32 />
    </div>
  );
}

function Paragraph33() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[34.096px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#101828] text-[10px]">Trading</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex items-start justify-between pr-[104.467px] relative size-full">
        <Paragraph33 />
      </div>
    </div>
  );
}

function Paragraph34() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#99a1af] text-[10px] whitespace-pre-wrap">คลิก +</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[1.987px] h-[46.455px] items-start left-[159px] pb-[1.223px] pt-[7.22px] px-[7.22px] rounded-[12px] top-[104.91px] w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container62 />
      <Paragraph34 />
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[151.362px] relative shrink-0 w-full" data-name="Container">
      <Container51 />
      <Container53 />
      <Container55 />
      <Container57 />
      <Container59 />
      <Container61 />
    </div>
  );
}

function Container48() {
  return (
    <div className="bg-white h-[209.774px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.985px] items-start pb-[1.223px] pt-[13.218px] px-[13.218px] relative size-full">
        <Container49 />
        <Container50 />
      </div>
    </div>
  );
}

function Paragraph35() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-[112.184px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[#1447e6] text-[12px] uppercase">Customer Insight</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[23.992px] relative rounded-[12px] shrink-0 w-[42.253px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[8px] relative size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#155dfc] text-[12px] text-center">View</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[23.992px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Paragraph35 />
          <Button14 />
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return <div className="absolute bg-[#155dfc] left-0 rounded-[41020500px] size-[5.998px] top-[6px]" data-name="Container" />;
}

function Paragraph36() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[13.98px] top-0 w-[275.771px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#193cb8] text-[12px]">มีความต้องการระบบ WMS สำหรับจัดการยาและเวชภัณฑ์</p>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Container">
      <Container67 />
      <Paragraph36 />
    </div>
  );
}

function Container69() {
  return <div className="absolute bg-[#155dfc] left-0 rounded-[41020500px] size-[5.998px] top-[6px]" data-name="Container" />;
}

function Paragraph37() {
  return (
    <div className="absolute content-stretch flex h-[15.988px] items-start left-[13.98px] top-0 w-[246.297px]" data-name="Paragraph">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#193cb8] text-[12px]">ขอขยายบริการไปยังโรงพยาบาลในภูมิภาค 20 แห่ง</p>
    </div>
  );
}

function Container68() {
  return (
    <div className="h-[15.988px] relative shrink-0 w-full" data-name="Container">
      <Container69 />
      <Paragraph37 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col gap-[5.998px] h-[37.974px] items-start relative shrink-0 w-full" data-name="Container">
      <Container66 />
      <Container68 />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[86.378px] relative rounded-[14px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(165.683deg, rgb(239, 246, 255) 0%, rgb(238, 242, 255) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[5.998px] items-start pb-[1.223px] pt-[9.207px] px-[9.207px] relative size-full">
        <Container64 />
        <Container65 />
      </div>
    </div>
  );
}

function Paragraph38() {
  return (
    <div className="content-stretch flex h-[15.988px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[16px] min-h-px min-w-px relative text-[#364153] text-[12px] uppercase whitespace-pre-wrap">ข้อมูลการเงิน</p>
    </div>
  );
}

function Paragraph39() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">Revenue/Year</p>
    </div>
  );
}

function Paragraph40() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px relative text-[#101828] text-[14px] whitespace-pre-wrap">฿8</p>
    </div>
  );
}

function Container73() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col gap-[1.987px] h-[55.414px] items-start left-0 pb-[1.223px] pt-[9.207px] px-[9.207px] rounded-[14px] top-0 w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dbeafe] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph39 />
      <Paragraph40 />
    </div>
  );
}

function Paragraph41() {
  return (
    <div className="content-stretch flex h-[15.014px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">Net Con</p>
    </div>
  );
}

function Paragraph42() {
  return (
    <div className="content-stretch flex h-[19.999px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Bold',sans-serif] font-bold leading-[20px] min-h-px min-w-px relative text-[#00a63e] text-[14px] whitespace-pre-wrap">22%</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute bg-[#f0fdf4] content-stretch flex flex-col gap-[1.987px] h-[55.414px] items-start left-[159px] pb-[1.223px] pt-[9.207px] px-[9.207px] rounded-[14px] top-0 w-[153.004px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#dcfce7] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph41 />
      <Paragraph42 />
    </div>
  );
}

function Container72() {
  return (
    <div className="h-[55.414px] relative shrink-0 w-full" data-name="Container">
      <Container73 />
      <Container74 />
    </div>
  );
}

function Paragraph43() {
  return (
    <div className="absolute content-stretch flex h-[15.014px] items-start left-[9.21px] top-[9.21px] w-[293.593px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Arimo:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#6a7282] text-[10px] whitespace-pre-wrap">Winning Chance</p>
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#dcfce7] border-[#b9f8cf] border-[1.223px] border-solid h-[22.406px] left-[9.21px] overflow-clip rounded-[12px] top-[27.89px] w-[40.61px]" data-name="Text">
      <p className="absolute font-['Arimo:Regular',sans-serif] font-normal leading-[16px] left-[6px] text-[#008236] text-[12px] top-[0.99px]">High</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="bg-[#fff7ed] h-[59.502px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#ffedd4] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Paragraph43 />
      <Text14 />
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex flex-col gap-[7.985px] h-[122.9px] items-start relative shrink-0 w-full" data-name="Container">
      <Container72 />
      <Container75 />
    </div>
  );
}

function Container70() {
  return (
    <div className="bg-white h-[173.309px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[1.223px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="content-stretch flex flex-col gap-[7.985px] items-start pb-[1.223px] pt-[13.218px] px-[13.218px] relative size-full">
        <Paragraph38 />
        <Container71 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f9fafb] h-[1606.049px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[11.996px] items-start pt-[15.988px] px-[15.988px] relative size-full">
        <Container9 />
        <Container34 />
        <Container48 />
        <Container63 />
        <Container70 />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] h-[853.309px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[23.228px] relative size-full">
          <Header />
          <Container4 />
          <Container6 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function PQ() {
  return (
    <div className="absolute bg-[#f5f9ff] content-stretch flex h-[853.309px] items-start left-0 overflow-clip top-0 w-[393.647px]" data-name="pQ">
      <MainContent />
    </div>
  );
}

function Icon8() {
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

function Button15() {
  return (
    <div className="absolute left-[313.67px] rounded-[41020500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[55.987px] top-[773.33px]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 201, 80) 0%, rgb(0, 166, 62) 100%)" }}>
      <Icon8 />
    </div>
  );
}

function Icon9() {
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

function Button16() {
  return (
    <div className="absolute left-[313.67px] rounded-[41020500px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)] size-[55.987px] top-[746.34px]" data-name="Button" style={{ backgroundImage: "linear-gradient(135deg, rgb(0, 188, 125) 0%, rgb(16, 214, 143) 100%)" }}>
      <Icon9 />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="absolute bg-[rgba(0,0,0,0.3)] h-[853.309px] left-0 top-0 w-[393.647px]" data-name="Primitive.div" />;
}

function PrimitiveH() {
  return (
    <div className="h-[24.011px] relative shrink-0 w-[343.219px]" data-name="Primitive.h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Arimo:Bold','Noto_Sans_Thai:Bold',sans-serif] font-bold leading-[24px] left-[172.37px] text-[#1a1a2e] text-[16px] text-center top-[-1.78px]">แก้ไขข้อมูลลูกค้า</p>
      </div>
    </div>
  );
}

function PrimitiveP() {
  return (
    <div className="h-[15.014px] relative shrink-0 w-[343.219px]" data-name="Primitive.p">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] min-h-px min-w-px relative text-[#64748b] text-[10px] text-center whitespace-pre-wrap">องค์การเภสัชกรรม</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[47.009px] relative shrink-0 w-[343.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[7.984px] items-start relative size-full">
        <PrimitiveH />
        <PrimitiveP />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[17.21px] size-[15.988px] top-[9.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39284)" id="Icon">
          <path d={svgPaths.p1ae1fe00} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p362a0000} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p523d280} id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 3.99702H9.32639" id="Vector_4" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 6.66171H9.32639" id="Vector_5" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 9.32639H9.32639" id="Vector_6" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M6.66171 11.9911H9.32639" id="Vector_7" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39284">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="flex-[1_0_0] h-[35.988px] min-h-px min-w-px relative" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon10 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16.5px] left-[72.19px] text-[#1a1a2e] text-[11px] text-center top-[7.74px]">ข้อมูลบริษัท</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[17.21px] size-[15.988px] top-[9.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39293)" id="Icon">
          <path d={svgPaths.p33927000} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.pa621d70} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p1f6abf00} id="Vector_3" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p31386700} id="Vector_4" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39293">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="flex-[1_0_0] h-[35.988px] min-h-px min-w-px relative" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon11 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16.5px] left-[70.69px] text-[#1a1a2e] text-[11px] text-center top-[7.74px]">ผู้ติดต่อ (3)</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[17.21px] size-[15.988px] top-[9.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39303)" id="Icon">
          <path d={svgPaths.pc571c80} id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p26ea28f0} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39303">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="flex-[1_0_0] h-[35.988px] min-h-px min-w-px relative" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#7bc9a6] border-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon12 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16.5px] left-[63.69px] text-[#1a1a2e] text-[11px] text-center top-[7.74px]">ที่อยู่ (1)</p>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[17.21px] size-[15.988px] top-[9.99px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g clipPath="url(#clip0_1107_39267)" id="Icon">
          <path d="M7.99405 1.33234V14.6558" id="Vector" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p14259680} id="Vector_2" stroke="var(--stroke-0, #1A1A2E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
        <defs>
          <clipPath id="clip0_1107_39267">
            <rect fill="white" height="15.9881" width="15.9881" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="flex-[1_0_0] h-[35.988px] min-h-px min-w-px relative" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon13 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16.5px] left-[83.69px] text-[#1a1a2e] text-[11px] text-center top-[7.74px]">ยอดขาย Service</p>
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="h-[37.21px] relative shrink-0 w-[343.219px]" data-name="Tab List">
      <div aria-hidden="true" className="absolute border-[rgba(123,201,166,0.15)] border-b-[1.223px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pb-[1.223px] pr-[-123.416px] relative size-full">
        <PrimitiveButton />
        <PrimitiveButton1 />
        <PrimitiveButton2 />
        <PrimitiveButton3 />
      </div>
    </div>
  );
}

function Paragraph44() {
  return (
    <div className="h-[16.504px] relative shrink-0 w-[128.325px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[16.5px] relative shrink-0 text-[#64748b] text-[11px]">จัดการที่อยู่ทั้งหมดของลูกค้า</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[9.99px] size-[15.988px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d="M3.33085 7.99405H12.6572" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d="M7.99405 3.33085V12.6572" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#7bc9a6] h-[27.984px] relative rounded-[12px] shadow-[0px_0px_0px_0px_rgba(123,201,166,0.04)] shrink-0 w-[81.22px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon14 />
        <p className="-translate-x-1/2 absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] left-[53.97px] text-[10px] text-center text-white top-[4.48px]">เพิ่มที่อยู่</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[27.984px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Paragraph44 />
          <Button17 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[133.78px] size-[15.988px] top-[196.78px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.pfef2000} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p3281ba00} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#00a63e] h-[15.988px] left-[81.78px] rounded-[12px] top-[196.78px] w-[42.769px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[7.223px] py-[1.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white">Primary</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-[#f9fafb] border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid h-[219px] left-[-0.21px] rounded-[14px] top-[20.04px] w-[162px]" data-name="Container">
      <Icon15 />
      <Text15 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-[133.78px] size-[15.988px] top-[196.78px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9881 15.9881">
        <g id="Icon">
          <path d={svgPaths.pfef2000} id="Vector" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
          <path d={svgPaths.p3281ba00} id="Vector_2" stroke="var(--stroke-0, #E7000B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33234" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#e5e7eb] h-[15.988px] left-[81.78px] rounded-[12px] top-[196.78px] w-[42.769px]" data-name="Text">
      <div className="content-stretch flex items-center justify-center overflow-clip px-[7.223px] py-[1.223px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[12px] relative shrink-0 text-[8px] text-white">Primary</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute bg-[#f9fafb] border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid h-[219px] left-[191.79px] rounded-[14px] top-[20.04px] w-[162px]" data-name="Container">
      <Icon16 />
      <Text16 />
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="absolute h-[12.225px] left-0 top-0 w-[45.596px]" data-name="Primitive.label">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-0">ประเภทที่อยู่</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute h-[18px] left-[-10.42px] top-[33.82px] w-[71px]" data-name="Container">
      <PrimitiveLabel />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="absolute h-[12.225px] left-0 top-0 w-[45.596px]" data-name="Primitive.label">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-0">ที่อยู่</p>
    </div>
  );
}

function Container85() {
  return (
    <div className="absolute h-[18px] left-[-10px] top-[60px] w-[71px]" data-name="Container">
      <PrimitiveLabel1 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[1.223px] border-[rgba(0,0,0,0)] border-solid h-[28px] left-[37.58px] overflow-clip rounded-[12px] top-[25.82px] w-[98px]" data-name="Text Input">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] left-[10.78px] text-[#64748b] text-[10px] top-[7.27px]">สำนักงานใหญ่</p>
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="absolute content-stretch flex h-[12.225px] items-start left-0 top-[8.56px] w-[18.166px]" data-name="Primitive.label">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#64748b] text-[9px] w-[42px] whitespace-pre-wrap">เขต/อำเภอ</p>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[49px] rounded-[12px] top-[4px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">บางกะปิ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute h-[21px] left-[-3px] top-[3px] w-[40px]" data-name="Container">
      <PrimitiveLabel2 />
      <TextInput1 />
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-[36px] w-[56px] whitespace-pre-wrap">รัฐ/จังหวัด</p>
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-[65px] w-[56px] whitespace-pre-wrap">รหัสไปรษณีย์</p>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[44px] rounded-[12px] top-[36px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">บางกะปิ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextInput3() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[44px] rounded-[12px] top-[62px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">10240</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute h-[76px] left-[-5.42px] top-[119.82px] w-[138px]" data-name="Container">
      <Container87 />
      <TextInput2 />
      <TextInput3 />
    </div>
  );
}

function TextInput4() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[64px] left-[36px] rounded-[12px] top-[56px] w-[100px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal h-[40px] leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[74px] whitespace-pre-wrap">123 Main Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute h-[208px] left-[16.79px] top-[1.04px] w-[136px]" data-name="Container">
      <Container84 />
      <Container85 />
      <TextInput />
      <Container86 />
      <TextInput4 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="absolute h-[12.225px] left-0 top-0 w-[45.596px]" data-name="Primitive.label">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-0">ประเภทที่อยู่</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="absolute h-[18px] left-[-10.42px] top-[33.82px] w-[71px]" data-name="Container">
      <PrimitiveLabel3 />
    </div>
  );
}

function PrimitiveLabel4() {
  return (
    <div className="absolute h-[12.225px] left-0 top-0 w-[45.596px]" data-name="Primitive.label">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-0">ที่อยู่</p>
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute h-[18px] left-[-10px] top-[60px] w-[71px]" data-name="Container">
      <PrimitiveLabel4 />
    </div>
  );
}

function TextInput5() {
  return (
    <div className="absolute bg-[#f5f9ff] border-[1.223px] border-[rgba(0,0,0,0)] border-solid h-[28px] left-[37.58px] overflow-clip rounded-[12px] top-[25.82px] w-[98px]" data-name="Text Input">
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] left-[10.78px] text-[#64748b] text-[10px] top-[7.27px]">คลังสินค้า</p>
    </div>
  );
}

function PrimitiveLabel5() {
  return (
    <div className="absolute content-stretch flex h-[12.225px] items-start left-0 top-[8.56px] w-[18.166px]" data-name="Primitive.label">
      <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] relative shrink-0 text-[#64748b] text-[9px] w-[42px] whitespace-pre-wrap">เขต/อำเภอ</p>
    </div>
  );
}

function TextInput6() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[49px] rounded-[12px] top-[4px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">บางกะปิ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container92() {
  return (
    <div className="absolute h-[21px] left-[-3px] top-[3px] w-[40px]" data-name="Container">
      <PrimitiveLabel5 />
      <TextInput6 />
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-[36px] w-[56px] whitespace-pre-wrap">รัฐ/จังหวัด</p>
      <p className="absolute font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[9px] left-0 text-[#64748b] text-[9px] top-[65px] w-[56px] whitespace-pre-wrap">รหัสไปรษณีย์</p>
    </div>
  );
}

function TextInput7() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[44px] rounded-[12px] top-[36px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">บางกะปิ</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function TextInput8() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[22px] left-[44px] rounded-[12px] top-[62px] w-[98px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[78px] whitespace-pre-wrap">10240</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container91() {
  return (
    <div className="absolute h-[76px] left-[-5.42px] top-[119.82px] w-[138px]" data-name="Container">
      <Container92 />
      <TextInput7 />
      <TextInput8 />
    </div>
  );
}

function TextInput9() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[64px] left-[36px] rounded-[12px] top-[56px] w-[100px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Arimo:Regular',sans-serif] font-normal h-[40px] leading-[normal] relative shrink-0 text-[#64748b] text-[10px] w-[74px] whitespace-pre-wrap">124 Main Street</p>
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute h-[208px] left-[209.79px] top-[1.04px] w-[136px]" data-name="Container">
      <Container89 />
      <Container90 />
      <TextInput5 />
      <Container91 />
      <TextInput9 />
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[342.359px] relative shrink-0 w-full" data-name="Container">
      <Container81 />
      <Container82 />
      <Container83 />
      <Container88 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col gap-[11.996px] h-[382.339px] items-start relative shrink-0 w-full" data-name="Container">
      <Container79 />
      <Container80 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[343.219px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip px-[3.992px] relative rounded-[inherit] size-full">
        <Container78 />
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[343.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[23.973px] items-start overflow-clip relative rounded-[inherit] size-full">
        <TabList />
        <TabPanel />
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="bg-[#f5f9ff] h-[27.984px] relative rounded-[12px] shrink-0 w-[61.584px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[17.223px] py-[9.223px] relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[#1a1a2e] text-[10px] text-center">ยกเลิก</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="bg-gradient-to-r from-[#00c950] h-[27.984px] relative rounded-[12px] shrink-0 to-[#00a63e] w-[123.492px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Arimo:Regular','Noto_Sans_Thai:Regular',sans-serif] font-normal leading-[15px] relative shrink-0 text-[10px] text-center text-white">บันทึกการเปลี่ยนแปลง</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="h-[41.202px] relative shrink-0 w-[343.219px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[rgba(123,201,166,0.15)] border-solid border-t-[1.223px] inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.984px] items-center justify-end pt-[1.223px] relative size-full">
        <Button18 />
        <Button19 />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute bg-[#f5f9ff] h-[614.138px] left-0 top-[119.59px] w-[393.647px]" data-name="Primitive.div">
      <div className="content-stretch flex flex-col gap-[15.988px] items-start overflow-clip pl-[25.215px] pr-[1.223px] py-[25.215px] relative rounded-[inherit] size-full">
        <Container76 />
        <Container77 />
        <Container93 />
      </div>
      <div aria-hidden="true" className="absolute border-[1.223px] border-[rgba(123,201,166,0.15)] border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

export default function CustomerDetailPage() {
  return (
    <div className="bg-white relative size-full" data-name="Customer Detail Page">
      <PQ />
      <Button15 />
      <Button16 />
      <PrimitiveDiv />
      <PrimitiveDiv1 />
    </div>
  );
}