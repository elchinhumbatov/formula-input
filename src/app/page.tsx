'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormulaInput from "./components/FormulaInput";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DndProvider backend={HTML5Backend}>
        <div className='p-10'>
          <h1 className="text-xl font-bold mb-4">Formula Input</h1>
          <FormulaInput />
        </div>
      </DndProvider>
    </QueryClientProvider>
  );
}