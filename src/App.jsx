import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';
import LogicGate from './components/LogicGate';
import RevisionQueue from './components/RevisionQueue';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('workspace');
  const [score, setScore] = useState(100);

  return (
    <div className="min-h-screen pb-12">
      <Navbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      
      <main className="max-w-360 mx-auto px-4 sm:px-6 pt-7">
        {currentScreen === 'workspace' && <Workspace setCurrentScreen={setCurrentScreen} score={score} setScore={setScore} />}
        {currentScreen === 'logic' && <LogicGate setCurrentScreen={setCurrentScreen} score={score} />}
        {currentScreen === 'revision' && <RevisionQueue setCurrentScreen={setCurrentScreen} />}
      </main>
    </div>
  );
}