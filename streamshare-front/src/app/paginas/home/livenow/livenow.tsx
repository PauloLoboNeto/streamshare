import "./../../../lib/componentes/card/card";
import "./../../../lib/componentes/card/style-card.scss";

export default function LiveNow() {
  return (
    <div id="section">
      <h1 className="live title">Live Now</h1>
      <div className="cards overflow-horizontal mouse-grabbing">
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
        <ss-card class="ssCard"></ss-card>
      </div>
    </div>
  );
}
