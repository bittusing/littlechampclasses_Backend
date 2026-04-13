import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../env.js";
import { Course } from "../models/Course.js";
import { buildDetailDescription } from "./seedData.js";

const T = {
  stories: "/courses/thumb-stories.svg",
  english: "/courses/thumb-english.svg",
  maths: "/courses/thumb-maths.svg",
  activity: "/courses/thumb-activity.svg",
  science: "/courses/thumb-science.svg",
  phonics: "/courses/thumb-phonics.svg",
  logic: "/courses/thumb-logic.svg",
  creative: "/courses/thumb-creative.svg",
} as const;

const V = {
  a: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  b: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
  c: "https://www.youtube.com/watch?v=668nUCeBHyY",
} as const;

const LIVE_A = 6;
const LIVE_B = 6;
const PRICE = 500;

const demos = [
  {
    title: "After-School Spark (Demo)",
    slug: "after-school-spark-demo",
    marketingTitle: "After-School",
    marketingBullets: [
      "Ages: Early years · Grades 1–2 style bands (1–8 overall)",
      "Duration: ₹5 demo · then 6 + 6 live classes (12 sessions)",
      "Focus: English, Maths, discovery stories, gentle revision",
      "Alignment: CBSE / ICSE friendly pacing for young learners",
    ],
    description:
      "Fuel your child’s growth after school—confidence, routines, and joyful revision with IIT mentors.",
    detailDescription: buildDetailDescription(
      "After-school track: energy release, listening games, and light revision so kids arrive calm and curious. Block A builds group habits; Block B adds short challenges that feel like play.",
    ),
    track: "after-school" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.a,
    thumbnailUrl: T.stories,
    classStartsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Learn English: Sounds & Stories (Demo)",
    slug: "learn-english-demo",
    marketingTitle: "Learn English",
    marketingBullets: [
      "Ages: 4–8 · phonics, stories, speaking confidence",
      "Duration: ₹5 demo · full path 12 live classes (6+6)",
      "Class size: 4–6 learners per batch",
      "Path: Early literacy · aligned with common international scales (CEFR-style goals)",
    ],
    description:
      "Help your child master English skills—phonics, vocabulary, and joyful read-alouds.",
    detailDescription: buildDetailDescription(
      "English track: letter sounds, blending, sight words, and short speaking turns. Block A focuses on hearing and repeating; Block B adds short stories and simple writing aloud.",
    ),
    track: "english" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.c,
    thumbnailUrl: T.english,
    classStartsAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Learn Maths: Patterns & Play (Demo)",
    slug: "learn-maths-demo",
    marketingTitle: "Maths Learning",
    marketingBullets: [
      "Ages: 4–8 · visual & mental maths habits",
      "Duration: ₹5 demo · structured 6 + 6 live program",
      "Class size: Up to 10 in select batches",
      "Focus: Patterns, word problems, faster mental calculations",
    ],
    description:
      "Unlock math confidence—solve problems with drawings, stories, and smart shortcuts.",
    detailDescription: buildDetailDescription(
      "Maths track: counting, comparing, shapes, and word problems with drawings. Block A uses manipulatives and movement; Block B introduces slightly longer problems and explaining your thinking.",
    ),
    track: "maths" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.b,
    thumbnailUrl: T.maths,
    classStartsAt: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Activity Kits: Build & Explore (Demo)",
    slug: "activity-kits-demo",
    description:
      "Hands-on builds with simple materials—₹5 demo; 12 live workshops (6+6) when you continue after the trial.",
    detailDescription: buildDetailDescription(
      "Activity track: cutting, folding, stacking, and simple science crafts using home-safe supplies. Block A is guided builds; Block B is “design your own” with constraints so creativity stays focused.",
    ),
    track: "activity" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.c,
    thumbnailUrl: T.activity,
    classStartsAt: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Tiny Scientists: Ask Why (Demo)",
    slug: "tiny-scientists-demo",
    description:
      "Mini experiments and “why” questions—₹5 demo; full course runs 6+6 live sessions for curious 5–8 year olds.",
    detailDescription: buildDetailDescription(
      "Science curiosity: observation, guessing, testing with safe household items, and naming what happened. Block A is teacher-led demos; Block B lets kids predict before each mini experiment.",
    ),
    track: "after-school" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.a,
    thumbnailUrl: T.science,
    classStartsAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Rhyme & Chime: English Demo",
    slug: "rhyme-chime-english-demo",
    description:
      "Rhymes, rhythm, and speaking confidence—₹5 to book the demo; 12 live classes (6+6) in the paid program later.",
    detailDescription: buildDetailDescription(
      "Rhyme track: songs, clap patterns, tongue twisters, and short performances. Block A builds ear for sounds; Block B adds partner dialogues and tiny “stage” moments.",
    ),
    track: "english" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.a,
    thumbnailUrl: T.phonics,
    classStartsAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Number Ninjas: Problem Solving (Demo)",
    slug: "number-ninjas-demo",
    description:
      "Visual word problems and mental maths—₹5 demo seat; continue with 6 live + 6 live structured classes.",
    detailDescription: buildDetailDescription(
      "Problem-solving track: drawing the story, choosing an operation, and checking with a second strategy. Block A is single-step contexts; Block B adds two-step stories and peer explanations.",
    ),
    track: "maths" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.c,
    thumbnailUrl: T.logic,
    classStartsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Art & Story Lab (Demo)",
    slug: "art-story-lab-demo",
    description:
      "Draw-along plus one-sentence stories—₹5 demo; full journey is twelve live sessions split 6+6.",
    detailDescription: buildDetailDescription(
      "Art + literacy: simple shapes, characters, and turning drawings into captions. Block A is copy-the-mentor; Block B is independent panels with feedback rounds.",
    ),
    track: "activity" as const,
    liveSessionsFirst: LIVE_A,
    liveSessionsSecond: LIVE_B,
    pricePaise: PRICE,
    previewVideoUrl: V.b,
    thumbnailUrl: T.creative,
    classStartsAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
  },
];

async function run() {
  await mongoose.connect(env.mongoUri);
  for (const d of demos) {
    await Course.findOneAndUpdate(
      { slug: d.slug },
      { ...d, isDemo: true, isActive: true },
      { upsert: true, new: true },
    );
  }
  console.log("Seeded demo courses:", demos.length, "→", demos.map((x) => x.slug).join(", "));
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
