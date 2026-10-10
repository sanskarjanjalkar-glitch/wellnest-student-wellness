// ─── High-Intelligence Student Peer & Study Buddy Knowledge Engine ──────────

function getStudentQA(lower, raw) {
  // ─────────────────────────────────────────────────────────────────────────
  // 1. WELLNEST & PROJECT SPECIFIC QUESTIONS
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("what is wellnest") || lower.includes("about wellnest") || lower.includes("what is this app") || lower.includes("what does this app do") || lower.includes("how does this app work")) {
    return `WellNest is a student-built mental wellness and academic early-detection platform 🎒. 

Here is what it does:
• ⏱️ 10-Second Daily Check-ins: Log how your day is going with emojis and student tags (Exams, Assignments, Sleep, etc.).
• 🌱 Early Stress Radar: If you log low mood/energy for 2+ consecutive days, it proactively alerts you before academic stress spirals into burnout.
• 💬 Study Buddy: 24/7 instant peer support for study techniques, procrastination, exam dread, and venting.
• 🫧 Somatic Breathwork: 2-minute guided visual exercises (Box Breathing, 4-7-8 Calm) to lower heart rate during panic.
• 📝 Venting Space: A private, safe journal with zero judgment.
• 🔒 100% Private: All your data stays right inside your browser's local storage. No accounts, no university tracking!`;
  }

  if (lower.includes("early detection") || lower.includes("early radar") || lower.includes("stress radar") || lower.includes("how does the alert work")) {
    return `The Early Stress Radar is designed to stop burnout BEFORE it happens:

Most students ignore stress until midterms hit and they suddenly experience severe panic or exhaustion. 
WellNest monitors your recent check-in patterns. If 2 or more consecutive check-ins have low scores (≤ 2/5 or 'Low'/'Rough'), an unobtrusive alert banner appears on your Home screen.

It prompts you with 1-click rescue actions—either a 2-minute guided breathing session or a quick talk with your Study Buddy—giving you a chance to reset before burnout compounds.`;
  }

  if (lower.includes("privacy") || lower.includes("is my data safe") || lower.includes("who can see") || lower.includes("anonymous") || lower.includes("does college track")) {
    return `Your privacy is 100% protected on WellNest 🔒:

• Zero Cloud Storage: All your mood logs, journal entries, and chat history are saved exclusively on your device's browser (using LocalStorage).
• No Sign-Up: We don't ask for your name, student ID, or college email.
• Zero Tracking: Your professors, university administration, and parents have zero access to what you write here. 
You can be completely honest without fear of judgment.`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. SPECIFIC STUDY TECHNIQUES & EXAM PREPARATION
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("pomodoro") || lower.includes("25/5") || lower.includes("timer technique")) {
    return `The Pomodoro Technique is one of the best ways to prevent study fatigue:

How it works:
1. Set a 25-minute timer and pick ONE single task (no multitasking).
2. Work with deep focus until the timer dings. Put your phone in another room!
3. Take a strict 5-minute break: stand up, drink water, stretch, or look out the window (avoid social media scrolling).
4. After completing 4 pomodoros (about 2 hours), reward yourself with a longer 20–30 minute break.

It prevents your brain from getting exhausted because rest is built into your rhythm!`;
  }

  if (lower.includes("active recall") || lower.includes("passive study") || lower.includes("rereading")) {
    return `Active Recall is scientifically proven to be 3x more effective than passive re-reading:

When you simply re-read your textbook or highlighted slides, your brain feels a false sense of familiarity. 
Here is how to do real Active Recall:
1. Read a section once, then close your notes completely.
2. Grab a blank sheet of paper and write down everything you remember (the 'Blurting method').
3. Check your notes to see what you missed. The gaps are what you need to revise!
4. Create practice flashcards (questions on the front, answers on the back) rather than reading summary notes.`;
  }

  if (lower.includes("feynman") || lower.includes("teach concept") || lower.includes("teach someone")) {
    return `The Feynman Technique is the ultimate test of true understanding:

1. Pick the concept you're learning.
2. Pretend you have to teach it to a 10-year-old or a classmate who missed the lecture.
3. Use plain, simple language without jargon.
4. Whenever you get stuck or find yourself using confusing buzzwords, go back to your textbook—that's your exact knowledge gap!
5. Simplify and create an everyday analogy. Once you can teach it simply, you own it forever.`;
  }

  if (lower.includes("math") || lower.includes("calculus") || lower.includes("algebra") || lower.includes("formula") || lower.includes("physics") || lower.includes("numerical")) {
    return `Studying math and numerical subjects requires a completely different strategy than theory:

1. Never just read worked-out examples: Reading a solution makes it look easy. Always cover the solution and work through the problem step-by-step with pen and paper.
2. The "Error Journal": When you get a problem wrong, don't just erase it. Write down WHY you got it wrong (e.g., conceptual gap, calculation slip, missed formula).
3. Do 3 difficulty levels: 2 warmup easy problems, 3 medium standard exam problems, and 1 challenging past-paper problem.
4. Formula Sheet by Memory: Every morning before practice, write down the 5 core formulas from memory without peeking.`;
  }

  if (lower.includes("coding") || lower.includes("programming") || lower.includes("computer science") || lower.includes("debug") || lower.includes("dsa") || lower.includes("leetcode")) {
    return `Here are survival tips for computer science and coding subjects:

1. Rubber Duck Debugging: Explain the code line-by-line out loud to an inanimate object (or a friend). You'll usually spot the logic bug halfway through.
2. Pen & Paper First: For algorithms/DSA, trace the inputs and draw out arrays or trees on paper before touching the keyboard.
3. The 20-Minute Rule: If you're stuck on a single bug for over 20 minutes with zero progress, step away from the monitor. Grab water or take a walk. Your subconscious brain often solves bugs while you're away.
4. Build small prototypes rather than just watching long 10-hour tutorials passively.`;
  }

  if (lower.includes("theory") || lower.includes("history") || lower.includes("biology") || lower.includes("heavy reading") || lower.includes("textbook") || lower.includes("dense notes")) {
    return `When facing huge chapters of theory or dense reading:

1. The SQ3R Method:
   • Survey: Skim the headings, bold terms, and summary first.
   • Question: Turn each heading into a question (e.g., heading 'Photosynthesis' -> 'How does photosynthesis generate ATP?').
   • Read: Read specifically to answer that question.
   • Recite: Say the answer out loud without looking.
   • Review: Quick 2-minute skim before bed.
2. Mind Mapping: Connect main concepts visually with branches rather than writing long linear paragraphs.`;
  }

  if (lower.includes("cramming") || lower.includes("night before") || lower.includes("exam tomorrow") || lower.includes("last minute") || lower.includes("havent studied")) {
    return `If your exam is tomorrow and you're panicking, let's do Emergency Triage:

1. Stop trying to cover 100% of the syllabus: Aim for the high-yield 60–70% (previous years' recurring questions, professor's stressed topics).
2. Look at Past Year Papers (PYQs): In college exams, 70% of exam questions follow patterns from the last 3–5 years' papers.
3. Don't pull a zero-sleep all-nighter: Sleeping at least 3.5 to 4.5 hours gives your hippocampus time to lock in what you reviewed. Without sleep, you'll blank out on the exam paper even on stuff you memorized.
4. Quick summary tables > reading full paragraphs.`;
  }

  if (lower.includes("how to study") || lower.includes("study method") || lower.includes("prepare for exam") || lower.includes("memorize") || lower.includes("revision") || lower.includes("revision strategy")) {
    return `Here is a bulletproof study plan for semester exams:

1. Active Recall over Re-reading: Test yourself using flashcards or practice questions instead of highlighting.
2. Spaced Repetition: Review topics at intervals (Day 1, Day 3, Day 7). It moves information from short-term to permanent memory.
3. Interleaving: Mix 2 subjects in a day (e.g. 2 hours of Problem Solving + 1.5 hours of Theory) rather than grinding one subject for 8 hours until your brain numbs.
4. Past Paper Simulations: Set a timer and solve past exam questions without notes.

What specific subject are you tackling right now? Let's break it down!`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. TIME MANAGEMENT, OVERWHELM & PROCRASTINATION
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("procrastinat") || lower.includes("can't focus") || lower.includes("cant focus") || lower.includes("wasting time") || lower.includes("distract") || lower.includes("lazy") || lower.includes("put off")) {
    return `Procrastination is NOT laziness—it's your brain feeling overwhelmed by a task that seems too big or intimidating.

How to beat it right now:
1. The 5-Minute Rule: Tell yourself you only have to work on it for 300 seconds. Open the document, format the header, write one paragraph. After 5 minutes, you have full permission to stop. 90% of the time, getting started is the only hard part!
2. Lower the Bar: Don't aim for a masterpiece on draft 1. Write a 'messy first draft' just to get words on the screen.
3. Put Your Phone in Another Room: Visual cues trigger phone checking. Remove the phone from your sightline.
4. Clear Your Desk: A chaotic workspace adds cognitive clutter. Keep only your notebook, pen, and water bottle.`;
  }

  if (lower.includes("time management") || lower.includes("manage time") || lower.includes("routine") || lower.includes("timetable") || lower.includes("schedule") || lower.includes("balance life")) {
    return `Realistic student time management (that doesn't require a military schedule):

1. Time-Blocking: Instead of a vague to-do list, assign specific calendar blocks (e.g. '2:00 PM – 3:30 PM: Lab Report'). Tasks expand to fill open time unless bounded.
2. The Rule of 3: Every morning, write down only 3 critical things that MUST get done today. Everything else is a bonus.
3. Build in Buffer Time: Classes run late, group members lag, and tiredness happens. Leave 1 hour of unassigned buffer daily so your schedule doesn't collapse when delays occur.
4. Protect Your Shutdown Hour: Pick a time each night (e.g. 10:00 PM) where schoolwork officially stops. Having an end time forces you to be more productive during the day!`;
  }

  if (lower.includes("too many assignment") || lower.includes("multiple deadline") || lower.includes("overwhelmed") || lower.includes("so much work") || lower.includes("everything at once")) {
    return `When you have 5 deadlines staring at you and feel completely paralyzed:

1. Brain Dump on Paper: Write every single pending deadline, project, and quiz on a physical paper. Getting it out of your head immediately reduces mental anxiety.
2. Triage with the 4-Quadrant Priority:
   • Due in 24–48 hours & heavy grade weight -> DO FIRST.
   • Low grade weight or due next week -> POSTPONE.
   • Quick 10-minute tasks (submitting a form, emailing a professor) -> DO NOW to clear mental space.
3. Pick Just ONE Item: Close all other browser tabs. Work on that single assignment for 45 minutes without looking at the rest.
4. Remember: C's get degrees, but burnout ruins semesters. Submitting a good-enough assignment beats submitting nothing!`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 4. EXAM ANXIETY, PANIC & OVERTHINKING
  // ─────────────────────────────────────────────────────────────────────────
  if (
    (lower.includes("exam") || lower.includes("test") || lower.includes("quiz") || lower.includes("midterm") || lower.includes("final")) &&
    (lower.includes("anxi") || lower.includes("panic") || lower.includes("nervous") || lower.includes("stress") || lower.includes("scared") || lower.includes("blank") || lower.includes("fear"))
  ) {
    return `Exam anxiety is a physiological fight-or-flight response. Your body thinks the exam is a physical threat!

Here is how to counter it:
1. In the Exam Hall: If your heart starts pounding or your mind goes blank, put your pen down. Plant both feet firmly on the floor.
2. Physiological Sigh: Take a deep breath in through your nose, take a second quick sip of air at the top, and let out a long, slow exhale through your mouth. Doing this twice immediately drops your heart rate.
3. First-Pass Strategy: Skim the paper and immediately solve the easiest questions first. Seeing yourself score guaranteed points restores confidence and clears brain fog.
4. Reframe: Re-label that nervous energy as 'readiness'. Your brain is pumping adrenaline to help you react quickly.`;
  }

  if (lower.includes("presentation") || lower.includes("public speak") || lower.includes("viva") || lower.includes("oral exam") || lower.includes("stage fright") || lower.includes("speak in class")) {
    return `Presentation and viva anxiety is one of the most common student fears. Here's a game plan:

1. The 60-Second Opening: You will only feel intense nervousness during the first 60 seconds of speaking. Practice your opening 2 sentences until you can say them in your sleep. Once you get past minute one, your adrenaline naturally stabilizes.
2. Pick 3 Friendly Faces: Identify 3 classmates sitting in different parts of the room who look calm. Alternate making eye contact between them instead of staring into a blur of faces.
3. Slow Down Your Rate of Speech: Adrenaline makes you rush. Force yourself to speak at 80% your normal speed and pause between slides. Pauses make you sound confident, not lost!
4. For Viva/Oral Exams: If you don't know an answer immediately, don't freeze. Say: "That's a good question. Let me structure my thoughts for a moment." It buys you 10 seconds of calm.`;
  }

  if (lower.includes("internship") || lower.includes("placement") || lower.includes("resume") || lower.includes("interview") || lower.includes("job") || lower.includes("career")) {
    return `Career and placement anxiety during college is intense, but remember:

1. Rejections are Numbers, Not Character Judgments: Getting ghosted or rejected by companies is a standard part of the process. Even senior engineers and executives get dozens of rejections.
2. Focus on One Tangible Project: A single solid portfolio project that you can explain passionately beats 10 generic tutorial certificates.
3. The STAR Method for Interviews: When answering questions, structure your answer: Situation -> Task -> Action -> Result. It keeps you from rambling when nervous.
4. Don't Compare Your Timeline: Your classmates landing offers in week 1 doesn't mean you won't land a great role in month 2 or 3. Run your own race.`;
  }

  if (lower.includes("overthink") || lower.includes("racing thought") || lower.includes("can't stop thinking") || lower.includes("spiraling") || lower.includes("worrying")) {
    return `When your brain is trapped in an overthinking loop:

1. The "What If" vs "What Is" Grounding:
   • Your brain says: "What if I fail, what if I lose my scholarship, what if everyone thinks I'm stupid?"
   • Ground back to reality: "What IS true right now? I am sitting at my desk, I have notes in front of me, and I have 48 hours to prepare."
2. 5-4-3-2-1 Sensory Reset: Name 5 things you can see around you, 4 things you can physically touch, 3 sounds you can hear, 2 things you can smell, and 1 slow breath.
3. Schedule Worry Time: Tell yourself, "I will worry about my final GPA on Saturday at 5 PM. Right now, it's study time."`;
  }

  if (lower.includes("failed") || lower.includes("bad marks") || lower.includes("bad grade") || lower.includes("fail a test") || lower.includes("low score") || lower.includes("flunked")) {
    return `Getting a bad grade hurts like a punch to the gut, but please hear this:

1. One grade is data, NOT a verdict on your intelligence or worth. Even the most successful engineers, doctors, and researchers have failed quizzes and midterms.
2. Grieve it for one evening: It's okay to feel disappointed, angry, or to cry. Don't bottle it up.
3. Post-Mortem Analysis (Tomorrow): Look at the paper calmly. Was it conceptual misunderstanding, lack of time, or silly calculation errors?
4. Go to Professor/TA Office Hours: Say, "I was disappointed with my score on this test and I want to understand where my approach went wrong." Professors respect students who show up to learn from mistakes, and they often provide extra credit or exam guidance.`;
  }

  if (lower.includes("imposter") || lower.includes("not good enough") || lower.includes("everyone is smarter") || lower.includes("behind") || lower.includes("stupid") || lower.includes("don't belong")) {
    return `Over 70% of high-achieving college students experience Imposter Syndrome:

• You are comparing your messy internal behind-the-scenes with everyone else's polished highlight reel.
• People in lectures nod their heads like they understand everything when half of them are just as confused as you are.
• You didn't get accepted into college or school by mistake—admissions and grading committees don't make clerical errors like that.
• Feeling challenged means you are learning at the boundary of your comfort zone, which is where real intellectual growth happens!`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 5. SLEEP, BURNOUT & LIFESTYLE
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("cant sleep") || lower.includes("wake up") || lower.includes("all-nighter") || lower.includes("sleep schedule")) {
    return `Pulling all-nighters actually decreases test performance by up to 40% because your brain consolidates memories during REM sleep.

Here's how to fix your sleep routine:
1. The 10-Hour Caffeine Cutoff: Stop coffee, energy drinks, and tea at least 8–10 hours before your intended bedtime.
2. Dim Screens & Night Shift: Blue light tricks your pineal gland into thinking it's noon. Turn on Night Shift or f.lux.
3. Bedtime Brain Dump: Keep a small notepad beside your pillow. Write down tomorrow's to-do list so your brain stops spinning in circles.
4. Try the 4-7-8 Breathing: Head over to WellNest's Breathe tab and run 3 rounds of the 4-7-8 exercise in bed. It signals your autonomic nervous system to shut down adrenaline.`;
  }

  if (lower.includes("burnout") || lower.includes("exhausted") || lower.includes("so tired") || lower.includes("drained") || lower.includes("burnt out") || lower.includes("breaking down")) {
    return `Burnout happens when your output has exceeded your recovery for weeks on end. You cannot 'study your way' out of burnout.

Immediate triage:
1. Declare a Mandatory Rest Window: Stop all studying at 8:00 PM tonight. The world will not collapse.
2. Real Rest vs Fake Rest: Doomscrolling on your phone is high sensory stimulation, not rest. Take a long warm shower, listen to calm acoustic music, or lie down in dim light.
3. Ask for Extensions: If you have 3 major projects due on the same day, email a professor politely explaining your workload. Most professors are human and will grant a 24- to 48-hour extension if you ask before the deadline.`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 6. CAMPUS SOCIAL LIFE, ROOMMATES & PARENTAL PRESSURE
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("roommate") || lower.includes("dorm") || lower.includes("hostel") || lower.includes("noisy") || lower.includes("room partner")) {
    return `Living in tight quarters with roommates can be a huge source of silent stress:

1. Direct & Calm Communication: Don't let annoyances fester until you snap. Address issues early: "Hey, I have an 8 AM lecture tomorrow, mind if we turn off the overhead lights around 11?"
2. Noise Isolation: Invest in decent foam earplugs or a white noise app on your phone.
3. Have a "Third Space": Never stay trapped in a tense dorm room. Make the campus library, a cozy coffee shop, or an empty study hall your designated sanctuary.`;
  }

  if (lower.includes("parent") || lower.includes("family pressure") || lower.includes("disappoint") || lower.includes("expectations")) {
    return `Parental and family expectations can feel like carrying a boulder on your shoulders:

1. Remember: Their anxiety often comes from love, but their perspective of the current academic system is usually decades out of date.
2. Set Gentle Boundaries: Share updates on your terms. If constant calls about grades stress you out, say: "Mom/Dad, I'm focusing during study hours, let's catch up every Sunday afternoon."
3. Your Life is Yours: At the end of the day, you are the one living your career, not your parents. Your worth as a human being is not measured by their approval.`;
  }

  if (lower.includes("lonely") || lower.includes("friend") || lower.includes("no friends") || lower.includes("isolated") || lower.includes("making friends") || lower.includes("fitting in")) {
    return `Campus loneliness is surprisingly common, even in lecture halls packed with 200 students:

1. Low-Stakes Connections: You don't have to make a best friend on day one. Start by asking someone in class, "Hey, what did the prof say about question 3?" or "Mind if I sit here?"
2. Join One Activity-Based Club: It's much easier to bond when you're working on something together (robotics club, hiking, music, debating, sports) rather than just making small talk.
3. Be Patient: True friendships take dozens of small, repeated interactions. Don't assume people don't like you just because they're on their phones!`;
  }

  if (lower.includes("group project") || lower.includes("teammate") || lower.includes("group partner") || lower.includes("doing all the work")) {
    return `Dealing with freeloading group project members is a rite of passage:

1. Divide in Writing on Day 1: Create a shared Google Doc or Notion board with explicit names next to specific sections and deadlines.
2. Document Communication: Always discuss project milestones in the group chat rather than in person so there's a timestamped trail.
3. Escalation: If a teammate goes completely ghost for 5+ days, message them politely: "Hey, we need section 2 by tonight to merge. If we don't hear from you, we'll have to notify the professor so the rest of our grades aren't impacted."`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 7. EMOTIONAL VENTING (SAD, ANGRY, CRYING, QUIT)
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("crying") || lower.includes("cried") || lower.includes("sad") || lower.includes("feel sad") || lower.includes("depressed") || lower.includes("unhappy")) {
    return `I'm really sorry things are feeling so heavy right now. 💜 

Please don't hold back the tears—crying is your nervous system's biological way of releasing trapped cortisol and stress chemicals.
You're carrying a huge load of coursework, expectations, and personal challenges, and it's completely normal to feel depleted.

Take a break from your books. Wrap yourself in a blanket, drink a warm cup of water or tea, and know that you are not alone in this. Tomorrow is a clean slate.`;
  }

  if (lower.includes("quit") || lower.includes("drop out") || lower.includes("give up") || lower.includes("hate college") || lower.includes("hate school") || lower.includes("cant take this anymore")) {
    return `Take a deep breath. Never make a permanent life decision (like dropping out or quitting) when you are at your lowest energy point of the semester.

1. High-Stress Distortion: When you're sleep-deprived and overwhelmed, your brain magnifies problems by 10x.
2. Finish Today First: Give yourself permission to pause and do ZERO studying for the next 4 hours.
3. Talk it Through When Calmer: Once you get a full night of sleep, reassess. Is it the major you dislike, or is it just the stress of this specific semester? We can always pivot or explore alternatives calmly.`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 8. CRISIS / EMERGENCY HELPLINE
  // ─────────────────────────────────────────────────────────────────────────
  if (lower.includes("crisis") || lower.includes("suicide") || lower.includes("hurt myself") || lower.includes("kill myself") || lower.includes("die") || lower.includes("end my life") || lower.includes("self harm")) {
    return `Please pause and listen to me: You matter deeply, and you do not have to carry this immense pain by yourself.

There are people who genuinely care and want to support you right now, completely free and confidentially:
• 📞 Call or Text 988 (Suicide & Crisis Lifeline - 24/7, Free)
• 💬 Text HOME to 741741 (Crisis Text Line)
• 🇮🇳 India: Call 14416 (Tele-MANAS)
• 🇬🇧 UK: Call 111
• Tap the 🆘 Helpline button at the top right of WellNest.

Please reach out to one of these resources, a close friend, or campus counselor right now. Your life is irreplaceable.`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 9. DYNAMIC INTELLIGENT TOPIC PARSING (NO MORE IDENTICAL BOILERPLATE!)
  // ─────────────────────────────────────────────────────────────────────────
  // Clean up user query for targeted response
  const cleanTopic = raw.replace(/[?!.]/g, "").trim();

  // If asking "How to..."
  if (lower.startsWith("how to") || lower.startsWith("how can i") || lower.startsWith("how do i")) {
    return `Here is a practical, step-by-step breakdown on **${cleanTopic}**:

1. Clarify the First Micro-Step: Big goals cause paralysis. Break this down into an action that takes under 5 minutes so you can start with zero friction.
2. Eliminate Common Traps: Watch out for distractions or perfectionism—doing it imperfectly today beats waiting for the 'ideal time'.
3. Protect Your Energy: Set a clear boundary on how much time you invest so it doesn't drain your focus from your other priorities.

What specific hurdle is making this tough for you right now? Let's figure it out together!`;
  }

  // If asking "Why..."
  if (lower.startsWith("why do") || lower.startsWith("why am i") || lower.startsWith("why is")) {
    return `That's a very common experience among students regarding **${cleanTopic}**:

• Cognitive Load: In high-stress academic environments, your brain is constantly balancing deadlines, memory recall, and social expectations, which often triggers this feeling.
• Physical Depletion: When sleep, hydration, or regular breaks slip, your emotional resilience drops dramatically.
• Actionable Reset: Don't judge yourself for feeling this way. Acknowledge it, take a short breather away from screens, and tackle just one thing at a time.

Does this feel more tied to recent academic pressure or general semester exhaustion?`;
  }

  // If asking "What should I do..."
  if (lower.startsWith("what should") || lower.startsWith("what do i do") || lower.startsWith("what can i do")) {
    return `Here is how to navigate **${cleanTopic}**:

1. Triage: What is the most urgent part of this that needs your attention within the next 24 hours? Focus solely on that.
2. Low-Risk Test: Try the simplest possible solution first before overcomplicating things.
3. Don't Go It Alone: If this is an academic issue, consult a TA or classmate. If it's personal, give yourself permission to step back and recharge.

Tell me a bit more about what's happening so I can give you more specific advice!`;
  }

  // General conversational response (Adaptive, not boilerplate!)
  return `I hear you regarding **"${cleanTopic}"**. Student life throws a lot of curveballs—whether it's navigating difficult course material, time crunches, or mental fatigue.

Here is my advice:
• Focus on what is directly within your control today.
• Let go of the need for everything to go perfectly.
• Take 2 minutes to stretch, hydrate, and breathe before diving into your next task.

What aspect of this would you like to unpack or solve first? 🌿`;
}

export { getStudentQA };
