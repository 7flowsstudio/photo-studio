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

interface PostParams {
  slug?: string;
  locale?: string;
}

export default async function SinglePost({
  params,
}: {
  params: Promise<PostParams>;
}) {
  try {
    const { slug } = await params;

    if (!slug || !postsMap[slug]) {
      return notFound();
    }

    const PostComponent = postsMap[slug];
    return <PostComponent />;
  } catch (error) {
    console.error("Error loading post:", error);
    return notFound();
  }
}
