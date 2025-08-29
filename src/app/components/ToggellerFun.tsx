"use client";

import { useState } from "react";
import HeaderSection from './Toggeller'

export default function HeaderSectionClient() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <HeaderSection isYearly={isYearly} setIsYearly={setIsYearly} />
  );
}
