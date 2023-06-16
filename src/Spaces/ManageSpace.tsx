import React from "react";
import { useParams } from "react-router";

export function ManageSpace() {
  const { spaceId } = useParams();
  console.log(spaceId);

  return <div>Manage Space {spaceId}</div>;
}
