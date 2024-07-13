import getMatch from "@/handlers/riot/lol/getMatch";

export default function Page() {
  getMatch("KR", "7141739363");
  return <div>Test</div>;
}
