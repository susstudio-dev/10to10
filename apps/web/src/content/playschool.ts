export const programs = [
  {
    slug: "playgroup",
    name: "Playgroup",
    age: "1.5 – 2.5 yrs",
    duration: "9:30 AM – 3:30 PM",
    ratio: "1 : 6",
    desc: "Sensory play, music, story time and gentle separation from parents in a warm, secure environment.",
    color: "from-amber-100 to-amber-50",
    accent: "text-amber-700",
  },
  {
    slug: "nursery",
    name: "Nursery",
    age: "2.5 – 3.5 yrs",
    duration: "9:30 AM – 3:30 PM",
    ratio: "1 : 8",
    desc: "Phonics through songs and stories, pre-writing through sand-tracing and clay-shaping, motor skills through climbing and pouring. Friendship grows in the process.",
    color: "from-rose-100 to-rose-50",
    accent: "text-rose-700",
  },
  {
    slug: "lkg",
    name: "Lower KG",
    age: "3.5 – 4.5 yrs",
    duration: "9:30 AM – 3:30 PM",
    ratio: "1 : 10",
    desc: "Reading through story-acting, writing through letter-tracing in sand, numbers through cooking and counting games. Science is mud, magnets, and curiosity — not lectures.",
    color: "from-teal-100 to-teal-50",
    accent: "text-teal-700",
  },
  {
    slug: "ukg",
    name: "Upper KG",
    age: "4.5 – 5.5 yrs",
    duration: "9:30 AM – 3:30 PM",
    ratio: "1 : 10",
    desc: "School-ready in language, math and science — but built through projects, debates, and discovery. Leadership grows from running their own corners and choosing their own work.",
    color: "from-indigo-100 to-indigo-50",
    accent: "text-indigo-700",
  },
];

export const curriculum = [
  {
    title: "Cognitive",
    desc: "Problem-solving, memory games, pattern recognition, early numeracy.",
  },
  {
    title: "Language",
    desc: "Phonics, story-telling, vocabulary building in English and Telugu.",
  },
  {
    title: "Social",
    desc: "Sharing, turn-taking, group projects and conflict-resolution skills.",
  },
  {
    title: "Motor",
    desc: "Fine motor (threading, lacing) and gross motor (climbing, balancing).",
  },
  {
    title: "Creative",
    desc: "Music, dance, painting, clay-modelling and free expression time.",
  },
  {
    title: "Values",
    desc: "Empathy, gratitude, mindfulness practices, age-appropriate yoga.",
  },
];

export const dailySchedule = [
  { time: "9:30 – 10:00", activity: "Play area (play time)" },
  { time: "10:00 – 11:00", activity: "Activity — art, stories, puzzles, basic numbers & letters" },
  { time: "11:00 – 11:30", activity: "Snack time" },
  { time: "11:30 – 12:30", activity: "Structured play — group games, interactions" },
  { time: "12:30 – 1:30", activity: "Lunch time" },
  { time: "1:30 – 2:00", activity: "Nap time" },
  { time: "2:00 – 2:45", activity: "Learning time — colouring, tracing letters" },
  { time: "2:45 – 3:00", activity: "Snack time" },
  { time: "3:00 – 3:30", activity: "Activities — alphabets & numbers, identification of things" },
];

export const schoolHours = {
  weekday: "Monday – Friday · 9:30 AM – 3:30 PM",
  saturday: "Saturday · half day · 9:30 AM – 12:30 PM",
};

export const snacksMenu = [
  { name: "Healthy Bites", desc: "Fresh fruit, nuts, sprouts, and seasonal produce." },
  { name: "Munchies", desc: "Light savouries — millet snacks, baked treats, no fried." },
  { name: "Balanced Drinks", desc: "Buttermilk, fresh juice, milk, and infused water." },
];

export const events = [
  {
    name: "Children's Day",
    date: "Nov 14",
    icon: "🎈",
    color: "from-sky-100 to-blue-50",
    accent: "text-sky-700",
    desc: "The day belongs to the kids. Surprise activities, special treats, and zero academics — just play, laughter, and tiny celebrations of being little.",
  },
  {
    name: "Teachers' Day",
    date: "Sep 5",
    icon: "🍎",
    color: "from-purple-100 to-violet-50",
    accent: "text-purple-700",
    desc: "Kids 'become teachers' for an hour, decorate the staff room, and write thank-you cards. A gentle introduction to gratitude.",
  },
  {
    name: "Diwali",
    date: "Oct / Nov",
    icon: "🪔",
    color: "from-amber-100 to-orange-50",
    accent: "text-orange-700",
    desc: "Diyas, rangoli, dressy clothes, and stories about light winning over dark. Festive snacks shared across every classroom.",
  },
  {
    name: "Christmas",
    date: "Dec 25",
    icon: "🎄",
    color: "from-emerald-100 to-green-50",
    accent: "text-emerald-700",
    desc: "A tiny tree in every classroom, hand-made ornaments, carols on the playground, and a small gift exchange before the winter break.",
  },
  {
    name: "Pongal",
    date: "Jan 14",
    icon: "🌾",
    color: "from-yellow-100 to-amber-50",
    accent: "text-yellow-700",
    desc: "Traditional pots, sugarcane decor, and the story of the harvest season. Kids help cook a simple sweet Pongal in class.",
  },
  {
    name: "Holi",
    date: "March",
    icon: "🎨",
    color: "from-pink-100 to-rose-50",
    accent: "text-rose-700",
    desc: "Safe, organic colours, sprinklers, music, and the messiest, most joyful play day of the year. Parents invited.",
  },
];

export const fees = [
  {
    plan: "Per Day",
    program: "All programs",
    price: "₹800",
    period: "/ day",
    note: "Try us before committing",
    popular: false,
  },
  {
    plan: "Monthly",
    program: "All programs",
    price: "₹8,000",
    period: "/ month",
    note: "Most popular · pay as you go",
    popular: true,
  },
  {
    plan: "Annual",
    program: "All programs",
    price: "₹80,000",
    period: "/ year",
    note: "Best value · save vs monthly",
    popular: false,
  },
];

export const admissionSteps = [
  {
    n: "01",
    title: "Submit inquiry",
    desc: "Fill the admission form below or WhatsApp us. We respond within 4 hours on weekdays.",
  },
  {
    n: "02",
    title: "Campus visit",
    desc: "Tour the facility, meet our teachers, see the play areas, ask anything. ~45 minutes.",
  },
  {
    n: "03",
    title: "Free trial day",
    desc: "Your child spends a half-day with the class. No pressure, no commitment.",
  },
  {
    n: "04",
    title: "Enrollment",
    desc: "Submit documents, pay the term fee, and welcome to the 10to10 family.",
  },
];

export const whyUs = [
  {
    title: "We don't teach. Kids learn by playing.",
    desc: "Phonics through songs, math through cooking, science through mud puddles. No worksheets, no flashcards, no drills.",
  },
  {
    title: "No homework. Ever.",
    desc: "When school's out, kids are kids. Curiosity gets fed at home — assignments don't.",
  },
  {
    title: "Discovery over instruction",
    desc: "Teachers set up the environment; children choose where to dive in. Self-directed exploration with gentle guidance.",
  },
  {
    title: "1:8 child–teacher ratio",
    desc: "Deliberately below the industry standard so every child is genuinely seen — not crowd-managed.",
  },
  {
    title: "Daily reports app",
    desc: "Photos, meals, mood and milestones delivered to your phone before pickup every day.",
  },
  {
    title: "Open-door policy",
    desc: "Visit unannounced any time. We have nothing to hide and everything to show.",
  },
];

export const playSchoolFaqs = [
  {
    q: "Do you actually teach lessons?",
    a: "Not the way most preschools do. There are no desks-and-blackboard sessions. Children learn through play, projects, and exploration — reading happens through stories, math through cooking, science through curiosity. The academic skills are real and measurable; the method is different.",
  },
  {
    q: "Will my child be ready for Class 1 in a regular school?",
    a: "Yes. Our Upper KG graduates enter primary school with strong reading, math, language and — most importantly — the curiosity and self-direction that rote-trained kids often lose. Parents tell us their children stand out for being engaged, not just informed.",
  },
  {
    q: "Is there homework?",
    a: "No. A four-year-old's evening should be family time, free play, and rest. Learning happens in our hours; home is for being a kid.",
  },
  {
    q: "What is the minimum age for admission?",
    a: "We accept children from 18 months for Playgroup. They should ideally be walking confidently and able to spend ~3 hours away from a parent.",
  },
  {
    q: "What are the school timings?",
    a: "Monday to Friday: 9:30 AM – 3:30 PM. Saturday: half day, 9:30 AM – 12:30 PM. All four programs (Playgroup, Nursery, LKG, UKG) follow the same daily schedule with age-appropriate activities at each station.",
  },
  {
    q: "Do you provide transport?",
    a: "Currently no. We're located on Mamatha College Road which is central enough that most families do their own pickup. We're happy to coordinate carpools.",
  },
  {
    q: "What about food and snacks?",
    a: "We provide two fresh, nutritionist-approved snacks daily — one mid-morning and one mid-afternoon — rotating between Healthy Bites (fruit, nuts, sprouts), Munchies (millet snacks, baked treats), and Balanced Drinks (buttermilk, fresh juice, milk). Lunch is parent-packed. Strict no-junk-food policy and we accommodate allergies.",
  },
  {
    q: "What happens if my child is sick?",
    a: "Please keep them home if they have fever, cough or diarrhea. We send a sick child home immediately to protect everyone. Make-up days for prolonged illness are case-by-case.",
  },
  {
    q: "What is the vacation calendar?",
    a: "Term 1: June – Sept · Term 2: Oct – Dec · Term 3: Jan – March. Standard Indian holidays plus a 2-week summer break in April.",
  },
  {
    q: "What is the fee refund policy?",
    a: "Full refund within 7 days of enrollment if your child has not attended a single session. After attendance begins, fees are non-refundable but transferable to a sibling.",
  },
  {
    q: "How often are parent-teacher meetings?",
    a: "Quarterly formal PTMs plus an open-door policy any time. We also host monthly themed parent workshops on topics like screen time, nutrition, sleep.",
  },
  {
    q: "Is there a uniform?",
    a: "Yes — comfortable, weather-appropriate, included in the annual fee. We avoid restrictive clothing that hampers free movement.",
  },
  {
    q: "Can I observe a class before deciding?",
    a: "Absolutely. We offer a free trial day where your child joins a real class. Many parents also stay on a back-bench to observe directly.",
  },
];

export const parentStories = [
  {
    quote:
      "We toured 4 play schools in Khammam before choosing 10to10. The 1:8 ratio made the difference — our daughter actually gets attention, not crowd-control.",
    name: "Vasudha & Karthik",
    program: "Nursery, enrolled 2025",
  },
  {
    quote:
      "Our older daughter went to a 'top' preschool in Khammam — phonics flashcards at 2, homework at 3, tears every morning. We didn't want the same for our son. At 10to10 he comes home talking about what he discovered. He's reading at the same pace — but he's still in love with books.",
    name: "Sneha P.",
    program: "Playgroup, enrolled 2026",
  },
  {
    quote:
      "What sold us was the open-door policy. We dropped in unannounced twice — both times the place was clean, calm and the kids were genuinely engaged. That's rare.",
    name: "Rajesh M.",
    program: "LKG, enrolled 2025",
  },
];
