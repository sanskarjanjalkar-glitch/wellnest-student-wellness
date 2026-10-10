// ─── Student-to-Student Advice & Study Buddy Engine ──────────────────────────

function getStudentQA(lower, raw) {
  // 1. Study methods & exam prep
  if (lower.includes("how to study") || lower.includes("study method") || lower.includes("prepare for exam") || lower.includes("memorize") || lower.includes("retain") || lower.includes("revision")) {
    return `Here are 4 study tricks that genuinely work when you're overwhelmed:

1. Active Recall: Don't just re-read your notes (it gives a fake sense of knowing). Close the notebook and write down everything you remember on a blank sheet, or quiz yourself.
2. The 3-Pass Rule: First pass = understand the big picture. Second pass = practice core questions. Third pass = test weak spots.
3. Teach the Wall (Feynman Technique): Try explaining the topic out loud in simple words like you're teaching a classmate who missed class. If you get stuck, that's what you need to review.
4. 25/5 Pomodoro: 25 minutes timer on, phone across the room. Then 5 minutes away from screens. Repeat 4 times, then take a longer 20-min snack break.

What subject or exam are you tackling right now? Let's break it down together!`;
  }

  // 2. Procrastination & focus issues
  if (lower.includes("procrastinat") || lower.includes("can't focus") || lower.includes("cant focus") || lower.includes("wasting time") || lower.includes("distract") || lower.includes("lazy")) {
    return `First off: you're not lazy. Procrastination is almost always your brain feeling overwhelmed by a big, scary task. Here is how I get myself unstuck:

1. The "Just 5 Minutes" Rule: Tell yourself you only have to work for 5 minutes. Open the document, write the title and one sentence. You can quit after 5 minutes if you want. 9 times out of 10, once you start, the resistance vanishes.
2. Make the Task Ridiculously Small: Instead of "Finish Chapter 4", write "Read page 42 and highlight one definition".
3. Phone in Another Room: Don't trust willpower alone—put your phone out of arm's reach or turn on Do Not Disturb.

What's the exact assignment or topic you're putting off? Tell me, and we'll pick the first tiny step.`;
  }

  // 3. Sleep schedule & midnight burnout
  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("cant sleep") || lower.includes("wake up") || lower.includes("all-nighter") || lower.includes("routine")) {
    return `Messing up sleep is practically a college tradition, but pulling all-nighters actually destroys memory retention by up to 40%. Here's a realistic student reset:

1. The 10-Hour Caffeine Rule: Stop drinking coffee/energy drinks at least 8 hours before bed.
2. Brain Dump at Night: Keep a scrap paper by your bed. Write down all tomorrow's to-dos so your brain stops spinning thinking you'll forget something.
3. Try the 4-7-8 Breathing: Go to the Breathe tab and do 3 rounds of the 4-7-8 exercise in bed. It calms your heart rate within 2 minutes.
4. Don't Stress About Not Sleeping: If you're tossing and turning for 20 mins, get out of bed, read a physical book in dim light for 10 mins, then try again.

Are you dealing with pre-exam racing thoughts or just late-night doomscrolling?`;
  }

  // 4. Burnout & exhaustion
  if (lower.includes("burnout") || lower.includes("exhausted") || lower.includes("so tired") || lower.includes("drained") || lower.includes("burnt out") || lower.includes("breakdown")) {
    return `Hey, take a slow breath. It sounds like you've been running on empty for days.

When you're burned out, forcing yourself to study harder doesn't work—it just makes you feel worse.
• Declare an emergency rest evening: If possible, stop studying by 8 or 9 PM tonight. The world will not end.
• Real rest vs Fake rest: Doomscrolling TikTok/Reels is stimulation, not rest. Take a hot shower, listen to your comfort music, or just lie down with your eyes closed.
• Triage your tasks: What is ONE thing that actually has to get done tomorrow? Push everything else to later.

You matter so much more than any semester deadline. Can you give yourself permission to step away for just an hour tonight?`;
  }

  // 5. Imposter syndrome & feeling behind
  if (lower.includes("imposter") || lower.includes("not good enough") || lower.includes("everyone is smarter") || lower.includes("fail") || lower.includes("behind") || lower.includes("stupid")) {
    return `Almost everyone in your lectures feels like they're faking it or falling behind—they just don't say it out loud.

• You see everyone else's exterior confidence, but your own private panic.
• You earned your spot here. You didn't get this far purely by luck.
• A bad grade or feeling confused in a tough lecture doesn't mean you're not cut out for this; it just means the material is hard.

What class or test made you feel this way today? Let's talk about it.`;
  }

  // 6. Loneliness, college friends & social stress
  if (lower.includes("lonely") || lower.includes("friend") || lower.includes("no friends") || lower.includes("isolated") || lower.includes("fitting in") || lower.includes("roommate")) {
    return `College and school can be strangely lonely, even when surrounded by hundreds of people in a lecture hall.

• You don't need a huge group of friends—even one person to sit with in class or grab lunch with makes a huge difference.
• Start low-stakes: Ask the person next to you for a pen, ask about a homework question, or join a campus club where everyone is doing an activity together.
• Roommate friction: If it's roommate stress, remember that everyone has annoying quirks when living in tight spaces. Clear, calm communication about sleep hours goes a long way.

You're definitely not alone in feeling this way. How have things been on campus lately?`;
  }

  // 7. Crisis & SOS
  if (lower.includes("crisis") || lower.includes("suicide") || lower.includes("hurt") || lower.includes("kill") || lower.includes("die") || lower.includes("end it")) {
    return `Please pause and listen: you matter deeply, and you do not have to carry this heavy pain alone.

There are people who care and want to support you right now, for free, completely confidentially:
• 📞 Call or Text 988 (Suicide & Crisis Lifeline - 24/7, Free)
• 💬 Text HOME to 741741 (Crisis Text Line)
• Click the 🆘 SOS button at the top of WellNest for helpline numbers.

Please talk to someone right now—a friend, counselor, family member, or call 988. You are worth keeping around.`;
  }

  // 8. General student questions
  if (lower.startsWith("what is") || lower.startsWith("what's") || lower.startsWith("why") || lower.startsWith("how do") || lower.startsWith("can you") || lower.startsWith("explain") || lower.endsWith("?")) {
    return `That's a great question about "${raw}".

Here's how I think about it from a student perspective:
1. Don't try to solve the entire problem in one go—pick the smallest piece you can do right now.
2. Give yourself some grace; learning takes iteration.
3. If this is stressing you out, take a short water break before diving in.

How can I help you tackle this or make it easier to handle?`;
  }

  // Fallback friendly student companion reply
  return `Thanks for sharing that with me. Academic pressure, social stuff, or just everyday student fatigue can really pile up.

I'm right here with you. What part of "${raw}" is on your mind the most right now?`;
}

export { getStudentQA };
