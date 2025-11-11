import { notFound } from "next/navigation";
import { PRODUCTS, DETAIL_FOLDER, ProductKey } from "../../products";
import DetailStep from "./DetailStep";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; step: string }>;
}) {
  const { slug, step } = await params;

  if (!Object.hasOwn(PRODUCTS, slug)) return notFound();
  const pageNum = Number(step);
  if (![1, 2, 3].includes(pageNum)) return notFound();

  const key = slug as ProductKey;
  const product = PRODUCTS[key];
  const folder = DETAIL_FOLDER[key];

  return (
    <DetailStep
      slug={key}
      page={pageNum}
      product={product}
      folder={folder}
    />
  );
}
