import { notFound } from "next/navigation";
import PostPhotoshootPrep from "@/components/Sections/Blog/Posts/PostPhotoshootPrep/PostPhotoshootPrep";
import PostPhotographyBusiness from "@/components/Sections/Blog/Posts/PostPhotographyBusiness/PostPhotographyBusiness";
import PostBusinessPortrait from "@/components/Sections/Blog/Posts/PostBusinessPortrait/PostBusinessPortrait";

const postsMap: Record<string, React.FC> = {
  "pidgotovka-do-fotosesiyi": PostPhotoshootPrep,
  "fotografiya-dlya-biznesu": PostPhotographyBusiness,
  "post-3": PostPhotographyBusiness,
  "diloviy-portret": PostBusinessPortrait,
  "post-5": PostBusinessPortrait,
};

export default async function SinglePost({
  params,
}: {
  params: Promise<{ slug?: string; locale?: string }>;
}) {
  const { slug = "" } = await params;
  const PostComponent = postsMap[slug];

  if (!PostComponent) {
    return notFound();
  }

  return <PostComponent />;
}
