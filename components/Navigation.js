import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link> | 
      <Link href="/scheduleList">View Schedules</Link> | 
      <Link href="/contact">Contact</Link> | 
      <Link href="/about">About</Link>
    </nav>
  );
}
