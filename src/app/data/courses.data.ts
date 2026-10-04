import { Course } from '../models/models';

export const COURSES: Course[] = [
  {
    id: 'CR01',
    title: 'Quantitative Aptitude Mastery',
    category: 'Aptitude',
    level: 'Beginner',
    description: 'Build the numerical speed and accuracy needed to clear aptitude rounds of both service and product company drives. Covers every topic asked in TCS NQT, Infosys and Wipro tests.',
    outcomes: [
      'Solve arithmetic problems in under 60 seconds',
      'Attempt 40+ questions with 90% accuracy',
      'Apply shortcuts for NQT-style questions',
    ],
    icon: 'calculator',
    color: '#7c3aed',
    rating: 4.7,
    learners: 1240,
    modules: [
      {
        title: 'Number System & Arithmetic',
        lessons: [
          {
            id: 'cr01-l1', title: 'HCF, LCM & Divisibility Rules', minutes: 30,
            points: [
              'Prime factorisation method for HCF and LCM',
              'Divisibility rules for 2–12 with examples',
              'Remainder theorem basics and cyclic remainders',
            ],
          },
          {
            id: 'cr01-l2', title: 'Percentages, Profit & Loss', minutes: 35,
            points: [
              'Fraction-to-percentage conversion table',
              'Successive percentage change formula',
              'Marked price, discount and dishonest dealer problems',
            ],
          },
          {
            id: 'cr01-l3', title: 'Ratio, Proportion & Averages', minutes: 30,
            points: [
              'Componendo-dividendo shortcuts',
              'Weighted average and mixture problems',
              'Alligation rule for mixtures and replacements',
            ],
          },
        ],
      },
      {
        title: 'Speed & Accuracy',
        lessons: [
          {
            id: 'cr01-l4', title: 'Simplification & Approximation', minutes: 25,
            points: [
              'BODMAS with fractional expressions',
              'Approximation tricks for decimal calculations',
              'Squares, cubes and root memorisation up to 30',
            ],
          },
          {
            id: 'cr01-l5', title: 'Number Series & Pattern Recognition', minutes: 30,
            points: [
              'Difference, ratio and alternating series types',
              'Square/cube and prime-based series',
              'Wrong-number-in-series elimination strategy',
            ],
          },
        ],
      },
      {
        title: 'Applied Aptitude',
        lessons: [
          {
            id: 'cr01-l6', title: 'Time, Speed & Distance', minutes: 40,
            points: [
              'Relative speed for trains and boats',
              'Average speed for equal distances',
              'Races and circular track problems',
            ],
          },
          {
            id: 'cr01-l7', title: 'Time & Work / Pipes & Cisterns', minutes: 35,
            points: [
              'LCM method for combined work',
              'Efficiency-based problems',
              'Alternate days and negative work',
            ],
          },
          {
            id: 'cr01-l8', title: 'Permutation, Combination & Probability', minutes: 45,
            points: [
              'nPr vs nCr — when order matters',
              'Circular and restricted arrangements',
              'Probability of independent and dependent events',
            ],
          },
        ],
      },
      {
        title: 'Practice & Strategy',
        lessons: [
          {
            id: 'cr01-l9', title: 'Sectional Mock Tests', minutes: 60,
            points: [
              'Timed 20-question sets per topic',
              'Error log technique for revision',
              'Accuracy vs attempt-rate balance',
            ],
          },
          {
            id: 'cr01-l10', title: 'Shortcut Methods for NQT-style Exams', minutes: 30,
            points: [
              'Option elimination and unit-digit checks',
              'When to skip: identifying time-sink questions',
              'Last-10-days revision plan',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR02',
    title: 'Logical Reasoning & Data Interpretation',
    category: 'Aptitude',
    level: 'Intermediate',
    description: 'Master the reasoning section that decides most service-company cutoffs — puzzles, arrangements, coding and DI sets solved with structured methods.',
    outcomes: [
      'Solve seating and puzzle sets systematically',
      'Decode any series or coding question',
      'Interpret charts and tables under time pressure',
    ],
    icon: 'extension-puzzle',
    color: '#0891b2',
    rating: 4.6,
    learners: 960,
    modules: [
      {
        title: 'Reasoning Core',
        lessons: [
          {
            id: 'cr02-l1', title: 'Coding–Decoding & Letter Series', minutes: 30,
            points: [
              'Shift, reverse-shift and position-based coding',
              'Chinese coding — comparing common words',
              'Alphabet position tricks (EJOTY method)',
            ],
          },
          {
            id: 'cr02-l2', title: 'Blood Relations, Directions & Ordering', minutes: 30,
            points: [
              'Family-tree diagram method',
              'Direction sense with turns and shadows',
              'Ranking and ordering puzzles',
            ],
          },
          {
            id: 'cr02-l3', title: 'Syllogisms & Statement–Conclusion', minutes: 35,
            points: [
              'Venn diagram method for all cases',
              'Possibility vs definite conclusions',
              'Common traps in "some" and "only" statements',
            ],
          },
        ],
      },
      {
        title: 'Puzzles & Arrangements',
        lessons: [
          {
            id: 'cr02-l4', title: 'Seating Arrangements', minutes: 40,
            points: [
              'Linear, circular and rectangular setups',
              'Facing inward vs outward — direction handling',
              'Definite vs possible-position clues',
            ],
          },
          {
            id: 'cr02-l5', title: 'Scheduling & Selection Puzzles', minutes: 35,
            points: [
              'Day/month scheduling grids',
              'Selection with constraint elimination',
              'Making a table before attempting questions',
            ],
          },
        ],
      },
      {
        title: 'Data Interpretation',
        lessons: [
          {
            id: 'cr02-l6', title: 'Tables, Bar & Pie Charts', minutes: 40,
            points: [
              'Reading axes and units correctly',
              'Percentage-change questions',
              'Ratio comparisons between data sets',
            ],
          },
          {
            id: 'cr02-l7', title: 'Caselet DI & Approximation', minutes: 35,
            points: [
              'Converting paragraph data into tables',
              'When approximation is safe',
              'Missing-data DI sets',
            ],
          },
        ],
      },
      {
        title: 'Verbal & Non-Verbal Reasoning',
        lessons: [
          {
            id: 'cr02-l8', title: 'Critical Reasoning', minutes: 30,
            points: [
              'Strengthen and weaken arguments',
              'Assumption and inference identification',
              'Course-of-action questions',
            ],
          },
          {
            id: 'cr02-l9', title: 'Pattern & Figure Problems', minutes: 25,
            points: [
              'Figure series and analogies',
              'Mirror and water images',
              'Paper folding and cutting',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR03',
    title: 'Data Structures & Algorithms in Java',
    category: 'Technical',
    level: 'Advanced',
    description: 'The complete DSA track for coding rounds of Zoho, Freshworks and Amazon-style interviews — from complexity analysis to dynamic programming, all in Java.',
    outcomes: [
      'Solve 2 coding-round problems in 60 minutes',
      'Recognise the pattern behind unseen problems',
      'Write clean, interview-ready Java solutions',
    ],
    icon: 'code-slash',
    color: '#16a34a',
    rating: 4.8,
    learners: 1820,
    modules: [
      {
        title: 'Foundations',
        lessons: [
          {
            id: 'cr03-l1', title: 'Complexity & Big-O Analysis', minutes: 30,
            points: [
              'Time vs space complexity trade-offs',
              'Analysing loops, recursion and built-in calls',
              'Why O(n log n) beats O(n²) at interview scale',
            ],
          },
          {
            id: 'cr03-l2', title: 'Arrays & Strings Deep Dive', minutes: 45,
            points: [
              'Kadane\'s algorithm for maximum subarray',
              'String reversal, anagrams and palindromes',
              'In-place modification techniques',
            ],
          },
          {
            id: 'cr03-l3', title: 'Recursion & Backtracking Basics', minutes: 40,
            points: [
              'Base case and recursive case design',
              'Subsets, permutations and N-Queens',
              'Pruning the recursion tree',
            ],
          },
        ],
      },
      {
        title: 'Linear & Hashing Structures',
        lessons: [
          {
            id: 'cr03-l4', title: 'Linked Lists, Stacks & Queues', minutes: 45,
            points: [
              'Reversal, cycle detection (Floyd\'s) and merging',
              'Stack for balanced parentheses and next-greater-element',
              'Queue-based order processing problems',
            ],
          },
          {
            id: 'cr03-l5', title: 'Hashing & Two-Pointer Patterns', minutes: 40,
            points: [
              'HashMap for frequency and lookup problems',
              'Two-sum family of problems',
              'Pairwise and sorted-array two pointers',
            ],
          },
          {
            id: 'cr03-l6', title: 'Sliding Window Techniques', minutes: 35,
            points: [
              'Fixed vs variable window size',
              'Longest substring without repeats',
              'Minimum window substring pattern',
            ],
          },
        ],
      },
      {
        title: 'Trees & Graphs',
        lessons: [
          {
            id: 'cr03-l7', title: 'Binary Trees & BST', minutes: 45,
            points: [
              'Inorder, preorder, postorder and level order',
              'LCA, diameter and height problems',
              'BST validation and kth-smallest element',
            ],
          },
          {
            id: 'cr03-l8', title: 'Graphs — BFS & DFS', minutes: 45,
            points: [
              'Adjacency list representation in Java',
              'Connected components and islands',
              'Shortest path in unweighted graphs',
            ],
          },
          {
            id: 'cr03-l9', title: 'Heaps & Priority Queues', minutes: 30,
            points: [
              'Kth largest/smallest element',
              'Merge k sorted lists',
              'Top-K frequent elements',
            ],
          },
        ],
      },
      {
        title: 'Interview Practice',
        lessons: [
          {
            id: 'cr03-l10', title: 'Dynamic Programming Patterns', minutes: 60,
            points: [
              'Memoisation vs tabulation',
              'Classic set: fibonacci, climbing stairs, coin change',
              'Knapsack and LIS families',
            ],
          },
          {
            id: 'cr03-l11', title: 'Top 50 Company Questions', minutes: 90,
            points: [
              'Zoho-favourite array and matrix problems',
              'Amazon leadership-principle-linked problems',
              'Timed mock: solve 3 problems in 90 minutes',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR04',
    title: 'SQL & Database Skills',
    category: 'Technical',
    level: 'Beginner',
    description: 'SQL is asked in nearly every technical interview. Learn to write and explain queries confidently — from SELECT basics to joins, aggregation and schema design.',
    outcomes: [
      'Write joins and subqueries without hesitation',
      'Answer the 20 most-asked SQL interview questions',
      'Explain normalisation with real examples',
    ],
    icon: 'server',
    color: '#ea580c',
    rating: 4.5,
    learners: 880,
    modules: [
      {
        title: 'Querying Data',
        lessons: [
          {
            id: 'cr04-l1', title: 'SELECT, WHERE & Sorting', minutes: 30,
            points: [
              'Filtering with WHERE, IN, BETWEEN, LIKE',
              'ORDER BY multiple columns',
              'DISTINCT and LIMIT usage',
            ],
          },
          {
            id: 'cr04-l2', title: 'Joins & Set Operations', minutes: 40,
            points: [
              'INNER, LEFT, RIGHT and FULL joins',
              'Self-joins for employee–manager data',
              'UNION, INTERSECT and EXCEPT',
            ],
          },
        ],
      },
      {
        title: 'Aggregation & Analysis',
        lessons: [
          {
            id: 'cr04-l3', title: 'GROUP BY & Aggregate Functions', minutes: 35,
            points: [
              'COUNT, SUM, AVG, MIN, MAX in practice',
              'HAVING vs WHERE — the classic interview trap',
              'Grouping by multiple columns',
            ],
          },
          {
            id: 'cr04-l4', title: 'Subqueries & Views', minutes: 35,
            points: [
              'Correlated vs non-correlated subqueries',
              'EXISTS and NOT EXISTS',
              'Creating and updating views',
            ],
          },
        ],
      },
      {
        title: 'Design Basics',
        lessons: [
          {
            id: 'cr04-l5', title: 'Keys, Constraints & Normalisation', minutes: 35,
            points: [
              'Primary, foreign, unique and candidate keys',
              '1NF, 2NF, 3NF with examples',
              'When denormalisation is acceptable',
            ],
          },
          {
            id: 'cr04-l6', title: 'Transactions & ACID', minutes: 25,
            points: [
              'COMMIT, ROLLBACK and SAVEPOINT',
              'ACID properties explained simply',
              'Isolation levels overview',
            ],
          },
        ],
      },
      {
        title: 'Interview Prep',
        lessons: [
          {
            id: 'cr04-l7', title: 'Top SQL Interview Queries', minutes: 45,
            points: [
              'Nth highest salary — three different ways',
              'Finding duplicates and second-maximum',
              'Employee–department join scenarios',
            ],
          },
          {
            id: 'cr04-l8', title: 'Case Practice: Placement Database', minutes: 40,
            points: [
              'Query a student–company–application schema',
              'Report-style questions recruiters ask',
              'Explaining your query out loud',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR05',
    title: 'Communication & Soft Skills',
    category: 'Soft Skills',
    level: 'Beginner',
    description: 'Clear spoken English and confident communication decide GD and HR rounds. Practice drills, frameworks and feedback loops built for campus interviews.',
    outcomes: [
      'Speak for 2 minutes on any topic without pauses',
      'Contribute meaningfully in group discussions',
      'Write professional emails to recruiters',
    ],
    icon: 'mic',
    color: '#db2777',
    rating: 4.6,
    learners: 1500,
    modules: [
      {
        title: 'Spoken English',
        lessons: [
          {
            id: 'cr05-l1', title: 'Fluency & Vocabulary Building', minutes: 30,
            points: [
              'The think-in-English habit',
              '20 high-frequency interview phrases',
              'Filler-word elimination practice',
            ],
          },
          {
            id: 'cr05-l2', title: 'Pronunciation & Listening Skills', minutes: 25,
            points: [
              'Commonly mispronounced tech words',
              'Shadowing technique for accent clarity',
              'Active listening in interviews',
            ],
          },
        ],
      },
      {
        title: 'Group Discussion',
        lessons: [
          {
            id: 'cr05-l3', title: 'GD Frameworks & Roles', minutes: 35,
            points: [
              'Opening, supporting and summarising roles',
              'The PREP structure: Point–Reason–Example–Point',
              'Handling interruptions politely',
            ],
          },
          {
            id: 'cr05-l4', title: 'Current Affairs Topics', minutes: 30,
            points: [
              'AI in hiring — a trending GD topic',
              'Balanced views on abstract topics',
              'Using data points without memorising numbers',
            ],
          },
        ],
      },
      {
        title: 'Professional Presence',
        lessons: [
          {
            id: 'cr05-l5', title: 'Body Language & Confidence', minutes: 25,
            points: [
              'Posture, eye contact and hand gestures',
              'Managing nervous habits on camera',
              'Voice modulation for emphasis',
            ],
          },
          {
            id: 'cr05-l6', title: 'Email & Workplace Etiquette', minutes: 25,
            points: [
              'Subject lines that get replies',
              'Formal email structure to HR',
              'LinkedIn message etiquette',
            ],
          },
        ],
      },
      {
        title: 'Presentation Skills',
        lessons: [
          {
            id: 'cr05-l7', title: 'Structuring a Presentation', minutes: 30,
            points: [
              'The 3-act structure for tech talks',
              'One idea per slide rule',
              'Handling Q&A gracefully',
            ],
          },
          {
            id: 'cr05-l8', title: 'Speaking Practice Drills', minutes: 30,
            points: [
              'Self-record and review method',
              'Impromptu speaking: 60-second drills',
              'Peer feedback checklist',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR06',
    title: 'Resume & Interview Mastery',
    category: 'Career',
    level: 'Intermediate',
    description: 'Turn your profile into a one-page resume recruiters shortlist, then convert shortlists into offers with structured HR and technical interview preparation.',
    outcomes: [
      'Build an ATS-friendly one-page resume',
      'Answer "Tell me about yourself" in 90 seconds',
      'Explain projects using the STAR method',
    ],
    icon: 'document-text',
    color: '#4f46e5',
    rating: 4.8,
    learners: 2100,
    modules: [
      {
        title: 'Resume Building',
        lessons: [
          {
            id: 'cr06-l1', title: 'Crafting a One-Page Resume', minutes: 35,
            points: [
              'Sections order for fresher resumes',
              'Action verbs that strengthen bullets',
              'What to cut: hobbies, photos, long summaries',
            ],
          },
          {
            id: 'cr06-l2', title: 'Projects & Achievement Framing', minutes: 30,
            points: [
              'Quantify impact: numbers over adjectives',
              'STAR framing for project bullets',
              'Internship and hackathon placement',
            ],
          },
          {
            id: 'cr06-l3', title: 'ATS-Friendly Formatting', minutes: 25,
            points: [
              'Keywords matching the job description',
              'Fonts, columns and file format rules',
              'Common ATS rejection reasons',
            ],
          },
        ],
      },
      {
        title: 'HR Interview',
        lessons: [
          {
            id: 'cr06-l4', title: 'Top 20 HR Questions', minutes: 45,
            points: [
              'Tell me about yourself — the 90-second formula',
              'Strengths and weaknesses with examples',
              'Why should we hire you / why this company',
            ],
          },
          {
            id: 'cr06-l5', title: 'Salary, Relocation & Bond Questions', minutes: 25,
            points: [
              'Safe answers for salary expectations',
              'Handling service-agreement questions',
              'Questions to ask the interviewer',
            ],
          },
        ],
      },
      {
        title: 'Technical Interview',
        lessons: [
          {
            id: 'cr06-l6', title: 'Explaining Projects & Code', minutes: 40,
            points: [
              'The architecture-first explanation order',
              'Walking an interviewer through your code',
              'Defending your tech-stack choices',
            ],
          },
          {
            id: 'cr06-l7', title: 'Handling "I Don\'t Know" Moments', minutes: 20,
            points: [
              'Think-aloud problem solving',
              'Redirecting to what you do know',
              'Honesty vs bluffing — the line to walk',
            ],
          },
        ],
      },
      {
        title: 'Mock Practice',
        lessons: [
          {
            id: 'cr06-l8', title: 'Self-Mock Interview Checklist', minutes: 30,
            points: [
              'Recording and scoring your own answers',
              'The mirror test for body language',
              'Weekly mock schedule to offer day',
            ],
          },
          {
            id: 'cr06-l9', title: 'Stress Interview Handling', minutes: 25,
            points: [
              'Staying calm under rapid-fire questions',
              'Recognising deliberate pressure tactics',
              'Recovery lines for blank moments',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'CR07',
    title: 'Company-Wise Preparation',
    category: 'Company Prep',
    level: 'Intermediate',
    description: 'Decode the exact test pattern, round structure and cutoff style of the companies visiting campus — TCS, Infosys, Wipro, Zoho, Freshworks and Amazon.',
    outcomes: [
      'Know each company\'s round-by-round pattern',
      'Choose the right preparation split per drive',
      'Avoid the common elimination traps',
    ],
    icon: 'business',
    color: '#0d9488',
    rating: 4.7,
    learners: 1650,
    modules: [
      {
        title: 'TCS NQT',
        lessons: [
          {
            id: 'cr07-l1', title: 'NQT Pattern & Syllabus', minutes: 35,
            points: [
              'Sections: numerical, verbal, reasoning, coding',
              'Negative marking and sectional cutoffs',
              'Ninja vs Digital role differences',
            ],
          },
          {
            id: 'cr07-l2', title: 'TCS Coding Round Strategy', minutes: 40,
            points: [
              'Difficulty level of NQT coding questions',
              'Allowed languages and IDE basics',
              'Two problems, 90 minutes — pacing plan',
            ],
          },
        ],
      },
      {
        title: 'Infosys & Wipro',
        lessons: [
          {
            id: 'cr07-l3', title: 'Infosys SP/DSE Test Pattern', minutes: 35,
            points: [
              'Systems Engineer vs Specialist Programmer',
              'Puzzle-heavy reasoning section tips',
              'Technical + HR combined interview format',
            ],
          },
          {
            id: 'cr07-l4', title: 'Wipro Elite NLTH Guide', minutes: 30,
            points: [
              'Aptitude + essay + coding structure',
              'Essay writing: structure and word limit',
              'Business interview expectations',
            ],
          },
        ],
      },
      {
        title: 'Product Companies',
        lessons: [
          {
            id: 'cr07-l5', title: 'Zoho & Freshworks Round Strategy', minutes: 45,
            points: [
              'Zoho\'s multi-level programming rounds',
              'Expected C/Java output-prediction questions',
              'Freshworks focus on practical coding tasks',
            ],
          },
          {
            id: 'cr07-l6', title: 'Amazon SDE Intern Prep', minutes: 40,
            points: [
              'Online assessment structure and bar-raiser round',
              'Leadership principles in behavioural answers',
              'DSA depth required vs service companies',
            ],
          },
        ],
      },
      {
        title: 'Test-Day Strategy',
        lessons: [
          {
            id: 'cr07-l7', title: 'Time Management Across Rounds', minutes: 25,
            points: [
              'Allocating minutes per section',
              'The two-pass attempt strategy',
              'When to guess vs leave blank',
            ],
          },
          {
            id: 'cr07-l8', title: 'Common Elimination Traps', minutes: 25,
            points: [
              'Sectional cutoffs — don\'t chase one section',
              'Webcam/proctoring rules that disqualify',
              'Instructions students misread every year',
            ],
          },
        ],
      },
    ],
  },
];
