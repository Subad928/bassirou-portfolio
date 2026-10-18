// Single source of truth for portfolio content.
// Source: Bassirou's resume Google Doc (updated Oct 2026).

export const profile = {
  name: "Bassirou Diop",
  nameKana: "バシル・ディオップ",
  location: "Minneapolis, MN",
  cityKana: "ミネアポリス",
  phone: "612-360-0297",
  email: "diop.bassirou.928@gmail.com",
  tagline: ["Leader", "Debater", "Designer", "Volunteer", "Developer", "Fast learner"],
  intro:
    "I'm a senior at Southwest High in Minneapolis. I lead the Muslim Student Alliance and the Scrapbooking Club, co-captain the debate team, design the Black Student Union's website, and work at Dairy Queen. Now I'm looking for a part-time job or an entry-level internship where I can keep learning by doing.",
  objective:
    "Motivated and highly involved high school senior seeking a part-time job or entry-level internship. Strong leadership background, excellent communication skills, and a proven commitment to service, teamwork, and learning. Eager to contribute positively to a workplace while gaining real-world experience.",
};

export const education = {
  school: "Southwest High School",
  location: "Minneapolis, MN",
  grade: "12th Grade",
  graduation: "2027",
  program: "Full International Baccalaureate (IB) Higher Level Course Load",
};

// Clubs and student government, newest first.
export const leadership = [
  {
    role: "Secretary & Website Designer",
    org: "Black Student Union",
    date: "Feb 2026 — Now",
    points: ["Help plan events and discussions focused on culture, leadership, and student advocacy"],
  },
  {
    role: "President",
    org: "Scrapbooking Club",
    date: "Sep 2025 — Now",
    points: [
      "Plan activities for members and create a cohesive and friendly environment",
      "Teach students to express themselves through collages",
    ],
  },
  {
    role: "Member",
    org: "Student Council",
    date: "Sep 2025 — Now",
    points: [
      "Share my perspective to fix issues that I find at school",
      "Give the student body a voice to make school a space built for them",
    ],
  },
  {
    role: "Co-Captain",
    org: "Debate Team",
    date: "Dec 2024 — Now",
    points: [
      "Collaborate with team members to prepare arguments and strategies",
      "Develop public speaking, critical thinking, and persuasion skills",
    ],
  },
  {
    role: "President",
    org: "Muslim Student Alliance",
    date: "Sep 2024 — Now",
    points: [
      "Lead meetings and coordinate student activities and initiatives",
      "Represent Muslim students and promote inclusivity within the school community",
    ],
  },
];

// Paid work.
export const work = [
  {
    role: "Team Member",
    org: "Dairy Queen",
    date: "Mar 2026 — Now",
    points: [
      "Cooperating with a diverse team through understanding, leadership, and efficiency",
      "Working in customer service and preparing food (ice cream, burgers, etc.)",
      "Trained in food safety (allergies, chemicals, germs, etc.)",
      "Experience in stocking and logging product shipments",
    ],
  },
  {
    role: "Paid Student Election Judge",
    org: "City of Minneapolis",
    date: "Nov 2025",
    points: [
      "Worked at a polling place during the Minneapolis mayoral election",
      "Assisted voters, checked in registered voters, and helped maintain smooth election operations",
      "Communicated clearly with the public and election staff",
      "Demonstrated reliability and responsibility in a professional civic role",
    ],
  },
];

export const volunteering = [
  {
    org: "Feed My Starving Children",
    date: "Dec 2025",
    // logos are each organization's own, from their websites.
    // discBg is the disc's printed background (keeps the logo legible); discInk is its small print.
    logo: "/art/logos/fmsc.png",
    discBg: "#236192", // FMSC brand blue (their logo is white)
    discInk: "#ffffff",
    text: "Packaged meals efficiently as part of a team to support global hunger relief.",
  },
  {
    org: "Anthony Middle School",
    date: "Dec 2025",
    logo: "/art/logos/anthony.png",
    discBg: "#ffffff",
    discInk: "#9b1c35",
    text: "Helped younger students write letters to elderly residents in nursing homes, with patience and empathy.",
  },
  {
    org: "Al-Maa'uun Day of Dignity",
    date: "Community",
    logo: "/art/logos/almaauun.png",
    discBg: "#fff8ee",
    discInk: "#c8501e",
    text: "Supported local families in fast-paced, service-oriented community efforts.",
  },
];

// Grouped the same way as the Skills section of the resume.
export const skills = [
  { group: "Work", items: ["Customer service", "Food safety", "Inventory & stocking", "Teamwork"] },
  { group: "Technical", items: ["Website design & development", "Computer proficiency"] },
  {
    group: "Personal",
    items: ["Public speaking", "Leadership", "Problem solving", "Creativity", "Reliability", "Fast learner"],
  },
];

// Programming, markup and styling languages.
export const languages = ["JavaScript", "Python", "Java", "C++", "HTML", "CSS"];

export const activities = [
  "Tennis",
  "Debate",
  "Scrapbooking & creative design",
  "Black Student Union",
  "Muslim Student Alliance",
  "Student Council",
  "Unified Program",
  "Anchor Crew",
  "Building a productivity website",
];

export const availability = ["Weekdays after school", "Weekends", "Flexible scheduling"];
