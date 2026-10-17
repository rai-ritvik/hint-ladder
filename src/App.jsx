import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Workspace from './components/Workspace';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('workspace');

  return (
    <div className="min-h-screen pb-12">
      <Navbar currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
      
      <main className="max-w-360 mx-auto px-4 sm:px-6 pt-7">
        {currentScreen === 'workspace' && <Workspace setCurrentScreen={setCurrentScreen} />}
        {currentScreen === 'logic' && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">Logic Gate Screen (Coming in Step 4)</h2>
            <button onClick={() => setCurrentScreen('workspace')} className="mt-4 px-4 py-2 bg-electric-indigo text-midnight-arctic rounded-xl text-xs font-bold">
              Back to Workspace
            </button>
          </div>
        )}
        {currentScreen === 'revision' && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">Revision Queue Screen (Coming in Step 4)</h2>
            <button onClick={() => setCurrentScreen('workspace')} className="mt-4 px-4 py-2 bg-electric-indigo text-midnight-arctic rounded-xl text-xs font-bold">
              Back to Workspace
            </button>
          </div>
        )}
      </main>
    </div>
  );
}