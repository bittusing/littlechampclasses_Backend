import { Router } from "express";
import { Course } from "../models/Course.js";

export const coursesRouter = Router();

/** Homepage “Pick a program” strip — order preserved. */
const HOME_FEATURED_SLUGS = [
  "after-school-spark-demo",
  "learn-english-demo",
  "learn-maths-demo",
] as const;

type CourseLean = {
  _id: { toString: () => string };
  title: string;
  slug: string;
  description: string;
  detailDescription?: string;
  track: string;
  pricePaise: number;
  liveSessionsFirst?: number;
  liveSessionsSecond?: number;
  isDemo: boolean;
  previewVideoUrl?: string;
  thumbnailUrl?: string;
  marketingTitle?: string;
  marketingBullets?: string[];
  classStartsAt?: Date | null;
  isActive: boolean;
};

function mapCourse(c: CourseLean) {
  const first = c.liveSessionsFirst ?? 6;
  const second = c.liveSessionsSecond ?? 6;
  const bullets =
    c.marketingBullets?.filter((b) => b?.trim()).slice(0, 4) ?? [];
  const marketingBullets =
    bullets.length > 0
      ? bullets
      : [
          `Program: ${first} + ${second} live sessions (${first + second} classes)`,
          `Demo booking: ₹${c.pricePaise / 100}`,
          "Small groups · IIT-trained mentors",
          "Ages 1–8 · paced batches",
        ];
  const marketingTitle =
    c.marketingTitle?.trim() ||
    c.title.replace(/\s*\(demo\)\s*$/i, "").trim();

  return {
    id: c._id.toString(),
    title: c.title,
    slug: c.slug,
    description: c.description,
    detailDescription: c.detailDescription ?? "",
    track: c.track,
    pricePaise: c.pricePaise,
    priceRupees: c.pricePaise / 100,
    liveSessionsFirst: first,
    liveSessionsSecond: second,
    totalLiveSessions: first + second,
    isDemo: c.isDemo,
    previewVideoUrl: c.previewVideoUrl ?? "",
    thumbnailUrl: c.thumbnailUrl ?? "",
    marketingTitle,
    marketingBullets,
    classStartsAt: c.classStartsAt ?? null,
    isActive: c.isActive,
  };
}

coursesRouter.get("/", async (req, res) => {
  /** Query ?featured=1 avoids /featured being eaten by /:slug as slug "featured" (older builds / ordering). */
  const wantFeatured =
    req.query.featured === "1" ||
    req.query.featured === "true" ||
    req.query.home === "1";

  if (wantFeatured) {
    const found = await Course.find({
      slug: { $in: [...HOME_FEATURED_SLUGS] },
      isActive: true,
    }).lean();
    const bySlug = new Map(found.map((doc) => [doc.slug, doc]));
    const ordered = HOME_FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
    res.json({
      courses: ordered.map((c) => mapCourse(c as CourseLean)),
    });
    return;
  }

  const list = await Course.find({ isActive: true }).sort({ track: 1, title: 1 }).lean();
  res.json({ courses: list.map((c) => mapCourse(c as CourseLean)) });
});

coursesRouter.get("/:slug", async (req, res) => {
  const c = await Course.findOne({ slug: req.params.slug, isActive: true }).lean();
  if (!c) {
    res.status(404).json({ error: "Course not found" });
    return;
  }
  res.json({ course: mapCourse(c as CourseLean) });
});
