import Image from "next/image";

import { TEAM_IMAGE } from "@/lib/constants";

type TeamAvatarProps = {
  slice: 0 | 1 | 2;
};

export function TeamAvatar({ slice }: TeamAvatarProps) {
  return (
    <span className="avatar">
      <Image
        src={TEAM_IMAGE}
        alt=""
        fill
        sizes="40px"
        quality={75}
        className="avatar-image"
        style={{ left: `${-slice * 100}%` }}
      />
    </span>
  );
}
