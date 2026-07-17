import { NextResponse } from 'next/server';
import Openfort from "@openfort/openfort-node";

export const dynamic = 'force-dynamic';

// Initialize the Openfort client (lazily, so module import does not throw at build time)
let openfortInstance: Openfort | null = null;
function getOpenfort() {
  if (!openfortInstance) {
    openfortInstance = new Openfort(process.env.OPENFORT_SECRET_KEY!);
  }
  return openfortInstance;
}

export async function POST() {
  try {
    const session = await getOpenfort().createEncryptionSession(
      process.env.NEXT_PUBLIC_SHIELD_PUBLISHABLE_KEY as string,
      process.env.SHIELD_SECRET_KEY as string,
      process.env.SHIELD_ENCRYPTION_SHARE as string
    );

    return NextResponse.json({ session }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
