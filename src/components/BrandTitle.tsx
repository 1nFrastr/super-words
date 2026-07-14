"use client";

import Link from "next/link";

type BrandTitleProps = {
  href?: string;
  onClick?: () => void;
  className?: string;
  as?: "h1" | "div";
};

export default function BrandTitle({
  href,
  onClick,
  className = "",
  as = "h1",
}: BrandTitleProps) {
  const titleClass =
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-center text-4xl font-bold text-transparent transition hover:opacity-90";

  const content = "AI超级单词表";
  const Tag = as;

  if (href) {
    return (
      <Tag className={className}>
        <Link
          href={href}
          onClick={onClick}
          className={`${titleClass} inline-block`}
          aria-label="返回首页"
        >
          {content}
        </Link>
      </Tag>
    );
  }

  return <Tag className={`${titleClass} ${className}`}>{content}</Tag>;
}
