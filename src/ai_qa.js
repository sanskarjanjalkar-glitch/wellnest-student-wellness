function getStudentQA(lower, raw) {
// 1. Direct "How to study / How to prepare" questions
  if (lower.includes("how to study") || lower.includes("study method") || lower.includes("prepare for exam") || lower.includes("memorize") || lower.includes("retain")) {
    return `Here are 4 evidence-based study techniques proven to maximize retention and minimize student stress:

1. Active Recall: Test yourself using flashcards or practice questions instead of re-reading notes passively.
2. Spaced Repetition: Review topics in short intervals (Day 1, Day 3, Day 7) rather than cramming the night before.
3. The Feynman Technique: Explain the concept simply in plain words as if teaching it to someone else. Any gap in explanation shows what to review.
4. Pomodoro Rhythm: 25 minutes of deep focus followed by a strict 5-minute break away from screens.

Which topic or subject are you preparing for right now?`;
  }

  // 2. Direct "How to stop procrastinating" questions
  if (lower.includes("procrastinat") || lower.includes("can't focus") || lower.includes("cant focus") || lower.includes("wasting time") || lower.includes("distract")) {
    return `Procrastination is rarely laziness—it's usually an emotional reaction to overwhelm or fear of not doing it perfectly. Here is an actionable 3-step blueprint to break the loop:

1. The 5-Minute Rule: Tell yourself you only have to work on it for 5 minutes. You are free to stop after that. Starting eliminates 80% of resistance.
2. Shrink the Task: Instead of "write paper", make the task "open document and write 2 bullet points".
3. Friction Reduction: Put your phone in another room or turn on Do Not Disturb.

What is the specific task you're putting off today? Let's break down just the very first step together.`;
  }

  // 3. Direct Sleep / Insomnia / Routine questions
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("cant sleep") || lower.includes("wake up") || lower.includes("routine")) {
    return `Quality sleep is the foundation of cognitive recall and mood regulation. To reset your sleep cycle:

1. 10-Hour Caffeine Cutoff: Avoid caffeine at least 8–10 hours before your target bedtime.
2. Blue Light Taper: Dim screens or switch on Night Shift/f.lux 1 hour before sleeping.
3. 4-7-8 Breathwork: Head over to our Breathe tab and do 3 cycles of 4-7-8 Calm in bed. It activates your parasympathetic nervous system within minutes.
4. Brain Dump: Write down tomorrow's to-do list before bed so your brain doesn't loop through worries at night.`;
  }

  // 4. Burnout, Exhaustion & Stress Questions
  if (lower.includes("burnout") || lower.includes("exhausted") || lower.includes("so tired") || lower.includes("drained") || lower.includes("burnt out")) {
    return `Burnout occurs when stress exceeds your recovery time over a prolonged period. To begin recovering:

• Academic Boundaries: Set a firm time each evening (e.g., 9:00 PM) where all studying stops.
• Micro-Breaks: Step outside for 10 minutes of natural daylight and gentle walking between study sessions.
• Active Rest: Scrolling social media is stimulation, not rest. True rest is a warm shower, listening to calm music, or resting your eyes without an agenda.

You don't have to carry every expectation all at once. What is one non-urgent deadline you can postpone or ask for an extension on?`;
  }

  // 5. Imposter Syndrome & Confidence
  if (lower.includes("imposter") || lower.includes("not good enough") || lower.includes("everyone is smarter") || lower.includes("fail") || lower.includes("behind")) {
    return `Imposter syndrome thrives in high-achieving student environments. What you're experiencing is shared by over 70% of students at some point:

• You see other students' polished highlights, but never their behind-the-scenes struggles and doubts.
• You earned your spot here through your hard work and capabilities.
• Feeling challenged means you are learning at the edge of your comfort zone, not that you don't belong.

What specific standard or situation triggered this feeling today?`;
  }

  // 6. Relationship, Friends & Loneliness
  if (lower.includes("lonely") || lower.includes("friend") || lower.includes("no friends") || lower.includes("isolated") || lower.includes("fitting in")) {
    return `College and school transitions can feel surprisingly lonely, even in crowded lecture halls. A few gentle steps:

• Shared Interest Clubs: Join one specific campus club, study group, or intramural sport where interaction is structured around an activity.
• Low-Stakes Connections: Start small by asking a classmate about a lecture slide or sharing lecture notes.
• Be Patient with Yourself: Deep friendships take consistent small interactions over time.

Remember that being on your own right now doesn't mean you are unlovable or unworthy of deep connection.`;
  }

  // 7. Crisis & SOS
  if (lower.includes("crisis") || lower.includes("suicide") || lower.includes("hurt") || lower.includes("kill") || lower.includes("die") || lower.includes("end it")) {
    return `Please know that you matter deeply and you do not have to carry this overwhelming weight by yourself. 

There are compassionate people ready to listen and support you right now with zero judgment:
• 📞 Call or Text 988 (Suicide & Crisis Lifeline - 24/7, Free, Confidential)
• 💬 Text HOME to 741741 (Crisis Text Line)
• Tap the 🆘 SOS button at the top of WellNest for international helplines.

Please reach out to one of these services or a trusted person right now. Your life is valuable.`;
  }

  // 8. General Questions (What is / Why / How / Can you...)
  if (lower.startsWith("what is") || lower.startsWith("what's") || lower.startsWith("why") || lower.startsWith("how do") || lower.startsWith("can you") || lower.startsWith("explain") || lower.endsWith("?")) {
    return `That's a thoughtful question regarding "${raw}".

From a wellness and student performance perspective:
1. Core Principle: Your brain and nervous system operate best in rhythmic cycles of focused effort followed by genuine recovery.
2. Practical Step: Start by tackling the smallest actionable piece of this topic rather than trying to solve everything at once.
3. Compassionate Framing: Approach this with curiosity rather than self-criticism.

How can I help you break this down further or explore it in a way that feels supportive? 🌿`;
  }

  // Fallback conversational reply
  return `Thank you for sharing that with me. Whether you're navigating complex schoolwork, emotional fatigue, or personal questions, I am here to help you unpack it step by step.

What aspect of "${raw}" would you like to explore or solve together? 💜`;
}

export { getStudentQA };
