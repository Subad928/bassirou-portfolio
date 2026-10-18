// Content for the secret art page (#/art).
//
// To add a piece: put the image in public/art/ (e.g. public/art/koi-sketch.jpg)
// and add an entry below with  image: "/art/koi-sketch.jpg".
// Entries without an image show a placeholder frame.
// When a list is empty, the page shows a few empty "coming soon" frames instead.

export const webDesign = [
  {
    title: "This portfolio",
    year: "2026",
    desc: "A city that turns from morning to midnight as you scroll, with layered skylines, comic-book cards and a neon sign. Built in React.",
    tags: ["React", "CSS", "SVG"],
    image: "/art/web-portfolio.jpg",
    link: "#top",
  },
  {
    title: "Southwest Black Student Union",
    year: "2026",
    desc: "The BSU's website, which I design as the club's Secretary & Website Designer: meetings, leaders, a newsletter and a photo gallery.",
    tags: ["Web design", "Club"],
    image: "/art/web-bsu.jpg",
    link: "https://swhs-bsu.vercel.app/",
  },
  {
    title: "School Finance Management",
    year: "Client site",
    desc: "A website for SFM, a consulting firm that helps K-12 school districts strengthen financial controls, planning and operations.",
    tags: ["Client work", "Business"],
    image: "/art/web-sfm.jpg",
    link: "https://www.sfmk12.com/",
  },
];

// e.g. { title: "Koi study", year: "2026", medium: "Pencil on paper", image: "/art/koi-study.jpg" }
export const drawings = [];

// e.g. { title: "Floating island", year: "2026", tool: "Blender", image: "/art/island.png" }
export const threeD = [];
