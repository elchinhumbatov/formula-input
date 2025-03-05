'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FormulaInput from "./components/FormulaInput";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <div className='flex min-h-screen justify-center p-10'> */}
      <div className='p-10'>
        <h1 className="text-xl font-bold mb-4">Formula Input</h1>
        <FormulaInput />
      </div>
    </QueryClientProvider>
  );
}