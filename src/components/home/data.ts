export const ASSET = "https://www.angelsschool.com/images";

export const SECTIONS = [
  {
    id: "preschool",
    name: "Pre-School",
    age: "Age 1+",
    qual: "Early Years Foundation",
    blurb: "Where wonder begins. Play-led discovery in a nurturing, multilingual environment.",
    img: `${ASSET}/secs/psch.jpg`,
  },
  {
    id: "primary",
    name: "Primary",
    age: "Age 6+",
    qual: "Cambridge Primary",
    blurb: "Foundational mastery in literacy, numeracy and curiosity, the Angels way.",
    img: `${ASSET}/secs/primary.png`,
  },
  {
    id: "jhs",
    name: "Junior High",
    age: "Age 12+",
    qual: "B.E.C.E",
    blurb: "Confidence, character and rigour as students prepare for global pathways.",
    img: `${ASSET}/secs/jhs.png`,
  },
  {
    id: "secondary",
    name: "Secondary",
    age: "Age 12+",
    qual: "IGCSE",
    blurb: "Ghana's #1 IGCSE programme - adjudged by the British Council, 2022/23.",
    img: `${ASSET}/secs/secondary.png`,
  },
  {
    id: "college",
    name: "College",
    age: "Age 16+",
    qual: "AS & A Level",
    blurb: "University-ready scholars graduating to the world's best institutions.",
    img: `${ASSET}/secs/aic.png`,
  },
  {
    id: "boarding",
    name: "Boarding",
    age: "Age 9+",
    qual: "Residential",
    blurb: "A second home - pastoral care, study halls and lifelong friendships.",
    img: `${ASSET}/secs/bhse.jpg`,
  },
] as const;

export const GALLERY = [
  {
    title: "Special Breakfast for Moms",
    dept: "School Events",
    date: "Mother's Day 2024",
    img: "/gallery/img1.webp",
  },
  {
    title: "Celebrating Our Mothers",
    dept: "Primary Department",
    date: "Mother's Day 2024",
    img: "/gallery/img2.webp",
  },
  {
    title: "Refreshments & Joy",
    dept: "Community",
    date: "Mother's Day 2024",
    img: "/gallery/img3.webp",
  },
  {
    title: "A Mother's Love",
    dept: "Pre-School & Primary",
    date: "Mother's Day 2024",
    img: "/gallery/img4.webp",
  },
  {
    title: "Morning Drop-offs",
    dept: "Campus Life",
    date: "Term 2, 2024",
    img: "/gallery/img5.webp",
  },
  {
    title: "Creative Arts in Action",
    dept: "Primary Department",
    date: "Creative Arts Week",
    img: "/gallery/img6.webp",
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Campus-Life", href: "#life" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#visit" },
];
