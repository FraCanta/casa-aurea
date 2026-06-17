import { NextResponse } from "next/server";
import {
  baseCurrency,
  fallbackExchangeRatesFromEur,
} from "@/lib/currency";

export async function GET() {
  return NextResponse.json({
    base: baseCurrency,
    rates: fallbackExchangeRatesFromEur,
    updatedAt: new Date().toISOString(),
    source: "demo",
  });
}
