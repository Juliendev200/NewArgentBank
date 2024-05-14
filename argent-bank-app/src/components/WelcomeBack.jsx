import React from "react";

export default function WelcomeBack({ firstName, lastName }) {
  return (
    <h1>
      Welcome back
      <br />
      {firstName} {lastName}
    </h1>
  );
}
