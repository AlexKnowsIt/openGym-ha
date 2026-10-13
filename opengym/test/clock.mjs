// Starts the clock at TEST_CLOCK (still ticking) for the API tests, via NODE_OPTIONS=--import.
// Upstream's coach fixtures date their workout 2026-07-20 and fall out of the coach's 12-week
// window from 2026-10-12 on. Remove this once upstream dates those fixtures relative to today.
// Fixed once and inherited, so a server.js a test spawns runs on the same clock as the test.
process.env.TEST_CLOCK_OFFSET ??= String(Date.parse(process.env.TEST_CLOCK) - Date.now());
const offset = Number(process.env.TEST_CLOCK_OFFSET);
const RealDate = Date;
function ClockDate(...a) {
  if (!new.target) return new ClockDate().toString();
  return Reflect.construct(RealDate, a.length ? a : [RealDate.now() + offset], new.target);
}
ClockDate.prototype = RealDate.prototype;
ClockDate.now = () => RealDate.now() + offset;
ClockDate.parse = RealDate.parse;
ClockDate.UTC = RealDate.UTC;
globalThis.Date = ClockDate;
