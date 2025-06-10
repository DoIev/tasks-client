import React, { useState, useEffect } from "react";
import { Button , Input, Textarea, Switch, Card, MantineProvider } from "@mantine/core";
import { Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import './App.css'
import { Tasks } from "./components/tasks/Tasks";

function App() {
  return <>
    <MantineProvider>
      <Tasks></Tasks>

    </MantineProvider>
  </>
}


export default App
