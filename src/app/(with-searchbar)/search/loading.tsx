import React from "react";

export default function Loading() {
  // for streaming UI, this component make page show partial loading state
  // not only same folder, but also applying to children page in child folders
  // only give streaming to async dynamic page (not static)
  // only apply to page component, not layout component or other components
  // if not the page route, if we change query string, it will not show loading state
  return <div>Loading...</div>;
}
