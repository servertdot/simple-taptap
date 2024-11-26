import {Game} from '@/components/game';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-gradient-to-b from-zinc-900 to-black text-white">
      <Game />
    </main>
  );
}