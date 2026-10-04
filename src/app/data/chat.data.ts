export type DynamicIntent =
  | 'eligible' | 'deadlines' | 'score' | 'applications' | 'alerts' | 'courses' | 'profile';

export interface ChatQA {
  id: string;
  question: string;
  keywords: string[];
  answer?: string;
  dynamic?: DynamicIntent;
  suggestions?: string[];
}

export const DEFAULT_SUGGESTIONS = [
  'Which companies am I eligible for?',
  'How do I prepare for aptitude?',
  'Tips for my resume',
  'Upcoming deadlines',
];

export const FALLBACK_ANSWER =
  'Hmm, I\'m not sure about that one yet. I\'m best at placement questions — try asking me about your eligible drives, deadlines, interview prep, aptitude, resumes, or the courses in the app.';

export const QA_ENTRIES: ChatQA[] = [
  {
    id: 'greet',
    question: 'Hi!',
    keywords: ['hi', 'hello', 'hey', 'vanakkam', 'good morning', 'good afternoon', 'namaste'],
    answer: 'Hello! I\'m your placement assistant. I can check your eligible drives, upcoming deadlines, AI readiness score, or help with interview, aptitude and resume doubts. What would you like to know?',
    suggestions: DEFAULT_SUGGESTIONS,
  },
  {
    id: 'help',
    question: 'What can you help me with?',
    keywords: ['help', 'what can you do', 'features', 'options', 'assist'],
    answer: 'Here\'s what I can do:\n• Check which campus drives you\'re eligible for\n• Show upcoming deadlines and your applications\n• Explain your AI readiness score\n• Give prep advice — aptitude, DSA, SQL, resume, interviews, GD\n• Point you to the right course in the Courses tab',
    suggestions: DEFAULT_SUGGESTIONS,
  },
  {
    id: 'eligible',
    question: 'Which companies am I eligible for?',
    keywords: ['eligible', 'eligibility', 'eligible companies', 'which companies', 'can i apply'],
    dynamic: 'eligible',
    suggestions: ['Upcoming deadlines', 'How do I improve eligibility?', 'My applications'],
  },
  {
    id: 'deadlines',
    question: 'Upcoming deadlines',
    keywords: ['deadline', 'deadlines', 'last date', 'closing', 'when is the', 'upcoming'],
    dynamic: 'deadlines',
    suggestions: ['Which companies am I eligible for?', 'My applications'],
  },
  {
    id: 'score',
    question: 'What is my AI readiness score?',
    keywords: ['score', 'ai score', 'readiness', 'prediction', 'chances', 'placed'],
    dynamic: 'score',
    suggestions: ['How do I improve eligibility?', 'Which companies am I eligible for?'],
  },
  {
    id: 'applications',
    question: 'My applications',
    keywords: ['applied', 'applications', 'my applications', 'application status', 'submitted'],
    dynamic: 'applications',
    suggestions: ['Upcoming deadlines', 'Which companies am I eligible for?'],
  },
  {
    id: 'alerts',
    question: 'Any new notifications?',
    keywords: ['notification', 'notifications', 'alert', 'alerts', 'announcement', 'news'],
    dynamic: 'alerts',
    suggestions: ['Upcoming deadlines', 'What can you help me with?'],
  },
  {
    id: 'courses',
    question: 'What courses are available?',
    keywords: ['course', 'courses', 'learn', 'study material', 'syllabus'],
    dynamic: 'courses',
    suggestions: ['How do I prepare for aptitude?', 'DSA roadmap', 'Improve my communication skills'],
  },
  {
    id: 'profile',
    question: 'Show my profile summary',
    keywords: ['profile', 'my details', 'about me', 'my cgpa', 'who am i'],
    dynamic: 'profile',
    suggestions: ['What is my AI readiness score?', 'Which companies am I eligible for?'],
  },
  {
    id: 'aptitude',
    question: 'How do I prepare for aptitude?',
    keywords: ['aptitude', 'quant', 'quantitative', 'reasoning', 'puzzle', 'nqt preparation'],
    answer: 'Aptitude prep plan that works for most campus tests:\n\n1. Basics first — percentages, ratios, averages, profit & loss\n2. Then speed topics — TSD, time & work, number series\n3. Practice 20 questions daily with a timer\n4. Take a sectional mock every weekend\n\nCheck "Quantitative Aptitude Mastery" and "Logical Reasoning & DI" in the Courses tab — they follow this exact order.',
    suggestions: ['What courses are available?', 'TCS NQT pattern', 'How to crack coding rounds'],
  },
  {
    id: 'dsa',
    question: 'DSA roadmap for placements',
    keywords: ['dsa', 'data structure', 'data structures', 'algorithm', 'algorithms', 'coding round', 'leetcode', 'programming'],
    answer: 'DSA roadmap for campus placements:\n\n1. Week 1–2: Arrays, strings, two pointers, sliding window\n2. Week 3–4: Linked lists, stacks, queues, hashing\n3. Week 5–6: Recursion, trees, BST\n4. Week 7–8: Graphs (BFS/DFS), heaps, basic DP\n\nPractice 2 problems a day on any platform. The "DSA in Java" course covers all of this with the top 50 company questions.',
    suggestions: ['What courses are available?', 'Zoho interview process', 'How do I prepare for aptitude?'],
  },
  {
    id: 'sql',
    question: 'Important SQL interview questions',
    keywords: ['sql', 'database', 'dbms', 'query', 'queries', 'joins'],
    answer: 'Most-asked SQL questions in placement interviews:\n\n• Find the 2nd / Nth highest salary\n• Difference between WHERE and HAVING\n• Find duplicate values in a column\n• INNER vs LEFT JOIN with examples\n• Employee–manager self-join\n• Normalisation — 1NF/2NF/3NF\n\nThe "SQL & Database Skills" course has worked answers for all of these.',
    suggestions: ['What courses are available?', 'DSA roadmap'],
  },
  {
    id: 'resume',
    question: 'Tips for my resume',
    keywords: ['resume', 'cv', 'biodata'],
    answer: 'Resume tips that get freshers shortlisted:\n\n• One page only — recruiters spend ~10 seconds\n• Start bullets with action verbs: Built, Led, Designed\n• Quantify: "improved accuracy by 20%" beats "improved accuracy"\n• Match keywords to the job description (ATS filters)\n• Projects > skills list — show, don\'t tell\n\nThe "Resume & Interview Mastery" course walks through this step by step.',
    suggestions: ['HR interview questions', 'What courses are available?'],
  },
  {
    id: 'hr',
    question: 'HR interview questions',
    keywords: ['hr', 'hr round', 'hr interview', 'tell me about yourself', 'strength', 'weakness', 'interview questions'],
    answer: 'Top HR questions and how to handle them:\n\n• "Tell me about yourself" — 90-second formula: present → past → future\n• "Strengths/weaknesses" — always pair weakness with what you\'re doing about it\n• "Why this company?" — mention one specific product or value\n• "Are you ok relocating?" — answer honestly, don\'t hedge\n• "Salary expectation?" — "As per company standards for freshers"\n\nNever memorise answers word-for-word — prepare bullet points instead.',
    suggestions: ['Group discussion tips', 'Technical interview tips', 'Tips for my resume'],
  },
  {
    id: 'technical',
    question: 'Technical interview tips',
    keywords: ['technical interview', 'technical round', 'project questions', 'explain project', 'viva'],
    answer: 'Technical interview essentials:\n\n• Know every project on your resume — architecture first, then your contribution\n• Revise OOP concepts, DBMS basics and your strongest language\n• Think out loud — interviewers grade approach, not just answers\n• If stuck, say so and reason aloud; never bluff\n• Prepare 2 questions to ask the interviewer at the end',
    suggestions: ['HR interview questions', 'DSA roadmap', 'Important SQL interview questions'],
  },
  {
    id: 'gd',
    question: 'Group discussion tips',
    keywords: ['group discussion', 'gd', 'gd round'],
    answer: 'How to stand out in a GD:\n\n• Initiate early or summarise well — both score points\n• Use PREP: Point → Reason → Example → Point\n• Speak 3–4 times for 30 seconds rather than once for 3 minutes\n• Build on others\' points — "adding to what X said…"\n• Stay calm if opposed; attack ideas, not people',
    suggestions: ['HR interview questions', 'Improve my communication skills'],
  },
  {
    id: 'communication',
    question: 'Improve my communication skills',
    keywords: ['communication', 'english', 'spoken', 'speaking', 'soft skill', 'fluency'],
    answer: 'Fastest ways to improve spoken English for interviews:\n\n• Think in English — narrate your day mentally\n• Do 60-second speaking drills daily and record yourself\n• Shadow interview videos — repeat sentences aloud\n• Learn 5 new phrases a day, use them the same day\n\nThe "Communication & Soft Skills" course has daily drills for exactly this.',
    suggestions: ['What courses are available?', 'Group discussion tips', 'HR interview questions'],
  },
  {
    id: 'tcs',
    question: 'TCS NQT pattern',
    keywords: ['tcs', 'nqt', 'ninja', 'tcs nqt'],
    answer: 'TCS NQT at a glance:\n\n• Sections: Numerical Ability, Verbal Ability, Reasoning Ability, Coding\n• ~90 minutes for the foundation sections + a separate coding section\n• No negative marking in recent editions — attempt everything\n• Ninja ≈ ₹3.6 LPA; higher scores can shortlist you for Digital (₹7 LPA+)\n\nCompany-wise Prep → TCS NQT module has the full syllabus breakdown.',
    suggestions: ['How do I prepare for aptitude?', 'Upcoming deadlines'],
  },
  {
    id: 'product',
    question: 'Zoho interview process',
    keywords: ['zoho', 'freshworks', 'product company', 'product companies', 'amazon'],
    answer: 'Product companies like Zoho/Freshworks differ from service companies:\n\n• Multiple programming rounds — output prediction + write code on paper\n• Heavy focus on C/Java fundamentals, arrays, strings and OOP\n• No strict cutoff on college reputation — skill decides\n• Expect 3–5 rounds spread over a full day or several days\n\nThe DSA in Java course + "Company-Wise Prep" course cover their favourite questions.',
    suggestions: ['DSA roadmap', 'Which companies am I eligible for?'],
  },
  {
    id: 'cgpa',
    question: 'How important is CGPA?',
    keywords: ['cgpa', 'gpa', 'percentage', 'marks', 'academics'],
    answer: 'CGPA matters mainly as an eligibility filter:\n\n• Most service companies: 6.0–6.5 minimum\n• Product companies like Zoho/Freshworks: 7.5–8.0+\n• Amazon-tier drives: 8.5+\n\nOnce you clear the filter, interview performance matters far more than your exact CGPA. If you\'re below a cutoff, focus on skills and certifications — some drives waive CGPA for strong candidates.',
    suggestions: ['Which companies am I eligible for?', 'What is my AI readiness score?'],
  },
  {
    id: 'arrears',
    question: 'Do arrears affect placements?',
    keywords: ['arrear', 'arrears', 'backlog', 'backlogs', 'failed'],
    answer: 'Yes, standing arrears affect eligibility:\n\n• Product companies usually demand zero arrears\n• Service companies may allow 1–3 standing arrears\n• Cleared (history of) arrears are more forgiving than standing ones\n\nPriority: clear arrears before the placement season peaks. Meanwhile, target drives with relaxed arrear criteria — I can check which ones you\'re eligible for.',
    suggestions: ['Which companies am I eligible for?', 'Upcoming deadlines'],
  },
  {
    id: 'certs',
    question: 'Are certifications worth it?',
    keywords: ['certification', 'certifications', 'certificate', 'nptel', 'aws', 'azure', 'coursera'],
    answer: 'Certifications help when they\'re relevant:\n\n• Cloud (AWS/Azure/GCP) — valued by almost every recruiter\n• NPTEL courses — respected for technical depth\n• Google/Data certs — good for analyst roles\n\nQuality over quantity: 2–3 relevant certifications beat a long random list. They also add points to your AI readiness score.',
    suggestions: ['What is my AI readiness score?', 'What courses are available?'],
  },
  {
    id: 'apply',
    question: 'How do I apply for a drive?',
    keywords: ['apply', 'how to apply', 'register', 'registration', 'submit application'],
    answer: 'Applying takes 3 steps:\n\n1. Open the Drives tab and tap a company card\n2. Check the eligibility panel — green checks mean you qualify\n3. Tap "Apply Now" — the placement cell verifies and forwards it\n\nYou can see all your submissions by asking me "my applications" anytime.',
    suggestions: ['My applications', 'Which companies am I eligible for?'],
  },
  {
    id: 'improve',
    question: 'How do I improve eligibility?',
    keywords: ['improve', 'not eligible', 'increase chances', 'boost', 'eligibility'],
    answer: 'To become eligible for more drives:\n\n• Raise CGPA — even +0.3 opens more doors\n• Clear standing arrears before deadlines\n• Add the exact skills listed in drive requirements (see the "Required skills" chips on each drive)\n• 1–2 certifications push borderline profiles through\n\nAsk me "what is my AI readiness score" and I\'ll list the highest-impact improvements for your profile.',
    suggestions: ['What is my AI readiness score?', 'Which companies am I eligible for?'],
  },
  {
    id: 'mock',
    question: 'Where can I take mock tests?',
    keywords: ['mock', 'mock test', 'practice test', 'test series', 'sample paper'],
    answer: 'Mock test sources:\n\n• The placement cell runs a mock aptitude test every Friday (Lab 3, 10 AM)\n• Course sectional mocks — inside "Quantitative Aptitude Mastery" in Courses\n• Previous company papers — in the "Company-Wise Prep" course\n\nTake at least one timed mock a week and review every wrong answer.',
    suggestions: ['How do I prepare for aptitude?', 'What courses are available?'],
  },
  {
    id: 'plan',
    question: 'Make me a study plan',
    keywords: ['study plan', 'schedule', 'timetable', 'time table', 'prepare in', 'daily routine', 'how many hours'],
    answer: 'A realistic 8-week placement plan:\n\n• Daily: 1 hr aptitude + 2 coding problems\n• Alternate days: 1 technical subject (DSA/SQL/DBMS)\n• Weekends: one full mock + resume/GD practice\n• Final 2 weeks: company-specific papers only\n\nConsistency beats cramming — 3 focused hours daily is enough.',
    suggestions: ['What courses are available?', 'How do I prepare for aptitude?'],
  },
  {
    id: 'thanks',
    question: 'Thank you!',
    keywords: ['thank', 'thanks', 'thank you', 'helpful', 'great', 'awesome'],
    answer: 'You\'re welcome! Good luck with your preparation — ping me anytime you have a doubt.',
    suggestions: DEFAULT_SUGGESTIONS,
  },
  {
    id: 'bye',
    question: 'Bye',
    keywords: ['bye', 'goodbye', 'see you', 'good night'],
    answer: 'Bye! All the best for your placements — I\'ll be here if you need anything.',
    suggestions: [],
  },
];
