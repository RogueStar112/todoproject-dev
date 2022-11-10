import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

const CompleteTasks = () => {
  const completeTasks = document.querySelectorAll(
    ".text-decoration-line-through"
  );

  console.log(completeTasks);
  console.log("test");

  completeTasks.forEach((completeTask) => {
    completeTask.remove();
  });
};

const ClearTasksButton = ({ removeTasks }) => {
  return (
    <div>
      <Button
        variant="success"
        onClick={() => removeTasks()}
        style={{ width: "100%" }}
      >
        Clear Tasks
      </Button>
    </div>
  );
};

export default ClearTasksButton;
